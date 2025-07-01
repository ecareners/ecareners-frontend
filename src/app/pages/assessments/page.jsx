import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, Alert, Badge, 
  Modal, ProgressBar, Dropdown, Pagination 
} from 'react-bootstrap';
import { 
  FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaSave, FaDownload, FaEye, 
  FaStar, FaFilter, FaSearch, FaGraduationCap, FaUserGraduate, FaInfoCircle 
} from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [assignments, setAssignments] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [assessmentForm, setAssessmentForm] = useState({
    score: '',
    comments: '',
    assessment_type: 'pre_conference'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [assessmentMode, setAssessmentMode] = useState('assignment'); // 'assignment' or 'direct'

  // Check if user has permission to access assessments
  useEffect(() => {
    if (user && (user.role === 'mahasiswa' || user.role === 'student')) {
      setError('Access denied. Only instructors and proceptors can access assessments.');
      setLoading(false);
      return;
    }
  }, [user]);

  useEffect(() => {
    fetchAssignments();
    fetchAssessmentTypes();
  }, []);

  useEffect(() => {
    if (selectedAssignment && assessmentMode === 'assignment') {
      fetchStudents(selectedAssignment.assignment_id);
    } else if (selectedAssessmentType && assessmentMode === 'direct') {
      fetchStudentsForAssessmentType(selectedAssessmentType);
    }
  }, [selectedAssignment, selectedAssessmentType, assessmentMode]);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/assignments`);
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
        if (data.length > 0) {
          setSelectedAssignment(data[0]);
        }
      } else {
        throw new Error('Failed to fetch assignments');
      }
    } catch (err) {
      console.error('Error fetching assignments:', err);
      // Don't set error here as we can still use direct assessment
    }
  };

  const fetchAssessmentTypes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/assessment-types`);
      if (response.ok) {
        const data = await response.json();
        setAssessmentTypes(data);
        if (data.length > 0) {
          setSelectedAssessmentType(data[0].value);
        }
      } else {
        throw new Error('Failed to fetch assessment types');
      }
    } catch (err) {
      setError('Failed to fetch assessment types: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (assignmentId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        throw new Error('Failed to fetch students');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsForAssessmentType = async (assessmentType) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/assessment-types/${assessmentType}/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        throw new Error('Failed to fetch students for assessment type');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (assessmentMode === 'assignment' && selectedStudent?.submission) {
        // Assessment with submission
        response = await fetch(`${API_BASE_URL}/assessments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            submission_id: selectedStudent.submission.submission_id,
            assessed_user_id: selectedStudent.user_id,
            assessor_user_id: user.user_id,
            assessment_type: assessmentForm.assessment_type,
            score: parseInt(assessmentForm.score),
            comments: assessmentForm.comments,
            academic_year: new Date().getFullYear(),
            semester: 'Ganjil'
          }),
        });
      } else {
        // Direct assessment without submission
        response = await fetch(`${API_BASE_URL}/assessments/direct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assessed_user_id: selectedStudent.user_id,
            assessor_user_id: user.user_id,
            assessment_type: assessmentForm.assessment_type,
            score: parseInt(assessmentForm.score),
            comments: assessmentForm.comments,
            academic_year: new Date().getFullYear(),
            semester: 'Ganjil'
          }),
        });
      }

      if (response.ok) {
        setShowAssessmentModal(false);
        setAssessmentForm({ score: '', comments: '', assessment_type: 'pre_conference' });
        // Refresh students data
        if (assessmentMode === 'assignment' && selectedAssignment) {
          fetchStudents(selectedAssignment.assignment_id);
        } else if (assessmentMode === 'direct' && selectedAssessmentType) {
          fetchStudentsForAssessmentType(selectedAssessmentType);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit assessment');
      }
    } catch (err) {
      setError('Failed to submit assessment: ' + err.message);
    }
  };

  const openAssessmentModal = (student) => {
    setSelectedStudent(student);
    if (student.assessment) {
      setAssessmentForm({
        score: student.assessment.score || '',
        comments: student.assessment.comments || '',
        assessment_type: student.assessment.assessment_type || 'pre_conference'
      });
    } else {
      setAssessmentForm({
        score: '',
        comments: '',
        assessment_type: selectedAssessmentType || 'pre_conference'
      });
    }
    setShowAssessmentModal(true);
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

  // Filter and paginate students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'submitted' && (student.has_submitted || student.has_assessment)) ||
                         (filterStatus === 'not_submitted' && !student.has_submitted && !student.has_assessment);
    return matchesSearch && matchesStatus;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

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
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaGraduationCap className="me-2" />
                Student Assessments
              </h2>
              <p className="text-muted mb-0">Grade student submissions and provide feedback</p>
            </div>
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Back
            </Button>
          </div>

          {/* Assessment Mode Selection */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaFilter className="me-2" />
                Assessment Mode
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Assessment Mode</Form.Label>
                    <Form.Select
                      value={assessmentMode}
                      onChange={(e) => {
                        setAssessmentMode(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="assignment">Assignment-based Assessment</option>
                      <option value="direct">Direct Assessment (Assessment Types Only)</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  {assessmentMode === 'assignment' ? (
                    <Form.Group>
                      <Form.Label>Select Assignment</Form.Label>
                      <Form.Select 
                        value={selectedAssignment?.assignment_id || ''} 
                        onChange={(e) => {
                          const assignment = assignments.find(a => a.assignment_id == e.target.value);
                          setSelectedAssignment(assignment);
                          setCurrentPage(1);
                        }}
                      >
                        {assignments.length > 0 ? (
                          assignments.map(assignment => (
                            <option key={assignment.assignment_id} value={assignment.assignment_id}>
                              {assignment.title} - Due: {new Date(assignment.due_date).toLocaleDateString()}
                            </option>
                          ))
                        ) : (
                          <option value="">No assignments available</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                  ) : (
                    <Form.Group>
                      <Form.Label>Select Assessment Type</Form.Label>
                      <Form.Select
                        value={selectedAssessmentType || ''}
                        onChange={(e) => {
                          setSelectedAssessmentType(e.target.value);
                          setCurrentPage(1);
                        }}
                      >
                        {assessmentTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>

          {selectedAssignment && assessmentMode === 'assignment' && (
            <>
              {/* Assignment Details */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">{selectedAssignment.title}</h5>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-8">
                      <p><strong>Description:</strong></p>
                      <p>{selectedAssignment.description}</p>
                    </div>
                    <div className="col-md-4">
                      <p><strong>Due Date:</strong></p>
                      <p className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2" />
                        {new Date(selectedAssignment.due_date).toLocaleString()}
                      </p>
                      <p><strong>Type:</strong> {selectedAssignment.assignment_type}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </>
          )}

          {selectedAssessmentType && assessmentMode === 'direct' && (
            <>
              {/* Assessment Type Details */}
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">{getAssessmentTypeLabel(selectedAssessmentType)}</h5>
                </Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-md-8">
                      <p><strong>Assessment Type:</strong> {getAssessmentTypeLabel(selectedAssessmentType)}</p>
                      <p><strong>Mode:</strong> Direct Assessment (No Assignment Required)</p>
                      <p className="text-muted">
                        This mode allows you to assess students directly based on their performance, 
                        skills, or behavior without requiring them to submit assignment files.
                      </p>
                    </div>
                    <div className="col-md-4">
                      <Alert variant="info">
                        <FaInfoCircle className="me-2" />
                        <strong>Direct Assessment</strong><br />
                        No submission files required. Assessment based on observation, 
                        performance evaluation, or direct interaction.
                      </Alert>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </>
          )}

          {/* Search and Filter */}
          <Card className="mb-4">
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>
                      <FaSearch className="me-2" />
                      Search Students
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>
                      <FaFilter className="me-2" />
                      Filter by Status
                    </Form.Label>
                    <Form.Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Students</option>
                      {assessmentMode === 'assignment' ? (
                        <>
                          <option value="submitted">Submitted</option>
                          <option value="not_submitted">Not Submitted</option>
                        </>
                      ) : (
                        <>
                          <option value="submitted">Assessed</option>
                          <option value="not_submitted">Not Assessed</option>
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Students List */}
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaUserGraduate className="me-2" />
                Students ({filteredStudents.length})
              </h5>
              <Badge bg="info">
                Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length}
              </Badge>
            </Card.Header>
            <Card.Body>
              {currentStudents.length === 0 ? (
                <Alert variant="info">No students found matching your criteria.</Alert>
              ) : (
                <div className="row">
                  {currentStudents.map((student, index) => (
                    <div key={student.user_id} className="col-12 mb-3">
                      <Card className={
                        assessmentMode === 'assignment' 
                          ? (student.has_submitted ? 'border-success' : 'border-warning')
                          : (student.has_assessment ? 'border-success' : 'border-warning')
                      }>
                        <Card.Body>
                          <div className="row align-items-center">
                            <div className="col-md-3">
                              <h6 className="mb-1">{student.name}</h6>
                              <small className="text-muted">{student.email}</small>
                              <br />
                              <small className="text-muted">{student.prodi}</small>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex align-items-center">
                                {assessmentMode === 'assignment' ? (
                                  student.has_submitted ? (
                                    <>
                                      <FaCheckCircle className="text-success me-2" />
                                      <span className="text-success">Submitted</span>
                                    </>
                                  ) : (
                                    <>
                                      <FaTimesCircle className="text-warning me-2" />
                                      <span className="text-warning">Not Submitted</span>
                                    </>
                                  )
                                ) : (
                                  student.has_assessment ? (
                                    <>
                                      <FaCheckCircle className="text-success me-2" />
                                      <span className="text-success">Assessed</span>
                                    </>
                                  ) : (
                                    <>
                                      <FaTimesCircle className="text-warning me-2" />
                                      <span className="text-warning">Not Assessed</span>
                                    </>
                                  )
                                )}
                              </div>
                              {assessmentMode === 'assignment' && student.submission && (
                                <small className="text-muted">
                                  {new Date(student.submission.submitted_at).toLocaleString()}
                                </small>
                              )}
                              {assessmentMode === 'direct' && student.assessment && (
                                <small className="text-muted">
                                  {new Date(student.assessment.assessment_date).toLocaleString()}
                                </small>
                              )}
                            </div>
                            <div className="col-md-3">
                              {student.assessment ? (
                                <div>
                                  <Badge bg={getScoreColor(student.assessment.score)}>
                                    Score: {student.assessment.score}
                                  </Badge>
                                  <br />
                                  <small className="text-muted">
                                    {getAssessmentTypeLabel(student.assessment.assessment_type)}
                                  </small>
                                </div>
                              ) : (
                                <span className="text-muted">Not assessed</span>
                              )}
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex gap-2">
                                {(assessmentMode === 'assignment' && student.has_submitted) || 
                                 (assessmentMode === 'direct') ? (
                                  <>
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      onClick={() => openAssessmentModal(student)}
                                    >
                                      <FaEdit className="me-1" />
                                      {student.assessment ? 'Edit' : 'Assess'}
                                    </Button>
                                    {assessmentMode === 'assignment' && student.submission && (
                                      <Button
                                        variant="outline-info"
                                        size="sm"
                                        onClick={() => window.open(`https://drive.google.com/file/d/${student.submission.google_drive_file_id}/view`, '_blank')}
                                      >
                                        <FaEye className="me-1" />
                                        View File
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    disabled
                                  >
                                    {assessmentMode === 'assignment' ? 'No Submission' : 'No Assessment'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.First 
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev 
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Next 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last 
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Assessment Modal */}
      <Modal show={showAssessmentModal} onHide={() => setShowAssessmentModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaStar className="me-2" />
            {selectedStudent?.assessment ? 'Edit Assessment' : 'Create Assessment'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAssessmentSubmit}>
          <Modal.Body>
            {selectedStudent && (
              <div className="mb-3">
                <h6>Student: {selectedStudent.name}</h6>
                <p className="text-muted mb-0">{selectedStudent.email}</p>
              </div>
            )}
            
            <Form.Group className="mb-3">
              <Form.Label>Assessment Type</Form.Label>
              <Form.Select
                value={assessmentForm.assessment_type}
                onChange={(e) => setAssessmentForm({...assessmentForm, assessment_type: e.target.value})}
                required
              >
                {assessmentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Score (0-100)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={assessmentForm.score}
                onChange={(e) => setAssessmentForm({...assessmentForm, score: e.target.value})}
                required
                placeholder="Enter score (0-100)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={assessmentForm.comments}
                onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                placeholder="Provide detailed feedback and comments..."
              />
            </Form.Group>

            {assessmentMode === 'assignment' && selectedStudent?.submission && (
              <Alert variant="info">
                <FaFileAlt className="me-2" />
                <strong>Submission File:</strong> 
                <Button
                  variant="link"
                  className="p-0 ms-2"
                  onClick={() => window.open(`https://drive.google.com/file/d/${selectedStudent.submission.google_drive_file_id}/view`, '_blank')}
                >
                  View in Google Drive
                </Button>
              </Alert>
            )}

            {assessmentMode === 'direct' && (
              <Alert variant="warning">
                <FaInfoCircle className="me-2" />
                <strong>Direct Assessment:</strong> This assessment will be created without requiring a submission file.
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAssessmentModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <FaSave className="me-1" />
              {selectedStudent?.assessment ? 'Update Assessment' : 'Save Assessment'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AssessmentPage; 