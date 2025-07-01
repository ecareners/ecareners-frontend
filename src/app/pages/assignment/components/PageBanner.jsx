import pattern4 from '@/assets/images/pattern/04.png';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageBanner = () => {
  return <section className="bg-dark align-items-center d-flex" style={{
    background: `url(${pattern4}) no-repeat center center`,
    backgroundSize: 'cover'
  }}>
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="text-white">Assignments</h1>
            <div className="d-flex">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dark breadcrumb-dots mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#" className="text-white">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Assignments
                  </li>
                </ol>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default PageBanner;
