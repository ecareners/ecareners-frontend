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

const KeterampilanProseduralKlinikDopsPage = () => {
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
    aspect_dops_1: '', aspect_dops_2: '', aspect_dops_3: '', aspect_dops_4: '', aspect_dops_5: '',
    aspect_dops_6: '', aspect_dops_7: '', aspect_dops_8: '', aspect_dops_9: '', aspect_dops_10: '',
    aspect_dops_11: '', aspect_dops_12: '', aspect_dops_13: '', aspect_dops_14: '', aspect_dops_15: '', aspect_dops_16: '',
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
      const response = await fetch(`${API_BASE_URL}/api/users/${studentId}/assessments/keterampilan_prosedural_klinik_dops`);
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
              for (let i = 1; i <= 16; i++) {
                formData[`aspect_dops_${i}`] = detailedData.detailed_data[`aspect_dops_${i}`] || '';
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
    for (let i = 1; i <= 16; i++) {
      scores.push(parseInt(assessmentForm[`aspect_dops_${i}`]) || 0);
    }
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    return (total / 64) * 100; // Formula: total aspek/64 x 100
  };

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const assessmentData = {};
    for (let i = 1; i <= 16; i++) {
      assessmentData[`aspect_dops_${i}`] = parseInt(assessmentForm[`aspect_dops_${i}`]) || 0;
    }
    
    const requestData = {
      assessed_user_id: studentId,
      assessor_user_id: user.user_id,
      assessment_type: 'keterampilan_prosedural_klinik_dops',
      comments: assessmentForm.comments,
      academic_year: new Date().getFullYear(),
      semester: 'Ganjil',
      assessment_data: assessmentData
    };
    
    console.log('📤 Sending DOPS assessment data:', requestData);
    
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
        console.log('✅ DOPS assessment saved successfully:', responseData);
        // Refresh assessment data
        await fetchExistingAssessment();
        setSaving(false);
      } else {
        const errorData = await response.json();
        console.error('❌ DOPS assessment save failed:', errorData);
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
                Keterampilan Prosedural Klinik (DOPS) Assessment
              </h2>
              <p className="text-muted mb-0">Assess student's clinical procedural skills</p>
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

          {/* Assessment Form - disabled if already assessed and not editing */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                DOPS Assessment Form
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAssessmentSubmit}>
                <Alert variant="info" className="mb-4">
                  <FaInfoCircle className="me-2" />
                  <strong>Scoring Guide:</strong> Rate each aspect from 1-4 points. 
                  Final score = (Total points / 64) × 100. Maximum score: 100 points.
                </Alert>

                {/* Aspect Fields */}
                <div className="row">
                  {/* 1. PERSIAPAN */}
                  <div className="col-12 mb-2">
                    <h6 className="fw-bold">1. PERSIAPAN</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Klien diberi informasi tentang prosedur yang akan dilakukan</Form.Label><Form.Control
  type="number"
  min="1"
  max="4"
  value={assessmentForm.aspect_dops_1}
  onChange={(e) => {
    let val = Math.min(4, Math.max(1, Number(e.target.value)));
    setAssessmentForm({...assessmentForm, aspect_dops_1: val});
  }}
  required
  placeholder="Enter score (1-4)"
  disabled={isFormLocked}
/></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Melakukan pengkajian berkaitan dengan tindakan yang akan dilakukan</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_2} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_2: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>c. Lingkungan yang nyaman & bersih bagi klien</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_3} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_3: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>d. Jenis alat yang disesuaikan sesuai kebutuhan</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_4} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_4: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>e. Modifikasi alat</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_5} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_5: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>

                  {/* 2. PELAKSANAAN */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">2. PELAKSANAAN</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Komunikasi dengan klien</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_6} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_6: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Memperhatikan privacy klien</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_7} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_7: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>c. Kualitas alat</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_8} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_8: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>d. Penggunaan alat</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_9} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_9: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>e. Langkah tindakan sesuai dengan urutan yang benar</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_10} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_10: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>f. Langkah tindakan sesuai dengan prinsip</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_11} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_11: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>g. Langkah tindakan dilakukan secara efisien</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_12} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_12: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>h. Memperhatikan respon klien (kenyamanan & keamanan)</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_13} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_13: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>i. Merapikan kembali peralatan dan lingkungan klien</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_14} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_14: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>

                  {/* 3. EVALUASI */}
                  <div className="col-12 mb-2 mt-3">
                    <h6 className="fw-bold">3. EVALUASI</h6>
                  </div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>a. Melakukan evaluasi tindakan keperawatan yang baru dilaksanakan</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_15} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_15: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
                  <div className="col-md-6 mb-3"><Form.Group><Form.Label>b. Mendokumentasikan tindakan dengan benar</Form.Label><Form.Control type="number" min="1" max="4" value={assessmentForm.aspect_dops_16} onChange={(e) => setAssessmentForm({...assessmentForm, aspect_dops_16: e.target.value})} required placeholder="Enter score (1-4)" disabled={isFormLocked} /></Form.Group></div>
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
        </div>
      </div>
    </div>
  );
};

export default KeterampilanProseduralKlinikDopsPage; 