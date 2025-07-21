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

const UjianKlinikPage = () => {
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
    aspek_klinik_1: '', aspek_klinik_2: '', aspek_klinik_3: '', aspek_klinik_4: '', 
    aspek_klinik_5a: '', aspek_klinik_5b: '', aspek_klinik_6: '', aspek_klinik_7: '', 
    aspek_klinik_8: '', aspek_klinik_9: '', aspek_klinik_10: '', aspek_klinik_11: '', 
    aspek_klinik_12: '', aspek_klinik_13: '', aspek_klinik_14: '', aspek_klinik_15: '', 
    aspek_klinik_16: '', aspek_klinik_17: '', aspek_klinik_18: '',
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
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/ujian_klinik`);
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
              const aspects = ['1', '2', '3', '4', '5a', '5b', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
              aspects.forEach(aspect => {
                formData[`aspek_klinik_${aspect}`] = detailedData.detailed_data[`aspek_klinik_${aspect}`] || '';
              });
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
    const aspects = ['1', '2', '3', '4', '5a', '5b', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    const scores = aspects.map(aspect => parseInt(assessmentForm[`aspek_klinik_${aspect}`]) || 0);
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / 72) * 100; // Formula: total aspek/72 x 100
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const assessmentData = {};
    const aspects = ['1', '2', '3', '4', '5a', '5b', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
    aspects.forEach(aspect => {
      assessmentData[`aspek_klinik_${aspect}`] = parseInt(assessmentForm[`aspek_klinik_${aspect}`]) || 0;
    });
    
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'ujian_klinik',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: assessmentData
    };
    
    console.log('📤 Sending ujian klinik assessment data:', requestData);
    
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
        console.log('✅ Ujian klinik assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ Ujian klinik assessment save failed:', errorData);
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
    // If already assessed, fetch existing data into form
    if (assessment && assessment.assessment_id) {
      const aspects = ['1', '2', '3', '4', '5a', '5b', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
      aspects.forEach(aspect => {
        setAssessmentForm(prev => ({
          ...prev,
          [`aspek_klinik_${aspect}`]: detailedData[`aspek_klinik_${aspect}`] || ''
        }));
      });
    }
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
                Ujian Klinik Assessment
              </h2>
              <p className="text-muted mb-0">Assess student's clinical examination skills</p>
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

          {/* Assessment Form - disabled if already assessed and not editing */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                Formulir Penilaian Ujian Klinik
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Scoring Guide:</strong> Rate each aspect from 1-4 points. 
                  Final score = (Total points / 72) × 100. Maximum score: 100 points.
                </Alert>

                {/* Aspect Fields */}
                <div className="row">
                  {/* 1. PROSES KEPERAWATAN */}
                  <div className="col-12 mb-2">
                    <h6 className="fw-bold">1. PROSES KEPERAWATAN</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Pengkajian</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_1}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_1: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Analisa data</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_2}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_2: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>c. Pathway/Web Of Cause (WOC)</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_3}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_3: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>d. Diagnosis</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_4}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_4: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>e. Rencana tindakan untuk diagnosa yang dipilih (prinsip tindakan, lingkungan terapeutik, obat) (5a)</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_5a}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_5a: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>f. Strategi komunikasi (5b)</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_5b}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_5b: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>

                  {/* 2. PERKENALAN / ORIENTASI */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">2. PERKENALAN / ORIENTASI</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Salam terapeutik</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_6}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_6: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Evaluasi/validasi</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_7}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_7: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>c. Kontrak (topik, waktu, tempat)</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_8}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_8: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>d. Tujuan tindakan keperawatan</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_9}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_9: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>

                  {/* 3. KERJA */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">3. KERJA</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Teknik komunikasi terapeutik</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_10}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_10: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Sikap komunikasi terapeutik</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_11}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_11: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>c. Langkah-langkah tindakan keperawatan sesuai rencana dan prinsip tindakan</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_12}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_12: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>

                  {/* 4. TERMINASI */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">4. TERMINASI</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Evaluasi respon klien</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_13}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_13: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Rencana tindak lanjut</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_14}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_14: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>c. Kontrak yang akan datang (topik, waktu, tempat)</Form.Label><Form.Control
                            type="number"
                            min="1"
                            max="4"
                    value={assessmentForm.aspek_klinik_15}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_15: val});
                    }}
                            required
                    placeholder="Enter score (1-4)"
                            disabled={isFormLocked}
                  /></Form.Group></div>

                  {/* 5. DOKUMENTASI */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">5. DOKUMENTASI</h6>
                      </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Implementasi</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_16}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_16: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Evaluasi (S, O, A, P)</Form.Label><Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={assessmentForm.aspek_klinik_17}
                    onChange={(e) => {
                      let val = Math.min(4, Math.max(1, Number(e.target.value)));
                      setAssessmentForm({...assessmentForm, aspek_klinik_17: val});
                    }}
                    required
                    placeholder="Enter score (1-4)"
                    disabled={isFormLocked}
                  /></Form.Group></div>
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

export default UjianKlinikPage; 