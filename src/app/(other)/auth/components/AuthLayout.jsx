import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import elementImg from '@/assets/images/element/02.svg';
import { Col, Container, Row } from 'react-bootstrap';
const AuthLayout = ({
  children
}) => {
  return <main>
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
        <Container fluid>
          <Row>
            <Col xs={12} lg={6} className="d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
              <div className="p-3 p-lg-5">
                <div className="text-center">
                  <h2 className="fw-bold text-white">Welcome to the E-CARENERS Medical Community</h2>
                  <p className="mb-0 h6 fw-light text-white">Empowering healthcare professionals and students to learn, share, and grow together.</p>
                </div>
                <img src={elementImg} className="mt-5" alt="element" />
              </div>
            </Col>
            {children}
          </Row>
        </Container>
      </section>
    </main>;
};
export default AuthLayout;
