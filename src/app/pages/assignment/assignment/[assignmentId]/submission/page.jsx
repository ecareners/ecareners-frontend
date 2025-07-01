import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaEdit, FaSave, FaUpload, FaCloudUploadAlt, FaStar, FaUserTie } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';
import pattern4 from '@/assets/images/pattern/04.png';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SubmissionPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    google_drive_file_id: '',
    text: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch assignment details
        const assignmentResponse = await fetch(`${API_BASE_URL}/assignments`);
        const assignments = await assignmentResponse.json();
        const currentAssignment = assignments.find(a => a.assignment_id == assignmentId);
        
        if (!currentAssignment) {
          throw new Error('Assignment not found');
        }
        
        setAssignment(currentAssignment);
        
        // Fetch user's submission for this assignment
        if (user) {
          try {
            const submissionResponse = await fetch(`${API_BASE_URL}/submissions/${user.user_id}/${assignmentId}`);
            if (submissionResponse.ok) {
              const submissionData = await submissionResponse.json();
              setSubmission(submissionData);
              setFormData({
                google_drive_file_id: submissionData.google_drive_file_id,
                text: submissionData.text
              });
              
              // Fetch assessment for this submission
              try {
                const assessmentResponse = await fetch(`${API_BASE_URL}/users/${user.user_id}/assessments`);
                if (assessmentResponse.ok) {
                  const assessments = await assessmentResponse.json();
                  console.log('📊 All assessments:', assessments);
                  
                  // Find assessment for this specific assignment by assignment_id
                  const assignmentAssessment = assessments.find(a => 
                    a.assignment_id == assignmentId
                  );
                  
                  console.log(`🎯 Found assessment for assignment ${assignmentId}:`, assignmentAssessment);
                  setAssessment(assignmentAssessment);
                }
              } catch (err) {
                console.log('❌ Error fetching assessment:', err.message);
              }
            } else if (submissionResponse.status === 404) {
              // No submission found, that's okay
              console.log('No submission found for this assignment');
            } else {
              throw new Error('Failed to fetch submission');
            }
          } catch (err) {
            // No submission found, that's okay
            console.log('No submission found for this assignment:', err.message);
          }
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assignmentId, user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null); // Clear any previous errors
    }
  };

  const uploadFileToDrive = async (file) => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch(`${API_BASE_URL}/upload-to-drive`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }

      const data = await response.json();
      return data.fileId;

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let fileId = formData.google_drive_file_id;

      // If there's a new file selected, upload it first
      if (selectedFile && !formData.google_drive_file_id) {
        fileId = await uploadFileToDrive(selectedFile);
      }

      if (!fileId) {
        setError('Please select a file to upload');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id,
          google_drive_file_id: fileId,
          text: formData.text
        }),
      });

      if (response.ok) {
        // Refresh submission data
        const submissionResponse = await fetch(`${API_BASE_URL}/submissions/${user.user_id}/${assignmentId}`);
        if (submissionResponse.ok) {
          const submissionData = await submissionResponse.json();
          setSubmission(submissionData);
        }
        setIsEditing(false);
        setSelectedFile(null);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit assignment');
      }
    } catch (err) {
      setError('Failed to submit assignment: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    if (!assignment?.due_date) return false;
    return new Date(assignment.due_date) < new Date();
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'info';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  const getAssessmentTypeLabel = (type) => {
    const types = {
      'pre_conference': 'Pre Conference',
      'post_conference': 'Post Conference',
      'laporan_pendahuluan': 'Laporan Pendahuluan',
      'asuhan_keperawatan': 'Asuhan Keperawatan',
      'analisa_sintesa': 'Analisa Sintesa',
      'sikap_mahasiswa': 'Sikap Mahasiswa',
      'keterampilan_prosedural_klinik_dops': 'Keterampilan Prosedural Klinik DOPS',
      'ujian_klinik': 'Ujian Klinik',
      'telaah_artikel_jurnal': 'Telaah Artikel Jurnal',
      'case_report': 'Case Report'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <Alert variant="info">Loading assignment details...</Alert>
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
        <div className="col-lg-8 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Back to Assignments
            </Button>
          </div>

          {/* Assignment Details */}
          <Card className="mb-4">
            <Card.Header>
              <h3 className="mb-0">{assignment.title}</h3>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Description:</strong></p>
                  <p>{assignment.description}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Due Date:</strong></p>
                  <p className="d-flex align-items-center">
                    <FaCalendarAlt className="me-2" />
                    {formatDate(assignment.due_date)}
                    {isOverdue() && (
                      <Badge bg="danger" className="ms-2">
                        Overdue
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Assessment Score Card */}
          {assessment && (
            <Card className="mb-4 border-success">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">
                  <FaStar className="me-2" />
                  Assessment Result
                </h4>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Score:</strong>
                      <div className="mt-2">
                        <Badge 
                          bg={getScoreColor(assessment.score)} 
                          className="fs-5 px-3 py-2"
                        >
                          {assessment.score}/100
                        </Badge>
                      </div>
                    </div>
                    <div className="mb-3">
                      <strong>Assessment Type:</strong>
                      <p className="mb-1">{getAssessmentTypeLabel(assessment.assessment_type)}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Assessed By:</strong>
                      <p className="mb-1">
                        <FaUserTie className="me-2" />
                        {assessment.assessor_name}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Assessment Date:</strong>
                      <p className="mb-1">{formatDate(assessment.assessment_date)}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Academic Year:</strong>
                      <p className="mb-1">{assessment.academic_year} - {assessment.semester}</p>
                    </div>
                    {assessment.comments && (
                      <div className="mb-3">
                        <strong>Comments:</strong>
                        <p className="mb-1">{assessment.comments}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Submission Form/Details */}
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Your Submission</h4>
              {submission && !isEditing && !assessment && (
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit className="me-1" />
                  Edit
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {submission ? (
                isEditing ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaCloudUploadAlt className="me-2" />
                        Upload New File
                      </Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                        disabled={uploading}
                      />
                      <Form.Text className="text-muted">
                        Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF (Max 10MB)
                      </Form.Text>
                    </Form.Group>

                    {uploading && (
                      <div className="mb-3">
                        <ProgressBar 
                          now={uploadProgress} 
                          label={`${uploadProgress}%`}
                          variant="primary"
                        />
                        <small className="text-muted">Uploading to Google Drive...</small>
                      </div>
                    )}
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Submission Text</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={formData.text}
                        onChange={(e) => setFormData({...formData, text: e.target.value})}
                        required
                        placeholder="Enter your submission text or notes"
                      />
                    </Form.Group>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={uploading}
                      >
                        <FaSave className="me-1" />
                        {uploading ? 'Uploading...' : 'Update Submission'}
                      </Button>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setIsEditing(false)}
                        disabled={uploading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div>
                    <div className="mb-3">
                      <strong>Google Drive File ID:</strong>
                      <p className="mb-1">{submission.google_drive_file_id}</p>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Submission Text:</strong>
                      <p className="mb-1">{submission.text}</p>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Submitted At:</strong>
                      <p className="mb-1">{formatDate(submission.submitted_at)}</p>
                    </div>
                    
                    {assessment ? (
                      <Alert variant="success">
                        <FaCheckCircle className="me-2" />
                        Your assignment has been submitted and assessed successfully!
                      </Alert>
                    ) : (
                      <Alert variant="info">
                        <FaCheckCircle className="me-2" />
                        Your assignment has been submitted successfully! Waiting for assessment.
                      </Alert>
                    )}
                  </div>
                )
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaCloudUploadAlt className="me-2" />
                      Upload Assignment File
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                      required
                      disabled={uploading}
                    />
                    <Form.Text className="text-muted">
                      Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF (Max 10MB)
                    </Form.Text>
                  </Form.Group>

                  {uploading && (
                    <div className="mb-3">
                      <ProgressBar 
                        now={uploadProgress} 
                        label={`${uploadProgress}%`}
                        variant="primary"
                      />
                      <small className="text-muted">Uploading to Google Drive...</small>
                    </div>
                  )}
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Submission Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                      required
                      placeholder="Enter your submission text or notes"
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isOverdue() || uploading}
                  >
                    <FaFileAlt className="me-1" />
                    {uploading ? 'Uploading...' : 'Submit Assignment'}
                  </Button>
                  
                  {isOverdue() && (
                    <Alert variant="warning" className="mt-3">
                      <FaTimesCircle className="me-2" />
                      This assignment is overdue. Please contact your instructor.
                    </Alert>
                  )}
                </Form>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage; 