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

const TelaahArtikelJurnalPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [student, setStudent] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [detailedData, setDetailedData] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [assessmentForm, setAssessmentForm] = useState({
    aspect_jurnal_1: '', aspect_jurnal_2: '', aspect_jurnal_3: '', aspect_jurnal_4: '', aspect_jurnal_5: '',
    comments: ''
  });

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');
  const submissionId = searchParams.get('submissionId');

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
      if (submissionId) {
        fetchSubmissionData();
      }
      fetchExistingAssessment();
    }
  }, [studentId, submissionId]);

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

  const fetchSubmissionData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/${submissionId}`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
      }
    } catch (err) {
      console.error('Error fetching submission data:', err);
    }
  };

  const fetchExistingAssessment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/telaah_artikel_jurnal`);
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
              for (let i = 1; i <= 5; i++) {
                formData[`aspect_jurnal_${i}`] = detailedData.detailed_data[`aspect_jurnal_${i}`] || '';
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
    for (let i = 1; i <= 5; i++) {
      scores.push(parseInt(assessmentForm[`aspect_jurnal_${i}`]) || 0);
    }
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / 20) * 100; // Formula: total aspek/20 x 100
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const assessmentData = {};
    for (let i = 1; i <= 5; i++) {
      assessmentData[`aspect_jurnal_${i}`] = parseInt(assessmentForm[`aspect_jurnal_${i}`]) || 0;
    }
    
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'telaah_artikel_jurnal',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: assessmentData,
      ...(submissionId && { submission_id: submissionId })
    };
    
    console.log('📤 Sending telaah artikel jurnal assessment data:', requestData);
    
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
        console.log('✅ Telaah artikel jurnal assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ Telaah artikel jurnal assessment save failed:', errorData);
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
        <div className="col-lg-12 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaUserTie className="me-2" />
                Telaah Artikel Jurnal Assessment
              </h2>
              <p className="text-muted mb-0">Assess student's journal article review</p>
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
                  Student Information
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Program:</strong> {student.prodi}</p>
                    <p><strong>Student ID:</strong> {student.user_id}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Submission Information */}
          {submission && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaFileAlt className="me-2" />
                  Submission Information
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Submission ID:</strong> {submission.submission_id}</p>
                    <p><strong>Title:</strong> {submission.title}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Submitted:</strong> {new Date(submission.submitted_at).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {submission.status}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Assessment Form */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Telaah Artikel Jurnal Assessment Form
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Scoring Guide:</strong> Rate each aspect from 1-4 points. 
                  Final score = (Total points / 20) × 100. Maximum score: 100 points.
                </Alert>

                {/* Aspect Fields */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>1. Kemampuan mengkorelasikan isi artikel dengan setting RS atau Evidence Based Nursing (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_1}
                        onChange={(e) => setAssessmentForm({...assessmentForm, aspect_jurnal_1: e.target.value})}
                        required
                        placeholder="Enter score (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>2. Kemampuan menguasai materi (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_2}
                        onChange={(e) => setAssessmentForm({...assessmentForm, aspect_jurnal_2: e.target.value})}
                        required
                        placeholder="Enter score (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>3. Kemampuan menelaah artikel berdasarkan referensi lainnya (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_3}
                        onChange={(e) => setAssessmentForm({...assessmentForm, aspect_jurnal_3: e.target.value})}
                        required
                        placeholder="Enter score (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>4. Efisiensi dalam penyampaian Analisa artikel (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_4}
                        onChange={(e) => setAssessmentForm({...assessmentForm, aspect_jurnal_4: e.target.value})}
                        required
                        placeholder="Enter score (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>5. Performance: Attitude, sistematik dan skill komunikasi (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_5}
                        onChange={(e) => setAssessmentForm({...assessmentForm, aspect_jurnal_5: e.target.value})}
                        required
                        placeholder="Enter score (1-4)"
                        disabled={isFormLocked}
                      />
                    </Form.Group>
                  </div>
                </div>

                {/* Comments */}
                <div className="row">
                  <div className="col-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        value={assessmentForm.comments}
                        onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                        placeholder="Additional comments or feedback..."
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
                          Final Score
                        </h6>
                        <p className="text-muted mb-0">
                          Total: {finalScore.toFixed(2)} / 100 points
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
                <div className="d-flex justify-content-end">
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
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Save Assessment
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Existing Assessment Display */}
        </div>
      </div>
    </div>
  );
};

export default TelaahArtikelJurnalPage; 