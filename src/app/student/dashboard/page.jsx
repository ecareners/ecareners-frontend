import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaGraduationCap, FaCalendarAlt, FaClipboardCheck, FaMedal, FaTv } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';
import PageMetaData from '@/components/PageMetaData';
import Footer from '@/components/Footer';
import Counter from './components/Counter';
import CoursesList from './components/CoursesList';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DashboardPage = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    totalAssignments: 0,
    submittedAssignments: 0,
    averageScore: 0
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      
      try {
        // Fetch user's submissions
        const submissionsResponse = await fetch(`${API_BASE_URL}/submissions`);
        const allSubmissions = await submissionsResponse.json();
        const userSubmissions = allSubmissions.filter(s => s.user_id === user.user_id);
        
        // Fetch user's assessments
        const assessmentsResponse = await fetch(`${API_BASE_URL}/api/users/${user.user_id}/assessments`);
        const assessments = await assessmentsResponse.json();
        
        // Calculate stats
        const totalAssignments = userSubmissions.length;
        const submittedAssignments = userSubmissions.length;
        const averageScore = assessments.length > 0 
          ? Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length)
          : 0;
        
        setUserStats({
          totalAssignments,
          submittedAssignments,
          averageScore
        });
      } catch (err) {
        console.log('Error fetching user stats:', err);
      }
    };

    fetchUserStats();
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
      <PageMetaData title="Student Dashboard" />
      
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
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontSize: '3rem'
                    }}
                  >
                    <FaUser />
                  </div>
                </div>
                
                <h4 className="mb-1">{user?.name || 'Student Name'}</h4>
                <p className="text-muted mb-2">{user?.email || 'student@example.com'}</p>
                
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
                          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaClipboardCheck />
                      </div>
                    </div>
                    <h3 className="mb-1">{userStats.totalAssignments}</h3>
                    <p className="text-muted mb-0">Total Assignments</p>
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
                        <FaMedal />
                      </div>
                    </div>
                    <h3 className="mb-1">{userStats.averageScore}%</h3>
                    <p className="text-muted mb-0">Average Score</p>
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
                          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaTv />
                      </div>
                    </div>
                    <h3 className="mb-1">{userStats.submittedAssignments}</h3>
                    <p className="text-muted mb-0">Submitted</p>
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
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaUser />
                      </div>
                    </div>
                    <h3 className="mb-1">{userStats.totalAssignments - userStats.submittedAssignments}</h3>
                    <p className="text-muted mb-0">Pending</p>
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
                <h5 className="mb-3">Assignment Progress</h5>
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-grow-1 me-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Overall Progress</span>
                      <span>{userStats.totalAssignments > 0 ? Math.round((userStats.submittedAssignments / userStats.totalAssignments) * 100) : 0}%</span>
                    </div>
                    <ProgressBar 
                      now={userStats.totalAssignments > 0 ? (userStats.submittedAssignments / userStats.totalAssignments) * 100 : 0} 
                      variant="primary"
                      style={{ height: '8px' }}
                    />
                  </div>
                </div>
                
                <div className="row text-center">
                  <div className="col-4">
                    <h6 className="text-success mb-1">{userStats.submittedAssignments}</h6>
                    <small className="text-muted">Submitted</small>
                  </div>
                  <div className="col-4">
                    <h6 className="text-warning mb-1">{userStats.totalAssignments - userStats.submittedAssignments}</h6>
                    <small className="text-muted">Pending</small>
                  </div>
                  <div className="col-4">
                    <h6 className="text-info mb-1">{userStats.averageScore}%</h6>
                    <small className="text-muted">Average</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Courses List */}
        <Row>
          <Col>
            <CoursesList />
          </Col>
        </Row>
      </Container>

      <Footer className="bg-light mt-5" />
    </>
  );
};

export default DashboardPage;
