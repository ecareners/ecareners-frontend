import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, Alert, Badge, 
  ProgressBar 
} from 'react-bootstrap';
import { 
  FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaSave, FaDownload, FaEye, 
  FaStar, FaUserTie, FaUserGraduate, FaInfoCircle, FaFile, FaCalculator, FaLock 
} from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CaseReportAssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [student, setStudent] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  // State assessmentForm
  const [assessmentForm, setAssessmentForm] = useState({
    aspek_casport_1: '',
    aspek_casport_2: '',
    aspek_casport_3: '',
    aspek_casport_4: '',
    comments: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [detailedData, setDetailedData] = useState(null);

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');
  const submissionId = searchParams.get('submissionId');

  // Add aspect labels for clarity
  const aspectLabels = [
    'Kelengkapan Data Kasus',
    'Analisis Masalah',
    'Rencana Tindakan',
    'Evaluasi dan Refleksi'
  ];

  // Tambahkan fungsi untuk cek apakah form terkunci
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
      if (submissionId) {
        fetchSubmissionData();
      } else {
        // Fallback: fetch submission by studentId and assignmentId=3 (Case Report)
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

  // Tambahkan fungsi fallback fetch submission
  const fetchSubmissionByStudentAndAssignment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/${studentId}/3`);
      if (response.ok) {
        const data = await response.json();
        setSubmission(data);
      }
    } catch (err) {
      // Tidak perlu error khusus, biarkan kosong jika tidak ada
    }
  };

  // fetchExistingAssessment: set form dari detailed_data jika ada
  const fetchExistingAssessment = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/case_report`);
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
              for (let i = 1; i <= 4; i++) {
                formData[`aspek_casport_${i}`] = detailedData.detailed_data[`aspek_casport_${i}`] || '';
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
    const a1 = parseInt(assessmentForm['aspek_casport_1']) || 0;
    const a2 = parseInt(assessmentForm['aspek_casport_2']) || 0;
    const a3 = parseInt(assessmentForm['aspek_casport_3']) || 0;
    const a4 = parseInt(assessmentForm['aspek_casport_4']) || 0;
    return a1 * 0.5 + a2 * 0.1 + a3 * 0.1 + a4 * 0.3;
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const assessmentData = {};
    for (let i = 1; i <= 4; i++) {
      assessmentData[`aspek_casport_${i}`] = parseInt(assessmentForm[`aspek_casport_${i}`]) || 0;
    }
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'case_report',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: assessmentData,
      ...(submissionId && { submission_id: submissionId })
    };
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
        await fetchExistingAssessment();
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
    setIsEditing(!isEditing);
    // Reset form values if toggling to edit
    if (!isEditing) {
      setAssessmentForm({
        aspek_casport_1: assessment && assessment.detailed_data ? assessment.detailed_data.aspek_casport_1 || '' : '',
        aspek_casport_2: assessment && assessment.detailed_data ? assessment.detailed_data.aspek_casport_2 || '' : '',
        aspek_casport_3: assessment && assessment.detailed_data ? assessment.detailed_data.aspek_casport_3 || '' : '',
        aspek_casport_4: assessment && assessment.detailed_data ? assessment.detailed_data.aspek_casport_4 || '' : '',
        comments: assessment ? assessment.comments || '' : ''
      });
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'danger';
  };

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

  const finalScore = calculateFinalScore();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaFile className="me-2" />
                Penilaian Case Report
              </h2>
              <p className="text-muted mb-0">Assess student's case report submission</p>
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

          {/* Assignment Information */}
          {/* This section is removed as per the new_code, as the assignment is not directly linked to the case report assessment */}

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
                    <p><strong>Submitted:</strong> {new Date(submission.submitted_at).toLocaleString()}</p>
                    <p><strong>Text:</strong> {submission.text}</p>
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="outline-info"
                      onClick={() => window.open(`https://drive.google.com/file/d/${submission.google_drive_file_id}/view`, '_blank')}
                      className="w-100"
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

          {/* Already Assessed Message */}
          {assessment && assessment.assessment_id && !isEditing && (
            <Alert variant="success" className="mb-4">
              <FaCheckCircle className="me-2" />
              <strong>This user has already been assessed.</strong>{' '}
              {assessment.score && (
                <span>
                  Score: <Badge bg={getScoreColor(assessment.score)}>{assessment.score}/100</Badge>
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
                Formulir Penilaian Case Report
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Scoring Guide:</strong> Rate each aspect from 1-100 points. 
                  Final score = (Aspect 1 × 50% + Aspect 2 × 10% + Aspect 3 × 10% + Aspect 4 × 30%). Maximum score: 100 points.
                </Alert>
                {isFormLocked && (
                  <Alert variant="info" className="mb-3">
                    <FaLock className="me-2" />
                    Assessment is locked. Click "Edit Assessment" to modify.
                  </Alert>
                )}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>1. Penyajian Makalah (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspek_casport_1}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_casport_1: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>Konsep Teoritis Kasus</div>
                        <div>Asuhan Keperawatan:</div>
                        <div className="ms-3">- Pengkajian (Primary dan Secondary Survey)</div>
                        <div className="ms-3">- Analisa Data (DS / DO)</div>
                        <div className="ms-3">- Diagnosa Keperawatan (disusun berdasarkan prioritas)</div>
                        <div className="ms-3">- Intervensi Keperawatan (termasuk Tujuan dan Kriteria Hasil dengan kaidah SMART)</div>
                        <div className="ms-3">- Implementasi Keperawatan</div>
                        <div className="ms-3">- Evaluasi (SOAP)</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>2. Penggunaan Referensi (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspek_casport_2}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_casport_2: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>Relevansi</div>
                        <div>Komprehensivitas</div>
                        <div>Kekinian</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>3. Penulisan makalah (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspek_casport_3}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_casport_3: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>Cara penulisan</div>
                        <div>Sistematika penulisan</div>
                        <div>Ketepatan penggunaan Bahasa</div>
                        <div>Sesuai dengan format</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>4. Presentasi dan Tanya Jawab (1-100 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="100"
                        value={assessmentForm.aspek_casport_4}
                        onChange={(e) => {
                          let val = Math.min(100, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspek_casport_4: val});
                        }}
                        required
                        placeholder="Enter score (1-100)"
                        disabled={isFormLocked}
                      />
                      <Form.Text className="text-muted d-block">
                        <div>Kejelasan mengemukakan isi makalah</div>
                        <div>Kemampuan penyajian</div>
                        <div>Penguasaan materi</div>
                        <div>Ketepatan menjawab pertanyaan</div>
                        <div>Kemampuan berargumentasi</div>
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
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

        </div>
      </div>
    </div>
  );
};

export default CaseReportAssessmentPage; 