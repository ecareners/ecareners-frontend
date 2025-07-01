import { Col, Container, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { counterData } from '../data';

const Counter = () => {
  const navigate = useNavigate();

  const handleCounterClick = (item) => {
    // Navigate to different pages based on the counter type
    switch (item.title) {
      case 'SOPs':
        navigate('/pages/course/grid-2');
        break;
      case 'Education Video':
        navigate('/pages/videos');
        break;
      case 'Assignment':
        navigate('/instructor/create-course');
        break;
      case 'Evaluation':
        navigate('/instructor/student-list');
        break;
      default:
        console.log('No navigation defined for:', item.title);
    }
  };

  return <section className="py-4 py-md-5 py-xl-5">
      <Container>
        <Row className="g-4">
          {counterData.map((item, idx) => {
          const Icon = item.icon;
          return <Col sm={6} xl={3} key={idx}>
                <div 
                  className={`d-flex justify-content-center align-items-center p-4 bg-${item.variant} bg-opacity-10 rounded-3 cursor-pointer transition-all duration-300 hover-transform-up`}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => handleCounterClick(item)}
                >
                  <span className={`display-6 lh-1 text-${item.variant} mb-0`}>
                    <Icon />
                  </span>
                  <div className="ms-4 h6 fw-normal mb-0">
                    <div className="d-flex">
                      <h5 className="purecounter mb-0 fw-bold">
                        <CountUp delay={2} end={item.count} suffix={item.suffix} />
                      </h5>
                    </div>
                    <p className="mb-0">{item.title}</p>
                  </div>
                </div>
              </Col>;
        })}
        </Row>
      </Container>
    </section>;
};
export default Counter;
