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

const LaporanPendahuluanPage = () => {
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
    aspect_lappen_1: '',
    aspect_lappen_2: '',
    aspect_lappen_3: '',
    aspect_lappen_4: '',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submission, setSubmission] = useState(null); // Added for fallback

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');
  const submissionId = searchParams.get('submissionId'); // Get submissionId from URL

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
      } else {
        // Fallback: fetch submission by studentId and assignmentId=1 (Laporan Pendahuluan)
        fetchSubmissionByStudentAndAssignment();
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

  const fetchExistingAssessment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/laporan_pendahuluan`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setAssessment(data[0]);
          
          // Fetch detailed data
          const detailedResponse = await fetch(`${API_BASE_URL}/api/assessments/${data[0].assessment_id}/detailed`);
          if (detailedResponse.ok) {
            const detailedData = await detailedResponse.json();
            console.log('Fetched detailedData (laporan_pendahuluan):', detailedData);
            setDetailedData(detailedData.detailed_data);
            
            if (detailedData.detailed_data) {
              setAssessmentForm({
                aspect_lappen_1: detailedData.detailed_data.aspect_lappen_1 || '',
                aspect_lappen_2: detailedData.detailed_data.aspect_lappen_2 || '',
                aspect_lappen_3: detailedData.detailed_data.aspect_lappen_3 || '',
                aspect_lappen_4: detailedData.detailed_data.aspect_lappen_4 || '',
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

  const fetchSubmissionData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/${submissionId}`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
      } else {
        throw new Error('Failed to fetch submission data');
      }
    } catch (err) {
      setError('Failed to fetch submission data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Tambahkan fungsi fallback fetch submission
  const fetchSubmissionByStudentAndAssignment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/${studentId}/1`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
      }
    } catch (err) {
      // Tidak perlu error khusus, biarkan kosong jika tidak ada
    }
  };

  const calculateFinalScore = () => {
    const a1 = parseFloat(assessmentForm.aspect_lappen_1) || 0;
    const a2 = parseFloat(assessmentForm.aspect_lappen_2) || 0;
    const a3 = parseFloat(assessmentForm.aspect_lappen_3) || 0;
    const a4 = parseFloat(assessmentForm.aspect_lappen_4) || 0;
    return (a1 * 0.3) + (a2 * 0.3) + (a3 * 0.2) + (a4 * 0.2);
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'laporan_pendahuluan',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: {
        aspect_lappen_1: parseInt(assessmentForm.aspect_lappen_1) || 0,
        aspect_lappen_2: parseInt(assessmentForm.aspect_lappen_2) || 0,
        aspect_lappen_3: parseInt(assessmentForm.aspect_lappen_3) || 0,
        aspect_lappen_4: parseInt(assessmentForm.aspect_lappen_4) || 0
      }
    };
    
    console.log('📤 Sending laporan pendahuluan assessment data:', requestData);
    
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
        console.log('✅ Laporan pendahuluan assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ Laporan pendahuluan assessment save failed:', errorData);
        setError(errorData.message || 'Failed to submit assessment');
        setSaving(false);
      }
    } catch (err) {
      setError('Failed to submit assessment: ' + err.message);
      setSaving(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaUserTie className="me-2" />
                Laporan Pendahuluan Assessment
              </h2>
              <p className="text-muted mb-0">Assess student's preliminary report</p>
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
          {submission ? (
            <Card className="mb-4 border-success">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <FaCheckCircle className="me-2" />
                  Submission Found
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-8">
                    <p><strong>Submitted:</strong> {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : '-'}</p>
                    <p><strong>Text:</strong> {submission.text}</p>
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="outline-info"
                      onClick={() => window.open(`https://drive.google.com/file/d/${submission.google_drive_file_id}/view`, '_blank')}
                      className="w-100"
                      disabled={!submission.google_drive_file_id}
                    >
                      <FaEye className="me-2" />
                      View File
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
                  No Submission Found
                </h5>
              </Card.Header>
              <Card.Body>
                <Alert variant="warning">
                  <FaInfoCircle className="me-2" />
                  <strong>No Submission:</strong> The student has not submitted a file for this assignment. 
                  You can still provide an assessment based on other criteria or observations.
                </Alert>
              </Card.Body>
            </Card>
          )}

          {/* Assessment Form - disabled if already assessed and not editing */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Laporan Pendahuluan Assessment Form
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Scoring Guide:</strong> Rate each aspect from 1-4 points. 
                  Final score = (Total points / 16) × 100. Maximum score: 100 points.
                </Alert>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>1. Aspek Teoritis Kasus (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspect_lappen_1}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_lappen_1: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>a. Ketepatan pengertian kasus dan tanda dan gejala</div>
                        <div>b. Kemampuan pembuatan patofisiologi atau perjalanan penyakit secara skematik</div>
                        <div>c. Ketepatan penatalaksanaan dan komplikasi</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>2. Aspek Teoritis Keperawatan (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspect_lappen_2}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_lappen_2: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>a. Ketepatan dalam penentuan diagnosa keperawatan</div>
                        <div>b. Kemampuan membuat tujuan dan kriteria hasil</div>
                        <div>c. Ketepatan dalam rencana tindakan</div>
                        <div>d. Ketepatan dalam membuat evaluasi</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>3. Penggunaan Referensi (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspect_lappen_3}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_lappen_3: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>a. Ketepatan referensi yang digunakan, tahun referensi yang digunakan</div>
                        <div>b. Kemampuan merangkum referensi</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>4. Responsi (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspect_lappen_4}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_lappen_4: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>a. Mampu menjawab dengan benar dan logis</div>
                        <div>b. Percaya diri dan tidak ragu-ragu dalam menjawab</div>
                        <div>c. Menerima feedback yang diberikan</div>
                        <div>d. Bersedia memperbaiki kekurangan sesuai dengan feedback</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Comments & Feedback</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={assessmentForm.comments}
                        onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                        placeholder="Provide detailed feedback..."
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
                          {detailedData?.nilai_akhir_lappen !== undefined && detailedData?.nilai_akhir_lappen !== null ? detailedData.nilai_akhir_lappen : finalScore.toFixed(2)}%
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
                {assessment && (
                  isEditing ? (
                    <div className="d-flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                      >
                        <FaTimesCircle className="me-1" />
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        disabled={saving}
                      >
                        <FaSave className="me-1" />
                        Update Assessment
                      </Button>
                    </div>
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
                  )
                )}
                {!assessment && (
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      disabled={saving}
                    >
                      <FaSave className="me-1" />
                      Save Assessment
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LaporanPendahuluanPage; 