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

const PreConferenceAssessmentPage = () => {
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
    aspect_precon_1: '',
    aspect_precon_2: '',
    aspect_precon_3: '',
    aspect_precon_4: '',
    aspect_precon_5: '',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');

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

  useEffect(() => {
    if (
      assessment &&
      assessment.assessment_id &&
      !isEditing
    ) {
      setAssessmentForm({
        aspect_precon_1: detailedData?.aspect_precon_1 || '',
        aspect_precon_2: detailedData?.aspect_precon_2 || '',
        aspect_precon_3: detailedData?.aspect_precon_3 || '',
        aspect_precon_4: detailedData?.aspect_precon_4 || '',
        aspect_precon_5: detailedData?.aspect_precon_5 || '',
        comments: assessment.comments || ''
      });
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
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/pre_conference`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setAssessment(data[0]);
          // Fetch detailed data
          const detailedResponse = await fetch(`${API_BASE_URL}/api/assessments/${data[0].assessment_id}/detailed`);
          if (detailedResponse.ok) {
            const detailedData = await detailedResponse.json();
            console.log('Full response from /api/assessments/:id/detailed:', detailedData);
            setDetailedData(detailedData.detailed_data);
            if (detailedData.detailed_data) {
              const formObj = {
                aspect_precon_1: detailedData.detailed_data.aspect_precon_1 || '',
                aspect_precon_2: detailedData.detailed_data.aspect_precon_2 || '',
                aspect_precon_3: detailedData.detailed_data.aspect_precon_3 || '',
                aspect_precon_4: detailedData.detailed_data.aspect_precon_4 || '',
                aspect_precon_5: detailedData.detailed_data.aspect_precon_5 || '',
                comments: data[0].comments || ''
              };
              setAssessmentForm(formObj);
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
      parseInt(assessmentForm.aspect_precon_1) || 0,
      parseInt(assessmentForm.aspect_precon_2) || 0,
      parseInt(assessmentForm.aspect_precon_3) || 0,
      parseInt(assessmentForm.aspect_precon_4) || 0,
      parseInt(assessmentForm.aspect_precon_5) || 0
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
      assessment_type: 'pre_conference',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: {
        aspect_precon_1: parseInt(assessmentForm.aspect_precon_1) || 0,
        aspect_precon_2: parseInt(assessmentForm.aspect_precon_2) || 0,
        aspect_precon_3: parseInt(assessmentForm.aspect_precon_3) || 0,
        aspect_precon_4: parseInt(assessmentForm.aspect_precon_4) || 0,
        aspect_precon_5: parseInt(assessmentForm.aspect_precon_5) || 0
      }
    };
    
    console.log('📤 Sending assessment data:', requestData);
    console.log('📤 Assessment data structure:', {
      has_assessment_data: !!requestData.assessment_data,
      assessment_data_keys: requestData.assessment_data ? Object.keys(requestData.assessment_data) : [],
      aspect_values: requestData.assessment_data ? {
        aspect_precon_1: requestData.assessment_data.aspect_precon_1,
        aspect_precon_2: requestData.assessment_data.aspect_precon_2,
        aspect_precon_3: requestData.assessment_data.aspect_precon_3,
        aspect_precon_4: requestData.assessment_data.aspect_precon_4,
        aspect_precon_5: requestData.assessment_data.aspect_precon_5
      } : null
    });
    
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
        console.log('✅ Assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ Assessment save failed:', errorData);
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

  // Tentukan apakah form terkunci
  const isFormLocked = assessment && assessment.assessment_id && !isEditing;

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
                Penilaian Pre Conference
              </h2>
              <p className="text-muted mb-0">Assess student's pre-conference performance</p>
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

          {/* Already Assessed Message */}
          {assessment && assessment.assessment_id && !isEditing && (
            <Alert variant="success" className="mb-4">
              <FaCheckCircle className="me-2" />
              <strong>This user has already been assessed.</strong>{' '}
              {detailedData && detailedData.nilai_akhir_precon && (
                <span>
                  Score: <Badge bg={getScoreColor(detailedData.nilai_akhir_precon)}>{detailedData.nilai_akhir_precon}/100</Badge>
                </span>
              )}
              <Button variant="warning" size="sm" className="ms-3" onClick={() => setIsEditing(true)}>
                <FaEdit className="me-1" /> Edit Assessment
              </Button>
            </Alert>
          )}
          {/* Assessment Form - disabled if already assessed and not editing */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Formulir Penilaian Pre Conference
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Scoring Guide:</strong> Rate each aspect from 1-5 points. 
                  Final score = (Total points × 4). Maximum score: 100 points.
                </Alert>

                <Row>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Membuat laporan pendahuluan (LP) (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_precon_1}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_precon_1: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_precon_1 ? `Previous: ${detailedData.aspect_precon_1}` : 'Enter score (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Clarity and completeness of case presentation
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Menyampaikan rencana asuhan keperawatan (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_precon_2}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_precon_2: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_precon_2 ? `Previous: ${detailedData.aspect_precon_2}` : 'Enter score (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Quality of clinical reasoning and analysis
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} xs={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Menyampaikan hasil asuhan keperawatan (1-5 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={assessmentForm.aspect_precon_3}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_precon_3: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_precon_3 ? `Previous: ${detailedData.aspect_precon_3}` : 'Enter score (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Relevance and depth of questions asked
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
                        value={assessmentForm.aspect_precon_4}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_precon_4: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_precon_4 ? `Previous: ${detailedData.aspect_precon_4}` : 'Enter score (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Level of preparation and readiness
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
                        value={assessmentForm.aspect_precon_5}
                        onChange={(e) => {
                          let val = Math.min(5, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_precon_5: val});
                        }}
                        required
                        placeholder={detailedData?.aspect_precon_5 ? `Previous: ${detailedData.aspect_precon_5}` : 'Enter score (1-5)'}
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted">
                        Clarity and effectiveness of communication
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <Card className="bg-light h-100">
                      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                        <h6 className="mb-2">
                          <FaCalculator className="me-2" />
                          Calculated Final Score
                        </h6>
                        <Badge 
                          bg={getScoreColor(finalScore)} 
                          className="fs-5 px-3 py-2 mb-2"
                        >
                          {finalScore}/100
                        </Badge>
                        <small className="d-block text-muted mt-1">
                          (Total: {[
                            parseInt(assessmentForm.aspect_precon_1) || 0,
                            parseInt(assessmentForm.aspect_precon_2) || 0,
                            parseInt(assessmentForm.aspect_precon_3) || 0,
                            parseInt(assessmentForm.aspect_precon_4) || 0,
                            parseInt(assessmentForm.aspect_precon_5) || 0
                          ].reduce((sum, score) => sum + score, 0)} × 4)
                        </small>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Comments & Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={assessmentForm.comments}
                    onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                    placeholder="Provide detailed feedback about the student's pre-conference performance..."
                    disabled={isFormLocked}
                  />
                  <Form.Text className="text-muted">
                    Include specific observations and recommendations for improvement
                  </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  {(!assessment || isEditing) ? (
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      disabled={saving}
                    >
                      <FaSave className="me-1" />
                      {assessment ? 'Update Assessment' : 'Save Assessment'}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleEditToggle}
                      disabled={saving}
                    >
                      <FaEdit className="me-1" />
                      Edit Assessment
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

export default PreConferenceAssessmentPage; 