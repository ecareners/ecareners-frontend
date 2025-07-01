import React from 'react';
import pattern4 from '@/assets/images/pattern/04.png';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreateCoursePage = () => {
  return (
    <section 
      className="bg-dark align-items-center d-flex" 
      style={{
        background: `url(${pattern4}) no-repeat center center`,
        backgroundSize: 'cover'
      }}
    >
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="text-white">Create Course</h1>
            <div className="d-flex">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-dark breadcrumb-dots mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create Course
                  </li>
                </ol>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateCoursePage; 