import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, Alert, Badge, 
  Dropdown, Pagination 
} from 'react-bootstrap';
import { 
  FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaSave, FaDownload, FaEye, 
  FaStar, FaFilter, FaSearch, FaGraduationCap, FaUserGraduate, FaInfoCircle,
  FaClipboardList, FaUserTie, FaChartLine, FaBook, FaFileAlt as FaFile
} from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Check if user has permission to access assessments
  useEffect(() => {
    if (user && (user.role === 'mahasiswa' || user.role === 'student')) {
      setError('Access denied. Only instructors and proceptors can access assessments.');
      setLoading(false);
      return;
    }
  }, [user]);

  useEffect(() => {
    fetchStudents();
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments`);
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      } else {
        throw new Error('Failed to fetch assignments');
      }
    } catch (err) {
      setError('Failed to fetch assignments: ' + err.message);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Use the new endpoint to get all students
      const response = await fetch(`${API_BASE_URL}/api/students`);
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

  const getAssessmentTypes = () => {
    // 5 direct assessments (no assignment required)
    const directAssessments = [
      { type: 'pre_conference', label: 'Penilaian Pre Conference', icon: FaUserTie, color: 'primary', requiresAssignment: false },
      { type: 'post_conference', label: 'Penilaian Post Conference', icon: FaUserTie, color: 'info', requiresAssignment: false },
      { type: 'sikap_mahasiswa', label: 'Penilaian Sikap Mahasiswa', icon: FaUserGraduate, color: 'success', requiresAssignment: false },
      { type: 'keterampilan_prosedural_klinik_dops', label: 'Keterampilan Prosedural Klinik DOPS', icon: FaClipboardList, color: 'warning', requiresAssignment: false },
      { type: 'ujian_klinik', label: 'Penilaian Ujian Klinik', icon: FaChartLine, color: 'danger', requiresAssignment: false }
    ];

    // 4 assignment-based assessments (merged asuhan_keperawatan and analisa_sintesa)
    const assignmentAssessments = [
      { type: 'laporan_pendahuluan', label: 'Penilaian Laporan Pendahuluan', icon: FaFile, color: 'primary', requiresAssignment: true, assignmentType: 'laporan_pendahuluan' },
      { type: 'asuhan_keperawatan', label: 'Penilaian Asuhan Keperawatan & Analisa Sintesa', icon: FaFile, color: 'info', requiresAssignment: true, assignmentType: 'asuhan_keperawatan' },
      { type: 'telaah_artikel_jurnal', label: 'Telaah Artikel Jurnal', icon: FaBook, color: 'warning', requiresAssignment: true, assignmentType: 'artikel_jurnal' },
      { type: 'case_report', label: 'Penilaian Case Report', icon: FaFile, color: 'danger', requiresAssignment: true, assignmentType: 'case_report' }
    ];

    return [...directAssessments, ...assignmentAssessments];
  };

  const navigateToAssessment = (student, assessmentType) => {
    const params = new URLSearchParams({
      studentId: student.user_id,
      studentName: student.name
    });
    // For assignment-based assessments, find the relevant assignment
    if (selectedAssessmentType && selectedAssessmentType.requiresAssignment) {
      const relevantAssignment = assignments.find(a => a.assignment_type === selectedAssessmentType.assignmentType);
      if (relevantAssignment) {
        params.append('assignmentId', relevantAssignment.assignment_id);
      }
    }
    // Navigate to the dedicated page for the assessment type
    navigate(`/pages/assessments/${assessmentType}?${params.toString()}`);
  };

  // Filter and paginate students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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

  const assessmentTypes = getAssessmentTypes();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaGraduationCap className="me-2" />
                Daftar Penilaian Mahasiswa
              </h2>
              <p className="text-muted mb-0">Pilih jenis penilaian dan lakukan penilaian terhadap mahasiswa</p>
            </div>
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Kembali
            </Button>
          </div>

          {/* Assessment Type Selection */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaClipboardList className="me-2" />
                Pilih Jenis Penilaian
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Pilih Jenis Penilaian</Form.Label>
                <Form.Select 
                  value={selectedAssessmentType?.type || ''} 
                  onChange={(e) => {
                    const assessmentType = assessmentTypes.find(a => a.type === e.target.value);
                    setSelectedAssessmentType(assessmentType);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Pilih jenis penilaian...</option>
                  <optgroup label="Penilaian Langsung (Tidak Memerlukan Tugas)">
                    {assessmentTypes.filter(a => !a.requiresAssignment).map(assessment => (
                      <option key={assessment.type} value={assessment.type}>
                        {assessment.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Penilaian Berbasis Tugas">
                    {assessmentTypes.filter(a => a.requiresAssignment).map(assessment => (
                      <option key={assessment.type} value={assessment.type}>
                        {assessment.label}
                      </option>
                    ))}
                  </optgroup>
                </Form.Select>
                {selectedAssessmentType && (
                  <Form.Text className="text-muted">
                    {selectedAssessmentType.requiresAssignment 
                      ? `Penilaian ini memerlukan mahasiswa untuk mengumpulkan tugas dengan tipe: ${selectedAssessmentType.assignmentType}`
                      : 'Penilaian ini merupakan penilaian langsung yang tidak memerlukan pengumpulan tugas'
                    }
                  </Form.Text>
                )}
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Students List - Only show when assessment type is selected */}
          {selectedAssessmentType && (
            <>
              {/* Search and Filter */}
              <Card className="mb-4">
                <Card.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>
                          <FaSearch className="me-2" />
                          Cari Mahasiswa
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Cari berdasarkan nama atau email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>
                          <FaFilter className="me-2" />
                          Filter Berdasarkan Status
                        </Form.Label>
                        <Form.Select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="all">Semua Mahasiswa</option>
                          <option value="assessed">Sudah Dinilai</option>
                          <option value="not_assessed">Belum Dinilai</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Students List */}
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <FaUserGraduate className="me-2" />
                    Daftar Mahasiswa - {selectedAssessmentType.label}
                  </h5>
                </Card.Header>
                <Card.Body>
                  {currentStudents.length === 0 ? (
                    <Alert variant="info">Tidak ada mahasiswa yang sesuai kriteria.</Alert>
                  ) : (
                    <div className="row">
                      {currentStudents.map((student, index) => (
                        <div key={student.user_id} className="col-md-6 col-lg-4 mb-3">
                          <Card className="h-100">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-3">
                                <div className="flex-shrink-0">
                                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    <FaUserGraduate className="text-white" />
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="mb-1">{student.name}</h6>
                                  <small className="text-muted">{student.email}</small>
                                </div>
                              </div>
                              
                              <div className="mb-3">
                                <Badge bg="secondary" className="me-2">
                                  {student.prodi}
                                </Badge>
                                <Badge bg="info">
                                  {student.user_id}
                                </Badge>
                              </div>

                              <div className="d-grid">
                                {student.assessment ? (
                                  <Badge bg="success" className="fs-6 py-2 px-3">
                                    Skor: {student.assessment.score ?? 'N/A'}
                                  </Badge>
                                ) : (
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigateToAssessment(student, selectedAssessmentType.type)}
                                    className="d-flex align-items-center justify-content-center"
                                  >
                                    <FaStar className="me-2" />
                                    Nilai Mahasiswa
                                  </Button>
                                )}
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
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                          return (
                            <Pagination.Item
                              key={page}
                              active={page === currentPage}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Pagination.Item>
                          );
                        })}
                        
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
            </>
          )}

          {/* Instructions */}
          {!selectedAssessmentType && (
            <Card className="border-info">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">
                  <FaInfoCircle className="me-2" />
                  Petunjuk
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Penilaian Langsung</h6>
                    <p className="text-muted">
                      Penilaian ini dapat dilakukan tanpa mahasiswa mengumpulkan tugas. 
                      Dasar penilaiannya berdasarkan pengamatan dan evaluasi langsung.
                    </p>
                    <ul className="text-muted">
                      <li>Penilaian Pre Conference</li>
                      <li>Penilaian Post Conference</li>
                      <li>Penilaian Sikap Mahasiswa</li>
                      <li>Keterampilan Prosedural Klinik DOPS</li>
                      <li>Penilaian Ujian Klinik</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6>Penilaian Berbasis Tugas</h6>
                    <p className="text-muted">
                      Penilaian ini memerlukan mahasiswa untuk mengumpulkan tugas terlebih dahulu. 
                      Penilaian masih dapat dilakukan meskipun tugas belum dikumpulkan.
                    </p>
                    <ul className="text-muted">
                      <li>Penilaian Laporan Pendahuluan</li>
                      <li>Penilaian Asuhan Keperawatan & Analisa Sintesa</li>
                      <li>Telaah Artikel Jurnal</li>
                      <li>Penilaian Case Report</li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage; 