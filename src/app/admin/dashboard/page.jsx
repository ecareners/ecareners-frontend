import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaGraduationCap, FaCalendarAlt, FaClipboardCheck, FaMedal, FaTv, FaUsers, FaCrown } from 'react-icons/fa';
import { useAuth } from '@/context/useAuthContext';
import Counter from './components/Counter';
import Earnings from './components/Earnings';
import NoticeBoard from './components/NoticeBoard';
import SupportRequests from './components/SupportRequests';
import TopInstructors from './components/TopInstructors';
import TrafficSourcesChart from './components/TrafficSourcesChart';
import PageMetaData from '@/components/PageMetaData';
import Footer from '@/components/Footer';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalInstructors: 0,
    totalStudents: 0,
    totalAssessments: 0
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      if (!user) return;
      
      try {
        // Fetch all users
        const usersResponse = await fetch('http://localhost:5000/api/users');
        const allUsers = await usersResponse.json();
        
        // Fetch all assessments
        const assessmentsResponse = await fetch('http://localhost:5000/api/assessments');
        const allAssessments = await assessmentsResponse.json();
        
        // Calculate stats
        const totalUsers = allUsers.length;
        const totalInstructors = allUsers.filter(u => u.role === 'instructor').length;
        const totalStudents = allUsers.filter(u => u.role === 'student' || u.role === 'mahasiswa').length;
        const totalAssessments = allAssessments.length;
        
        setAdminStats({
          totalUsers,
          totalInstructors,
          totalStudents,
          totalAssessments
        });
      } catch (err) {
        console.log('Error fetching admin stats:', err);
      }
    };

    fetchAdminStats();
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
      <PageMetaData title="Admin Dashboard" />
      
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
                      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                      color: 'white',
                      fontSize: '3rem'
                    }}
                  >
                    <FaCrown />
                  </div>
                </div>
                
                <h4 className="mb-1">{user?.name || 'Admin Name'}</h4>
                <p className="text-muted mb-2">{user?.email || 'admin@example.com'}</p>
                
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
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaUsers />
                      </div>
                    </div>
                    <h3 className="mb-1">{adminStats.totalUsers}</h3>
                    <p className="text-muted mb-0">Total Users</p>
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
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaUser />
                      </div>
                    </div>
                    <h3 className="mb-1">{adminStats.totalInstructors}</h3>
                    <p className="text-muted mb-0">Instructors</p>
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
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaGraduationCap />
                      </div>
                    </div>
                    <h3 className="mb-1">{adminStats.totalStudents}</h3>
                    <p className="text-muted mb-0">Students</p>
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
                    <h3 className="mb-1">{adminStats.totalAssessments}</h3>
                    <p className="text-muted mb-0">Total Assessments</p>
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
                <h5 className="mb-3">System Overview</h5>
                <div className="row text-center">
                  <div className="col-3">
                    <h6 className="text-primary mb-1">{adminStats.totalUsers}</h6>
                    <small className="text-muted">Total Users</small>
                  </div>
                  <div className="col-3">
                    <h6 className="text-warning mb-1">{adminStats.totalInstructors}</h6>
                    <small className="text-muted">Instructors</small>
                  </div>
                  <div className="col-3">
                    <h6 className="text-success mb-1">{adminStats.totalStudents}</h6>
                    <small className="text-muted">Students</small>
                  </div>
                  <div className="col-3">
                    <h6 className="text-info mb-1">{adminStats.totalAssessments}</h6>
                    <small className="text-muted">Assessments</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Original Dashboard Components */}
        <Row>
          <Col xs={12} className="mb-3">
            <h1 className="h3 mb-2 mb-sm-0">Dashboard Analytics</h1>
          </Col>
        </Row>
        
        <Counter />
        
        <Row className="g-4 mb-4">
          <Earnings />
          <SupportRequests />
        </Row>
        
        <Row className="g-4">
          <TopInstructors />
          <NoticeBoard />
          <TrafficSourcesChart />
        </Row>
      </Container>

      <Footer className="bg-light mt-5" />
    </>
  );
};

export default AdminDashboardPage;
