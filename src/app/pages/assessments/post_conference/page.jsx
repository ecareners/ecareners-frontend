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

const PostConferenceAssessmentPage = () => {
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
    aspect_postcon_1: '',
    aspect_postcon_2: '',
    aspect_postcon_3: '',
    aspect_postcon_4: '',
    aspect_postcon_5: '',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');

  const isFormLocked = assessment && assessment.assessment_id && !isEditing;

  // Check if user has permission to access assessments
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
    }
  }, [studentId]);

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
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/post_conference`);
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
              setAssessmentForm({
                aspect_postcon_1: detailedData.detailed_data.aspect_postcon_1 || '',
                aspect_postcon_2: detailedData.detailed_data.aspect_postcon_2 || '',
                aspect_postcon_3: detailedData.detailed_data.aspect_postcon_3 || '',
                aspect_postcon_4: detailedData.detailed_data.aspect_postcon_4 || '',
                aspect_postcon_5: detailedData.detailed_data.aspect_postcon_5 || '',
                comments: data[0].comments || ''
              });
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching existing assessment:', err);
    }
  };

  const calculateFinalScore = () => {
    const scores = [
      parseInt(assessmentForm.aspect_postcon_1) || 0,
      parseInt(assessmentForm.aspect_postcon_2) || 0,
      parseInt(assessmentForm.aspect_postcon_3) || 0,
      parseInt(assessmentForm.aspect_postcon_4) || 0,
      parseInt(assessmentForm.aspect_postcon_5) || 0
    ];
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total * 4; // Formula: total aspects x 4
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'post_conference',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: {
        aspect_postcon_1: parseInt(assessmentForm.aspect_postcon_1) || 0,
        aspect_postcon_2: parseInt(assessmentForm.aspect_postcon_2) || 0,
        aspect_postcon_3: parseInt(assessmentForm.aspect_postcon_3) || 0,
        aspect_postcon_4: parseInt(assessmentForm.aspect_postcon_4) || 0,
        aspect_postcon_5: parseInt(assessmentForm.aspect_postcon_5) || 0
      }
    };
    
    console.log('📤 Sending post-conference assessment data:', requestData);
    
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
        console.log('✅ Post-conference assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ Post-conference assessment save failed:', errorData);
        setError(errorData.message || 'Failed to submit assessment');
        setSaving(false);
      }
    } catch (err) {
      setError('Failed to submit assessment: ' + err.message);
      setSaving(false);
    }
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

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2">
            <div>
              <h2 className="mb-1">
                <FaUserTie className="me-2" />
                Penilaian Post Conference
              </h2>
              <p className="text-muted mb-0">Assess student's post-conference performance</p>
            </div>
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Back to Assessments
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
                <Row>
                  <Col md={6} xs={12} className="mb-2">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                  </Col>
                  <Col md={6} xs={12} className="mb-2">
                    <p><strong>Program:</strong> {student.prodi}</p>
                    <p><strong>Student ID:</strong> {student.user_id}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Assessment Form */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Formulir Penilaian Post Conference
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Panduan Penilaian:</strong> Berikan nilai dari 1-5 untuk setiap aspek. 
                  Skor akhir = (Total skor × 4). Skor maksimal: 100 poin.
                </Alert>

                <Row>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Membuat laporan kasus (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_postcon_1}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_postcon_1: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_postcon_1 ? `Sebelumnya: ${detailedData.aspect_postcon_1}` : 'Masukkan skor (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Kualitas diskusi dan analisis kasus
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Menyampaikan hasil implementasi asuhan keperawatan (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_postcon_2}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_postcon_2: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_postcon_2 ? `Sebelumnya: ${detailedData.aspect_postcon_2}` : 'Masukkan skor (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Kualitas penalaran klinis dan pengambilan keputusan
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Menganalisis rasional tindakan berdasarkan sebab akibat (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_postcon_3}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_postcon_3: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_postcon_3 ? `Sebelumnya: ${detailedData.aspect_postcon_3}` : 'Masukkan skor (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Efektivitas komunikasi dengan tim
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Memberi masukan (tanggapan, pendapat, ide) terhadap asuhan keperawatan yang didiskusikan (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_postcon_4}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_postcon_4: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_postcon_4 ? `Sebelumnya: ${detailedData.aspect_postcon_4}` : 'Masukkan skor (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Perilaku profesional dan sikap
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Memberikan respons (kognitif dan afektif) terhadap masukan (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_postcon_5}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_postcon_5: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_postcon_5 ? `Sebelumnya: ${detailedData.aspect_postcon_5}` : 'Masukkan skor (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Kualitas refleksi dan wawasan belajar
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={assessmentForm.comments}
                        onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                        placeholder="Komentar tambahan atau umpan balik..."
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Final Score Display */}
                <Card className="mb-4 bg-light">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">
                          <FaCalculator className="me-2" />
                          Skor Akhir
                        </h6>
                        <p className="text-muted mb-0">
                          Total: {finalScore} / 100 poin
                        </p>
                      </div>
                      <div className="text-end">
                        <Badge bg={getScoreColor(finalScore)} className="fs-6 px-3 py-2">
                          {finalScore}%
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
                  {isEditing && (
                    <Button 
                      variant="secondary" 
                      onClick={() => setIsEditing(false)}
                      disabled={saving}
                    >
                      <FaTimesCircle className="me-1" />
                      Batal
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={saving}
                    className="d-flex align-items-center"
                  >
                    {saving ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        {isEditing ? 'Perbarui Penilaian' : 'Simpan Penilaian'}
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostConferenceAssessmentPage; 