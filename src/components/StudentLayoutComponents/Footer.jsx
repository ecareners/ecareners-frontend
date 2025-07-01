import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import logo from '@/assets/images/logo.svg';
import logoLight from '@/assets/images/logo-light.svg';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return <footer className="footer-section pt-5">
      <Container>
        <Row className="g-4">
          <Col lg={3}>
            <Link className="me-0 d-flex align-items-center" to="/">
              <img className="light-mode-item h-40px me-2" width={189} height={40} src={logo} alt="logo" />
              <img className="dark-mode-item h-40px me-2" width={189} height={40} src={logoLight} alt="logo" />
              <span className="brand-text fw-bold fs-5 text-primary">E-CARENERS</span>
            </Link>
            <p className="my-3">
              E-CARENERS medical learning platform, built specifically for healthcare professionals to advance their clinical skills and knowledge through comprehensive training resources.
            </p>
          </Col>
          <Col lg={6}>
            <Row className="g-4">
              <Col xs={6} md={4}>
                <h5 className="mb-2 mb-md-4">Quick Links</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link" to="/pages/course/grid-2">
                      Protocols
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pages/videos">
                      Videos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/instructor/create-course">
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                <h5 className="mb-2 mb-md-4">Resources</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link" to="/pages/conference">
                      Conference
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/instructor/student-list">
                      Assessment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/help">
                      Support Center
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs={6} md={4}>
                <h5 className="mb-2 mb-md-4">Account</h5>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link className="nav-link" to="/student/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/student/edit-profile">
                      Profile Settings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/student/payment-info">
                      Payment Info
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col lg={3}>
            <h5 className="mb-2 mb-md-4">Contact E-CARENERS</h5>
            <p className="mb-2">
              Medical Support:<span className="h6 fw-light ms-2">+1234 568 963</span>
              <span className="d-block small">(24/7 Medical Emergency Support)</span>
            </p>
            <p className="mb-0">
              Email:<span className="h6 fw-light ms-2">support@ecareners.com</span>
            </p>
          </Col>
        </Row>
        <hr className="mt-4 mb-0" />
        <div className="py-3">
          <Container className="px-0">
            <div className="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
              <div className="text-body text-primary-hover">
                Copyrights ©{currentYear} E-CARENERS. Build by
                <Link to={developedByLink} target="_blank" className="text-body">
                  {developedBy}
                </Link>
              </div>
              <div className="justify-content-center mt-3 mt-lg-0">
                <ul className="nav list-inline justify-content-center mb-0">
                  <li className="list-inline-item">
                    <a className="nav-link" href="#">
                      Terms of use
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="nav-link pe-0" href="#">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </footer>;
};

export default Footer;
