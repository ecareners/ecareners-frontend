import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Button, Form, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaEdit, FaSave, FaStar, FaUserTie, FaUserGraduate, FaInfoCircle, FaCalculator, FaEye } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const LaporanPage = () => {
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
    aspect_laporan_1: '', aspect_laporan_2: '', aspect_laporan_3: '', aspect_laporan_4: '', aspect_laporan_5: '',
    aspect_laporan_6: '', aspect_laporan_7: '', aspect_laporan_8: '', aspect_laporan_9: '', aspect_laporan_10: '',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submission, setSubmission] = useState(null); // File Asuhan Keperawatan
  const [submissionAnalisaSintesa, setSubmissionAnalisaSintesa] = useState(null); // File Analisa Sintesa

  const studentId = searchParams.get('studentId');
  const assessmentType = searchParams.get('type') || 'asuhan_keperawatan';

  useEffect(() => {
    if (user && (user.role === 'mahasiswa' || user.role === 'student')) {
      setError('Access denied. Only instructors and proceptors can access assessments.');
      setLoading(false);
      return;
    }
  }, [user]);

  useEffect(() => {
    if (studentId) {
      fetchStudentData();
      fetchExistingAssessment();
      if (assessmentType === 'asuhan_keperawatan') {
        fetchSubmissionData();
        fetchSubmissionAnalisaSintesa();
      }
    }
  }, [studentId, assessmentType]);

  useEffect(() => {
    if (
      assessment &&
      assessment.assessment_id &&
      !isEditing
    ) {
      // Sync form with detailedData when not editing
      const formData = { comments: assessment.comments || '' };
      for (let i = 1; i <= 10; i++) {
        formData[`aspect_laporan_${i}`] = detailedData?.[`aspect_laporan_${i}`] || '';
      }
      setAssessmentForm(formData);
    }
  }, [assessment, detailedData, isEditing]);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        throw new Error('Failed to fetch student data');
      }
    } catch (err) {
      setError('Failed to fetch student data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExistingAssessment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/${assessmentType}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setAssessment(data[0]);
          // Fetch detailed data
          const detailedResponse = await fetch(`${API_BASE_URL}/api/assessments/${data[0].assessment_id}/detailed`);
          if (detailedResponse.ok) {
            const detailedData = await detailedResponse.json();
            console.log('Fetched detailedData (laporan):', detailedData);
            setDetailedData(detailedData.detailed_data);
            // Set form fields from detailedData
            if (detailedData.detailed_data) {
              const formData = { comments: data[0].comments || '' };
              for (let i = 1; i <= 10; i++) {
                formData[`aspect_laporan_${i}`] = detailedData.detailed_data[`aspect_laporan_${i}`] || '';
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

  // Tambah fungsi fetch submission untuk asuhan keperawatan
  const fetchSubmissionData = async () => {
    try {
      // Asumsi assignmentId untuk asuhan keperawatan = 2
      const response = await fetch(`${API_BASE_URL}/api/submissions/${studentId}/2`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
      }
    } catch (err) {
      // Tidak perlu error khusus, biarkan kosong jika tidak ada
    }
  };

  // Tambah fungsi fetch submission untuk analisa sintesa
  const fetchSubmissionAnalisaSintesa = async () => {
    try {
      // Asumsi assignmentId untuk analisa sintesa = 4
      const response = await fetch(`${API_BASE_URL}/api/submissions/${studentId}/4`);
      if (response.ok) {
        const data = await response.json();
        setSubmissionAnalisaSintesa(data);
      }
    } catch (err) {
      // Tidak perlu error khusus, biarkan kosong jika tidak ada
    }
  };

  const calculateFinalScore = () => {
    const scores = [];
    for (let i = 1; i <= 10; i++) {
      scores.push(parseInt(assessmentForm[`aspect_laporan_${i}`]) || 0);
    }
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / 40) * 100; // Formula: total aspek/40 x 100
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const assessmentData = {};
    for (let i = 1; i <= 10; i++) {
      assessmentData[`aspect_laporan_${i}`] = parseInt(assessmentForm[`aspect_laporan_${i}`]) || 0;
    }
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: assessmentType,
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: assessmentData
    };
    try {
      const response = await fetch(`${API_BASE_URL}/api/assessments/detailed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        await fetchExistingAssessment();
        setIsEditing(false);
        setSaving(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit assessment');
        setSaving(false);
      }
    } catch (err) {
      setError('Failed to submit assessment: ' + err.message);
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

  if (loading) {
    return (
      <div className="container py-5">
        <Alert variant="info">Loading assessment data...</Alert>
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

  // Determine if form should be locked (assessment exists and not in edit mode)
  const isFormLocked = assessment && !isEditing;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaUserTie className="me-2" />
                {assessmentType === 'asuhan_keperawatan' ? 'Asuhan Keperawatan' : 'Analisa Sintesa'} Assessment
              </h2>
              <p className="text-muted mb-0">Nilai kualitas laporan mahasiswa</p>
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
                    <p><strong>ID Mahasiswa:</strong> {student.user_id}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Submission Information (khusus asuhan keperawatan) */}
          {assessmentType === 'asuhan_keperawatan' && (
            <>
              {/* File Asuhan Keperawatan */}
              {submission ? (
                <Card className="mb-4 border-success">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">
                      <FaCheckCircle className="me-2" />
                      File Asuhan Keperawatan
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-8">
                        <p><strong>Dikumpulkan:</strong> {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : '-'}</p>
                        <p><strong>Teks:</strong> {submission.text}</p>
                      </div>
                      <div className="col-md-4">
                        <Button
                          variant="outline-info"
                          onClick={() => window.open(`https://drive.google.com/file/d/${submission.google_drive_file_id}/view`, '_blank')}
                          className="w-100"
                          disabled={!submission.google_drive_file_id}
                        >
                          <FaEye className="me-2" />
                          Lihat File
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="mb-4 border-warning">
                  <Card.Header className="bg-warning text-dark">
                    <h5 className="mb-0">
                      <FaTimesCircle className="me-2" />
                      File Asuhan Keperawatan Tidak Ditemukan
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="warning">
                      <FaInfoCircle className="me-2" />
                      <strong>Tidak Ada Submisi:</strong> Mahasiswa belum mengumpulkan file untuk Asuhan Keperawatan. 
                      Anda masih dapat memberikan penilaian berdasarkan kriteria lain atau observasi.
                    </Alert>
                  </Card.Body>
                </Card>
              )}
              {/* File Analisa Sintesa */}
              {submissionAnalisaSintesa ? (
                <Card className="mb-4 border-success">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">
                      <FaCheckCircle className="me-2" />
                      File Analisa Sintesa
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="row">
                      <div className="col-md-8">
                        <p><strong>Dikumpulkan:</strong> {submissionAnalisaSintesa.submitted_at ? new Date(submissionAnalisaSintesa.submitted_at).toLocaleString() : '-'}</p>
                        <p><strong>Teks:</strong> {submissionAnalisaSintesa.text}</p>
                      </div>
                      <div className="col-md-4">
                        <Button
                          variant="outline-info"
                          onClick={() => window.open(`https://drive.google.com/file/d/${submissionAnalisaSintesa.google_drive_file_id}/view`, '_blank')}
                          className="w-100"
                          disabled={!submissionAnalisaSintesa.google_drive_file_id}
                        >
                          <FaEye className="me-2" />
                          Lihat File
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="mb-4 border-warning">
                  <Card.Header className="bg-warning text-dark">
                    <h5 className="mb-0">
                      <FaTimesCircle className="me-2" />
                      File Analisa Sintesa Tidak Ditemukan
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="warning">
                      <FaInfoCircle className="me-2" />
                      <strong>Tidak Ada Submisi:</strong> Mahasiswa belum mengumpulkan file untuk Analisa Sintesa. 
                      Anda masih dapat memberikan penilaian berdasarkan kriteria lain atau observasi.
                    </Alert>
                  </Card.Body>
                </Card>
              )}
            </>
          )}

          {/* Already Assessed Message */}
          {assessment && assessment.assessment_id && !isEditing && (
            <Alert variant="success" className="mb-4">
              <FaCheckCircle className="me-2" />
              <strong>Mahasiswa ini sudah dinilai.</strong>{' '}
              {detailedData && detailedData.nilai_akhir_laporan && (
                <span>
                  Nilai: <Badge bg={getScoreColor(detailedData.nilai_akhir_laporan)}>{detailedData.nilai_akhir_laporan}/100</Badge>
                </span>
              )}
              <Button variant="warning" size="sm" className="ms-3" onClick={() => setIsEditing(true)}>
                <FaEdit className="me-1" /> Edit Penilaian
              </Button>
            </Alert>
          )}

          {/* Assessment Form - disabled if already assessed and not editing */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Formulir Penilaian {assessmentType === 'asuhan_keperawatan' ? 'Asuhan Keperawatan' : 'Analisa Sintesa'}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Panduan Penilaian:</strong> Beri skor setiap aspek dari 1-4 poin. 
                  Nilai akhir = (Total poin / 40) × 100. Nilai maksimum: 100 poin.
                </Alert>

                {/* Aspect Fields */}
                <div className="row">
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>1. Mengumpulkan data yang komprehensif dan akurat (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_1}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_1: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>2. Mengidentifikasi masalah klien yang aktual dan risiko (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_2}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_2: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>3. Memprioritaskan masalah klien (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_3}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_3: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>4. Merumuskan diagnosa berdasarkan masalah yang ditemukan sesuai dengan kebutuhan klien (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_4}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_4: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>5. Menetapkan tujuan tindakan sesuai diagnosa keperawatan (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_5}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_5: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>6. Membuat kriteria evaluasi klien (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_6}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_6: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>7. Menetapkan tindakan untuk mencapai tujuan (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_7}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_7: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>8. Mengimplementasikan tindakan sesuai rencana (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_8}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_8: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>9. Mencatat semua perilaku klien setelah implementasi dan melakukan penilaian keberhasilan rencana tindakan (1-4 poin)</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max="4"
                      value={assessmentForm.aspect_laporan_9}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_9: val});
                      }}
                      required
                      placeholder="Masukkan skor (1-4)"
                      disabled={isFormLocked}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>10. Mengevaluasi pencapaian kemampuan klien untuk tiap diagnosa keperawatan (1-4 poin)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                      value={assessmentForm.aspect_laporan_10}
                      onChange={(e) => {
                        let val = Math.min(4, Math.max(1, Number(e.target.value)));
                        setAssessmentForm({...assessmentForm, aspect_laporan_10: val});
                      }}
                        required
                      placeholder="Masukkan skor (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                </div>

                {/* Comments */}
                <Form.Group className="mb-3">
                  <Form.Label>Komentar & Saran</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={assessmentForm.comments}
                    onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                    placeholder="Berikan saran yang detail..."
                    disabled={isFormLocked}
                  />
                </Form.Group>

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
                          {detailedData?.nilai_akhir_laporan !== undefined && detailedData?.nilai_akhir_laporan !== null ? detailedData.nilai_akhir_laporan : finalScore.toFixed(2)}%
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
                  {assessment && (
                    isEditing ? (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                          disabled={saving}
                        >
                          <FaTimesCircle className="me-1" />
                          Batal
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          type="submit"
                          disabled={saving}
                        >
                          <FaSave className="me-1" />
                          Perbarui Penilaian
                        </Button>
                      </>
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
                    )
                  )}
                  {!assessment && (
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      disabled={saving}
                    >
                      <FaSave className="me-1" />
                      Simpan Penilaian
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

export default LaporanPage; 