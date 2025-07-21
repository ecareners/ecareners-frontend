import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, Alert, Badge, 
  ProgressBar 
} from 'react-bootstrap';
import { 
  FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaSave, FaDownload, FaEye, 
  FaStar, FaUserTie, FaUserGraduate, FaInfoCircle, FaCalculator
} from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SikapMahasiswaAssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [student, setStudent] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [assessmentForm, setAssessmentForm] = useState({
    aspek_sikap_1: '', aspek_sikap_2: '', aspek_sikap_3: '', aspek_sikap_4: '', aspek_sikap_5: '',
    aspek_sikap_6: '', aspek_sikap_7: '', aspek_sikap_8: '', aspek_sikap_9: '', aspek_sikap_10: '',
    aspek_sikap_11: '', aspek_sikap_12: '', aspek_sikap_13: '', aspek_sikap_14: '', aspek_sikap_15: '',
    aspek_sikap_16: '', aspek_sikap_17: '', aspek_sikap_18: '', aspek_sikap_19: '', aspek_sikap_20: '',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');

  // Check if user has permission to access assessments
  useEffect(() => {
    if (user && (user.role === 'mahasiswa' || user.role === 'student')) {
      setError('Akses ditolak. Hanya instruktur dan proktor yang dapat mengakses penilaian.');
      setLoading(false);
      return;
    }
  }, [user]);

  useEffect(() => {
    if (studentId) {
      fetchStudentData();
      fetchExistingAssessment();
    }
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        throw new Error('Gagal mengambil data mahasiswa');
      }
    } catch (err) {
      setError('Gagal mengambil data mahasiswa: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingAssessment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/sikap_mahasiswa`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setAssessment(data[0]);
          
          // Fetch detailed data
          const detailedResponse = await fetch(`${API_BASE_URL}/api/assessments/${data[0].assessment_id}/detailed`);
          if (detailedResponse.ok) {
            const detailedData = await detailedResponse.json();
            setDetailedData(detailedData.detailed_data);
            
            if (detailedData.detailed_data) {
              const formData = { comments: data[0].comments || '' };
              for (let i = 1; i <= 20; i++) {
                formData[`aspek_sikap_${i}`] = detailedData.detailed_data[`aspek_sikap_${i}`] || '';
              }
              setAssessmentForm(formData);
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching existing assessment:', err);
    }
  };

  const calculateFinalScore = () => {
    const scores = [];
    for (let i = 1; i <= 20; i++) {
      scores.push(parseInt(assessmentForm[`aspek_sikap_${i}`]) || 0);
    }
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / 80) * 100; // Formula: total aspek/80 x 100
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const assessmentData = {};
    for (let i = 1; i <= 20; i++) {
      assessmentData[`aspek_sikap_${i}`] = parseInt(assessmentForm[`aspek_sikap_${i}`]) || 0;
    }
    
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'sikap_mahasiswa',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: assessmentData
    };
    
    console.log('📤 Sending sikap mahasiswa assessment data:', requestData);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/assessments/detailed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Sikap mahasiswa assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ Sikap mahasiswa assessment save failed:', errorData);
        setError(errorData.message || 'Gagal mengirim penilaian');
        setSaving(false);
      }
    } catch (err) {
      setError('Gagal mengirim penilaian: ' + err.message);
      setSaving(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  const finalScore = calculateFinalScore();
  const isFormLocked = assessment && assessment.assessment_id && !isEditing;

  if (loading) {
    return (
      <div className="container py-5">
        <Alert variant="info">Memuat data penilaian...</Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaUserTie className="me-2" />
                Penilaian Sikap Mahasiswa
              </h2>
              <p className="text-muted mb-0">Menilai sikap dan perilaku profesional mahasiswa</p>
            </div>
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Kembali ke Daftar Penilaian
            </Button>
          </div>

          {/* Student Information */}
          {student && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaUserGraduate className="me-2" />
                  Informasi Mahasiswa
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Nama:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Program:</strong> {student.prodi}</p>
                    <p><strong>NIM:</strong> {student.user_id}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Assessment Form - disabled if already assessed and not editing */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Formulir Penilaian Sikap Mahasiswa
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Panduan Penilaian:</strong> Beri nilai dari 1-4 poin untuk setiap aspek. 
                  Nilai akhir = (Total poin / 80) × 100. Skor maksimal: 100 poin.
                </Alert>

                {/* Aspect Fields */}
                <div className="row">
                  {/* 1. Disiplin */}
                  <div className="col-12 mb-2">
                    <h6 className="fw-bold">1. Disiplin</h6>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>a. Selalu hadir tepat waktu sesuai jadwal</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_1}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_1: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>b. Berpakaian sesuai dengan ketentuan</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_2}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_2: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>c. Efektif menggunakan waktu praktik untuk mencapai kompetensi/tujuan pembelajaran</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_3}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_3: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>d. Tepat waktu dalam menyelesaikan tugas</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_4}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_4: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>

                  {/* 2. Tanggung jawab */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">2. Tanggung jawab</h6>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>a. Melaksanakan asuhan keperawatan yang menjadi tanggung jawabnya dengan baik</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_5}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_5: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>b. Mengerjakan seluruh tugas dengan baik</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_6}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_6: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>c. Mentaati tata tertib yang ditetapkan</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_7}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_7: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>d. Tidak melempar tanggung jawab pada orang lain</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_8}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_8: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>

                  {/* 3. Inisiatif */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">3. Inisiatif</h6>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>a. Mengikuti proses praktik klinik dengan sungguh-sungguh</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_9}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_9: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>b. Memiliki kemauan yang tinggi untuk mencapai tujuan PKK</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_10}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_10: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>c. Proaktif selama mengikuti PKK</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_11}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_11: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>d. Mandiri dalam mengerjakan tugas</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_12}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_12: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>

                  {/* 4. Kreativitas */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">4. Kreativitas</h6>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>a. Dapat memanfaatkan sarana yang ada untuk mencapai tujuan PKK</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_13}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_13: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>b. Menggunakan berbagai sumber belajar untuk mencapai tujuan PKK</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_14}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_14: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>c. Dapat menyelesaikan masalah/kesulitan yang ada</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_15}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_15: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>d. Mampu memodifikasi lingkungan untuk mencapai tujuan PKK</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_16}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_16: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>

                  {/* 5. Kerjasama */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">5. Kerjasama</h6>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>a. Dapat bekerjasama dengan baik dengan teman</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_17}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_17: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>b. Dapat bekerjasama dengan baik dengan klien dan keluarga</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_18}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_18: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>c. Dapat bekerjasama dengan baik dengan perawat ruangan</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspek_sikap_19}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_19: val});
                        }}
                        required
                        placeholder="Masukkan nilai (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                      <Form.Group>
                      <Form.Label>d. Dapat bekerjasama dengan baik dengan tim kesehatan lain</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max="4"
                        value={assessmentForm.aspek_sikap_20}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_sikap_20: val});
                        }}
                          required
                        placeholder="Masukkan nilai (1-4)"
                          disabled={isFormLocked}
                        />
                      </Form.Group>
                    </div>
                </div>

                {/* Comments */}
                <div className="row">
                  <div className="col-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Komentar</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={assessmentForm.comments}
                        onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                        placeholder="Komentar tambahan atau saran..."
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                </div>

                {/* Final Score Display */}
                <Card className="mb-4 bg-light">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">
                          <FaCalculator className="me-2" />
                          Nilai Akhir
                        </h6>
                        <p className="text-muted mb-0">
                          Total: {finalScore.toFixed(2)} / 100 poin
                        </p>
                      </div>
                      <div className="text-end">
                        <Badge bg={getScoreColor(finalScore)} className="fs-6 px-3 py-2">
                          {finalScore.toFixed(2)}%
                        </Badge>
                        <ProgressBar 
                          now={finalScore} 
                          max={100} 
                          variant={getScoreColor(finalScore)}
                          className="mt-2"
                          style={{width: '100px'}}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Submit Button */}
                <div className="d-flex justify-content-end gap-2">
                  {(!assessment || isEditing) ? (
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      disabled={saving}
                    >
                      <FaSave className="me-1" />
                      {assessment ? 'Perbarui Penilaian' : 'Simpan Penilaian'}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleEditToggle}
                      disabled={saving}
                    >
                      <FaEdit className="me-1" />
                      Edit Penilaian
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SikapMahasiswaAssessmentPage; 