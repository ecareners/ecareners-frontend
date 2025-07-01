import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaGraduationCap, FaCalendarAlt, FaClipboardCheck, FaMedal, FaTv, FaUsers } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';
import PageMetaData from '@/components/PageMetaData';
import Footer from '@/components/Footer';
import Chart from './components/Chart';
import Counter from './components/Counter';
import CourseList from './components/CourseList';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DashboardPage = () => {
  const { user } = useAuth();
  const [instructorStats, setInstructorStats] = useState({
    totalStudents: 0,
    totalAssessments: 0,
    averageScore: 0
  });

  useEffect(() => {
    const fetchInstructorStats = async () => {
      if (!user) return;
      
      try {
        // Fetch all students
        const studentsResponse = await fetch(`${API_BASE_URL}/users`);
        const allUsers = await studentsResponse.json();
        const students = allUsers.filter(u => u.role === 'student' || u.role === 'mahasiswa');
        
        // Fetch all assessments by this instructor
        const assessmentsResponse = await fetch(`${API_BASE_URL}/api/assessments`);
        const allAssessments = await assessmentsResponse.json();
        const instructorAssessments = allAssessments.filter(a => a.assessor_user_id === user.user_id);
        
        // Calculate stats
        const totalStudents = students.length;
        const totalAssessments = instructorAssessments.length;
        const averageScore = instructorAssessments.length > 0 
          ? Math.round(instructorAssessments.reduce((sum, a) => sum + a.score, 0) / instructorAssessments.length)
          : 0;
        
        setInstructorStats({
          totalStudents,
          totalAssessments,
          averageScore
        });
      } catch (err) {
        console.log('Error fetching instructor stats:', err);
      }
    };

    fetchInstructorStats();
  }, [user]);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'danger';
      case 'instructor': return 'warning';
      case 'student':
      case 'mahasiswa': return 'success';
      default: return 'secondary';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'instructor': return 'Instructor';
      case 'student':
      case 'mahasiswa': return 'Student';
      default: return role;
    }
  };

  return (
    <>
      <PageMetaData title="Instructor Dashboard" />
      
      <Container fluid className="py-4">
        {/* Profile Section */}
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <div 
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '120px',
                      height: '120px',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      fontSize: '3rem'
                    }}
                  >
                    <FaUser />
                  </div>
                </div>
                
                <h4 className="mb-1">{user?.name || 'Instructor Name'}</h4>
                <p className="text-muted mb-2">{user?.email || 'instructor@example.com'}</p>
                
                <div className="d-flex justify-content-center mb-3">
                  <Badge bg={getRoleBadgeColor(user?.role)} className="px-3 py-2">
                    {getRoleLabel(user?.role)}
                  </Badge>
                </div>
                
                {user?.prodi && (
                  <div className="d-flex align-items-center justify-content-center text-muted mb-3">
                    <FaGraduationCap className="me-2" />
                    <span>{user.prodi}</span>
                  </div>
                )}
                
                <div className="d-flex align-items-center justify-content-center text-muted">
                  <FaCalendarAlt className="me-2" />
                  <span>Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '2024'}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8} md={6}>
            <Row>
              <Col sm={6} className="mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaUsers />
                      </div>
                    </div>
                    <h3 className="mb-1">{instructorStats.totalStudents}</h3>
                    <p className="text-muted mb-0">Total Students</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col sm={6} className="mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaClipboardCheck />
                      </div>
                    </div>
                    <h3 className="mb-1">{instructorStats.totalAssessments}</h3>
                    <p className="text-muted mb-0">Assessments Given</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col sm={6} className="mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaMedal />
                      </div>
                    </div>
                    <h3 className="mb-1">{instructorStats.averageScore}%</h3>
                    <p className="text-muted mb-0">Average Score Given</p>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col sm={6} className="mb-3">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaTv />
                      </div>
                    </div>
                    <h3 className="mb-1">{instructorStats.totalStudents > 0 ? Math.round((instructorStats.totalAssessments / instructorStats.totalStudents) * 100) : 0}%</h3>
                    <p className="text-muted mb-0">Assessment Rate</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Progress Overview */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="mb-3">Assessment Overview</h5>
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-grow-1 me-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Assessment Completion Rate</span>
                      <span>{instructorStats.totalStudents > 0 ? Math.round((instructorStats.totalAssessments / instructorStats.totalStudents) * 100) : 0}%</span>
                    </div>
                    <ProgressBar 
                      now={instructorStats.totalStudents > 0 ? (instructorStats.totalAssessments / instructorStats.totalStudents) * 100 : 0} 
                      variant="warning"
                      style={{ height: '8px' }}
                    />
                  </div>
                </div>
                
                <div className="row text-center">
                  <div className="col-4">
                    <h6 className="text-primary mb-1">{instructorStats.totalStudents}</h6>
                    <small className="text-muted">Total Students</small>
                  </div>
                  <div className="col-4">
                    <h6 className="text-success mb-1">{instructorStats.totalAssessments}</h6>
                    <small className="text-muted">Assessments Given</small>
                  </div>
                  <div className="col-4">
                    <h6 className="text-warning mb-1">{instructorStats.averageScore}%</h6>
                    <small className="text-muted">Average Score</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts and Lists */}
        <Row>
          <Col lg={8}>
            <Chart />
          </Col>
          <Col lg={4}>
            <Counter />
          </Col>
        </Row>

        <Row>
          <Col>
            <CourseList />
          </Col>
        </Row>
      </Container>

      <Footer className="bg-light mt-5" />
    </>
  );
};

export default DashboardPage;
