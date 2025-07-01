import { Col, Container, Row, Button } from 'react-bootstrap';
import { FaPlay, FaStethoscope, FaUserMd, FaGraduationCap } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const Hero = () => {
  return (
    <section className="hero-section position-relative overflow-hidden">
      <div className="hero-bg-gradient position-absolute w-100 h-100"></div>
      <div className="medical-pattern position-absolute w-100 h-100 opacity-10"></div>
      
      <Container className="position-relative z-index-1">
        <Row className="align-items-center min-vh-100 py-5">
          <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
            <div className="hero-badge d-inline-flex align-items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-pill px-4 py-2 mb-4">
              <FaStethoscope className="text-primary me-2" />
              <span className="text-white fw-medium">Powered by E-CARENERS</span>
            </div>
            
            <h1 className="hero-title display-4 fw-bold text-white mb-4">
              Welcome to
              <span className="text-gradient d-block">E-CARENERS</span>
              Medical Learning Platform
            </h1>
            
            <p className="hero-subtitle lead text-white-75 mb-5 fs-5">
              E-CARENERS provides comprehensive protocols, training videos, and professional development resources designed by healthcare experts.
            </p>
            
            <div className="hero-features mb-5">
              <div className="row g-3 text-start">
                <div className="col-6 col-sm-6">
                  <div className="d-flex align-items-center text-white-75">
                    <div className="feature-icon bg-white bg-opacity-25 rounded-circle p-2 me-3">
                      <FaUserMd className="text-white" />
                    </div>
                    <span className="feature-text">Expert-led Training</span>
                  </div>
                </div>
                <div className="col-6 col-sm-6">
                  <div className="d-flex align-items-center text-white-75">
                    <div className="feature-icon bg-white bg-opacity-25 rounded-circle p-2 me-3">
                      <FaGraduationCap className="text-white" />
                    </div>
                    <span className="feature-text">Professional Certificates</span>
                  </div>
                </div>
                <div className="col-6 col-sm-6">
                  <div className="d-flex align-items-center text-white-75">
                    <div className="feature-icon bg-white bg-opacity-25 rounded-circle p-2 me-3">
                      <FaStethoscope className="text-white" />
                    </div>
                    <span className="feature-text">Protocols</span>
                  </div>
                </div>
                <div className="col-6 col-sm-6">
                  <div className="d-flex align-items-center text-white-75">
                    <div className="feature-icon bg-white bg-opacity-25 rounded-circle p-2 me-3">
                      <FaPlay className="text-white" />
                    </div>
                    <span className="feature-text">Video Training</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-cta d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Button 
                variant="primary" 
                size="lg" 
                className="btn-gradient px-5 py-3 fw-semibold mx-auto mx-lg-0 text-white"
                href="/pages/protocols"
              >
                <span className="btn-text text-white">Explore Protocols</span>
                <BsArrowRight className="ms-2 text-white" />
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="px-5 py-3 fw-semibold mx-auto mx-lg-0"
                href="/pages/videos"
              >
                <FaPlay className="me-2" />
                <span className="btn-text">Watch Training</span>
              </Button>
            </div>
          </Col>
          
          <Col lg={6} className="text-center">
            <div className="hero-image-container position-relative">
              <div className="hero-image-bg rounded-4 p-4 p-lg-5 bg-white bg-opacity-10 backdrop-blur-sm position-relative">
                <div className="medical-illustration d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div className="medical-icon-large mb-4">
                      <FaStethoscope size={80} className="text-white" />
                    </div>
                    <h3 className="text-white fw-semibold mb-3">E-CARENERS Excellence</h3>
                    <p className="text-white-75 mb-0">
                      Join thousands of healthcare professionals advancing their skills with E-CARENERS
                    </p>
            </div>
            </div>
            </div>
              
              <div className="floating-stat stat-1 position-absolute bg-white rounded-3 p-3 shadow-lg d-none d-lg-block">
                <div className="text-center">
                  <div className="stat-number text-primary fw-bold fs-4">500+</div>
                  <div className="stat-label text-muted small">Protocols</div>
                </div>
              </div>
              
              <div className="floating-stat stat-2 position-absolute bg-white rounded-3 p-3 shadow-lg d-none d-lg-block">
                <div className="text-center">
                  <div className="stat-number text-primary fw-bold fs-4">10K+</div>
                  <div className="stat-label text-muted small">Healthcare Professionals</div>
              </div>
            </div>
              
              <div className="floating-stat stat-3 position-absolute bg-white rounded-3 p-3 shadow-lg d-none d-lg-block">
                <div className="text-center">
                  <div className="stat-number text-primary fw-bold fs-4">24/7</div>
                  <div className="stat-label text-muted small">Access</div>
                  </div>
            </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
