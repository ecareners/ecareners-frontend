import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Form, Alert, Badge, 
  ProgressBar 
} from 'react-bootstrap';
import { 
  FaArrowLeft, FaFileAlt, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaSave, FaDownload, FaEye, 
  FaStar, FaUserTie, FaUserGraduate, FaInfoCircle, FaBook
} from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ArtikelJurnalAssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [student, setStudent] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [assessmentForm, setAssessmentForm] = useState({
    aspect_jurnal_1: '',
    aspect_jurnal_2: '',
    aspect_jurnal_3: '',
    aspect_jurnal_4: '',
    aspect_jurnal_5: '',
    comments: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const studentId = searchParams.get('studentId');
  const studentName = searchParams.get('studentName');
  const assignmentId = searchParams.get('assignmentId');

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
      Promise.all([
        fetchStudentData(),
        fetchAssignmentData(),
        fetchSubmissionData(),
        fetchExistingAssessment()
      ]).finally(() => setLoading(false));
    }
  }, [studentId, assignmentId]);

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
    }
  };

  const fetchAssignmentData = async () => {
    if (!assignmentId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments/${assignmentId}`);
      if (response.ok) {
        const data = await response.json();
        setAssignment(data);
      }
    } catch (err) {
      console.error('Error fetching assignment data:', err);
    }
  };

  const fetchSubmissionData = async () => {
    if (!studentId || !assignmentId) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/${studentId}/${assignmentId}`);
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
            console.log('Fetched detailedData (artikel_jurnal):', detailedData);
            setAssessment(prev => ({ ...prev, detailed_data: detailedData.detailed_data }));
            // Set form fields from detailedData
            let formData = { comments: data[0].comments || '' };
            for (let i = 1; i <= 5; i++) {
              formData[`aspect_jurnal_${i}`] = detailedData.detailed_data?.[`aspect_jurnal_${i}`] || '';
            }
            setAssessmentForm(formData);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching existing assessment:', err);
    }
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const assessmentData = {};
      for (let i = 1; i <= 5; i++) {
        assessmentData[`aspect_jurnal_${i}`] = parseInt(assessmentForm[`aspect_jurnal_${i}`]) || 0;
      }
      let response;
      if (submission) {
        response = await fetch(`${API_BASE_URL}/api/assessments/detailed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            submission_id: submission.submission_id,
            assessed_user_id: studentId,
            assessor_user_id: user.user_id,
            assessment_type: 'telaah_artikel_jurnal',
            comments: assessmentForm.comments,
            academic_year: new Date().getFullYear(),
            semester: 'Ganjil',
            assessment_data: assessmentData,
          }),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/assessments/detailed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessed_user_id: studentId,
            assessor_user_id: user.user_id,
            assessment_type: 'telaah_artikel_jurnal',
            comments: assessmentForm.comments,
            academic_year: new Date().getFullYear(),
            semester: 'Ganjil',
            assessment_data: assessmentData,
          }),
        });
      }
      if (response.ok) {
        await fetchExistingAssessment();
        setSaving(false);
        setIsEditing(false);
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
    // Reset form values if entering edit mode
    if (!isEditing) {
      setAssessmentForm({
        aspect_jurnal_1: assessment ? assessment.detailed_data?.[`aspect_jurnal_1`] || '' : '',
        aspect_jurnal_2: assessment ? assessment.detailed_data?.[`aspect_jurnal_2`] || '' : '',
        aspect_jurnal_3: assessment ? assessment.detailed_data?.[`aspect_jurnal_3`] || '' : '',
        aspect_jurnal_4: assessment ? assessment.detailed_data?.[`aspect_jurnal_4`] || '' : '',
        aspect_jurnal_5: assessment ? assessment.detailed_data?.[`aspect_jurnal_5`] || '' : '',
        comments: assessment ? assessment.comments || '' : '',
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

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">
                <FaBook className="me-2" />
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

          {/* Assignment Information */}
          {assignment && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaFileAlt className="me-2" />
                  Informasi Tugas
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-8">
                    <p><strong>Judul:</strong> {assignment.title}</p>
                    <p><strong>Deskripsi:</strong> {assignment.description}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Batas Waktu:</strong></p>
                    <p className="d-flex align-items-center">
                      <FaCalendarAlt className="me-2" />
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </p>
                    <p><strong>Tipe:</strong> {assignment.assignment_type}</p>
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
                  Tugas Ditemukan
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  <div className="col-md-8">
                    <p><strong>Dikirim:</strong> {new Date(submission.submitted_at).toLocaleString()}</p>
                    <p><strong>Teks:</strong> {submission.text}</p>
                  </div>
                  <div className="col-md-4">
                    <Button
                      variant="outline-info"
                      onClick={() => window.open(`https://drive.google.com/file/d/${submission.google_drive_file_id}/view`, '_blank')}
                      className="w-100"
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
                  Tugas Tidak Ditemukan
                </h5>
              </Card.Header>
              <Card.Body>
                <Alert variant="warning">
                  <FaInfoCircle className="me-2" />
                  <strong>Tidak Ada Tugas:</strong> Mahasiswa belum mengumpulkan file untuk tugas ini. 
                  Anda masih dapat memberikan penilaian berdasarkan kriteria lain atau observasi.
                </Alert>
              </Card.Body>
            </Card>
          )}

          {/* Already Assessed Message */}
          {assessment && assessment.assessment_id && !isEditing && (
            <Alert variant="success" className="mb-4">
              <FaCheckCircle className="me-2" />
              <strong>Mahasiswa ini sudah dinilai.</strong>{' '}
              {(assessment.score) ? (
                <span>
                  Skor: <Badge bg={getScoreColor(assessment.score)}>{assessment.score}/100</Badge>
                </span>
              ) : null}
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
                Formulir Penilaian
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
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
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_jurnal_1: val});
                        }}
                        required
                        placeholder="Masukkan skor (1-4)"
                        disabled={assessment && assessment.assessment_id && !isEditing}
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
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_jurnal_2: val});
                        }}
                        required
                        placeholder="Masukkan skor (1-4)"
                        disabled={assessment && assessment.assessment_id && !isEditing}
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
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_jurnal_3: val});
                        }}
                        required
                        placeholder="Masukkan skor (1-4)"
                        disabled={assessment && assessment.assessment_id && !isEditing}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>4. Efisiensi dalam penyampaian analisa artikel (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_4}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_jurnal_4: val});
                        }}
                        required
                        placeholder="Masukkan skor (1-4)"
                        disabled={assessment && assessment.assessment_id && !isEditing}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>5. Performance : Attitude, sistematik dan skill komunikasi (1-4 points)</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="4"
                        value={assessmentForm.aspect_jurnal_5}
                        onChange={(e) => {
                          let val = Math.min(4, Math.max(1, Number(e.target.value)));
                          setAssessmentForm({...assessmentForm, aspect_jurnal_5: val});
                        }}
                        required
                        placeholder="Masukkan skor (1-4)"
                        disabled={assessment && assessment.assessment_id && !isEditing}
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Komentar & Saran</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={assessmentForm.comments}
                    onChange={(e) => setAssessmentForm({...assessmentForm, comments: e.target.value})}
                    placeholder="Berikan saran yang detail..."
                    disabled={assessment && assessment.assessment_id && !isEditing}
                  />
                </Form.Group>

                <Alert variant="info">
                  <FaInfoCircle className="me-2" />
                  <strong>Telaah Artikel Jurnal Assessment:</strong> Penilaian ini mengevaluasi kemampuan mahasiswa 
                  untuk menilai kritis artikel jurnal, termasuk pemahaman mereka terhadap metodologi penelitian, 
                  kemampuan analisis kritis, dan kemampuan untuk menyusun hasil.
                </Alert>

                <div className="d-flex justify-content-end gap-2">
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
                      </div>
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

export default ArtikelJurnalAssessmentPage; 