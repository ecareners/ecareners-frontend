import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { topCountries } from '../data';
import mapSvg from '@/assets/images/element/map.svg';
const TopCountries = () => {
  return <section className="position-relative overflow-hidden py-0 pt-xl-5">
      <figure className="position-absolute top-0 end-0 me-n5 mt-5">
        <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
          <path className="fill-purple opacity-2" d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z" />
        </svg>
      </figure>
      <figure className="position-absolute bottom-0 start-0 me-5 d-none d-lg-block">
        <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
          <path className="fill-warning opacity-3" d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z" />
        </svg>
      </figure>
      <Container className="position-relative py-7" style={{
      backgroundImage: `url(${mapSvg})`,
      backgroundPosition: 'center left',
      backgroundSize: 'cover'
    }}>
        <Row className="g-4">
          <Col xl={3}>
            <h2 className="h1 mb-0">Top countries to study</h2>
          </Col>
          <Col xl={9}>
            <Row className="g-4">
              {topCountries.map((country, idx) => <Col sm={6} md={4} key={idx}>
                  <Card className="card-body shadow p-4">
                    <div className="d-flex align-items-center">
                      <img width={60} height={40} src={country.flag} className="h-40px" alt="country" />
                      <h5 className="ms-3 mb-0">

                        <Link to="/abroad/single" className="stretched-link">
                          {country.name}
                        </Link>
                      </h5>
                    </div>
                  </Card>
                </Col>)}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default TopCountries;
