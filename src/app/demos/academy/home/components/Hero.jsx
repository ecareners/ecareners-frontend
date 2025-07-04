import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaBell, FaRegStar, FaSearch, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Counter from './Counter';
import { BsChatLeftText } from 'react-icons/bs';
import avatar1 from '@/assets/images/avatar/01.jpg';
import avatar2 from '@/assets/images/avatar/02.jpg';
import avatar3 from '@/assets/images/avatar/03.jpg';
import avatar4 from '@/assets/images/avatar/04.jpg';
import element6 from '@/assets/images/element/06.png';
const Hero = () => {
  return <section className="position-relative overflow-hidden pb-0 pb-sm-5">
      <figure className="ms-5 position-absolute top-0 start-0">
        <svg width="29px" height="29px">
          <path className="fill-orange opacity-4" d="M29.004,14.502 C29.004,22.512 22.511,29.004 14.502,29.004 C6.492,29.004 -0.001,22.512 -0.001,14.502 C-0.001,6.492 6.492,-0.001 14.502,-0.001 C22.511,-0.001 29.004,6.492 29.004,14.502 Z" />
        </svg>
      </figure>
      <Container>
        <Row className="align-items-center justify-content-xl-between g-4 g-md-5">
          <Col lg={7} xl={5} className="position-relative z-index-1 text-center text-lg-start mb-2 mb-md-9 mb-xl-0">
            <h6 className="mb-3 font-base bg-primary bg-opacity-10 text-primary py-2 px-4 rounded-2 d-inline-block">Get started with Eduport</h6>
            <h1 className="mb-4 display-5">
              Develop the skillset &amp; your&nbsp;
              <span className="position-relative d-inline-block">
                Bright Future
                <span className="position-absolute top-50 start-50 translate-middle z-index-n1 d-none d-sm-block">
                  <svg width="387.7px" height="119.7px">
                    <path className="fill-warning" d="M382.7,51.4c-0.2-1-0.4-2-0.7-3c-0.2-0.6-0.5-1.2-0.9-1.7c-0.6-0.9-1.5-1.7-2.9-2.2l0.1-0.1l-0.1,0.1 c0.2-0.9-0.4-1.2-1.2-1.3c-0.1,0-0.2,0-0.4-0.1c-0.2-0.2-0.5-0.5-0.7-0.7c0-0.7-0.1-1.3-0.6-1.7c-0.3-0.2-0.7-0.4-1.3-0.5 c0-0.7-0.2-1.1-0.6-1.4c-0.3-0.2-0.7-0.4-1.2-0.5c-0.2,0-0.3-0.1-0.5-0.1c-1.1-0.9-2.2-1.8-3.4-2.7c0-0.1,0-0.2-0.1-0.3 c-0.1-0.2-0.3-0.4-0.7-0.4c-2.1-1.2-4.2-2.3-6.2-3.5c-14.1-8.5-31.1-10.2-46.8-14.7c-9.6-2.7-19.8-3.4-29.8-4.7 c-13.3-1.8-26.7-1.5-40-2.5c-5.4-0.4-10.8-0.7-16.1-0.7c-2.8,0-5.7-0.6-8.3-0.2c-5.8,0.9-11.6,1.5-17.4,1.8c-2,0.1-3.9,0.2-5.9,0.2 c-0.2,0-0.3,0-0.5,0.1c-0.2,0-0.3,0-0.5,0.1c-2.1,0-4.3,0.1-6.4,0.2c-2.1,0.1-4.3,0.1-6.4-0.1c-13-0.8-25.3,1.7-37.8,3.5 c-6,0.9-11.9,2.2-17.9,3.5c-6.5,1.4-13.3,1.7-19.8,3.3c-9.6,2.3-19.3,4.4-29.1,6c-9.5,1.6-18.9,3.9-28.2,6.4 c-8.5,2.3-16.2,5.9-23.8,9.7c-4.4,2.2-9,4.1-12.4,7.6c-4.1,4.3-6.6,9.4-10,14.1C1.9,68,2.5,70.8,4.6,74c4.7,7.3,12.9,10.3,21.3,13.4 c4.1,1.5,8.6,2.4,12.5,4.3c5.5,2.6,10.9,5.4,16.7,7.6c12.3,4.6,25.1,8,38.1,10.5c7.1,1.4,14.5,2.1,21.8,2.6 c11.2,0.8,22.5,2.5,33.8,1.9c0.8,0.7,1.5,0.7,2.1-0.1c1.6-0.7,3.4,0.2,5.1-0.1c8.8-1.5,17.8-0.8,26.8-0.6c5,0.1,10.1,0.8,15.1,0.6 c9.4-0.4,18.8-1,28.2-1.9c12.9-1.2,25.7-2.4,38.2-5.3c0.3,0.4,0.5,0.3,0.6-0.1c1.1-0.2,2.3-0.4,3.4-0.6c0.3,0.3,0.5,0.2,0.7-0.1 c1.2-0.3,2.4-0.6,3.7-0.8c7.9-0.8,15.8-1.4,23.6-2.4c4.9-0.6,9.7-1.8,14.5-2.8c0.4,0.2,0.8,0.3,1.1,0.2c0.2,0,0.3-0.1,0.4-0.2 c0.1-0.1,0.1-0.1,0.2-0.2s0.1-0.2,0.2-0.2c0.5-0.1,1-0.3,1.5-0.4c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.5-0.1,0.6-0.4c0,0,0,0,0,0l0,0 c0,0,0,0,0,0c0.4-0.1,0.8-0.2,1.3-0.3c0,0,0,0,0.1,0c0.2,0,0.3,0,0.5,0c0.4,0,0.7-0.2,0.8-0.7c1.1-0.4,2.2-0.8,3.3-1.3 c0.2,0.1,0.4,0.1,0.6,0c0.1,0,0.2-0.1,0.2-0.1c0.1-0.1,0.1-0.1,0.2-0.2c0-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0 c0.6,0.2,1,0.2,1.4,0c0.2-0.1,0.3-0.2,0.5-0.4c0.1-0.2,0.2-0.4,0.3-0.6c1.2-0.5,2.4-1,3.7-1.6c3.7-1.6,7.3-3.3,11.1-4.4 c11.2-3.4,21.5-7.9,30.2-14.9c1.8-0.4,2.9-1.2,3.7-2.4c0.5-0.7,0.8-1.4,1.1-2.2c1.1-0.1,1.7-0.6,2.1-1.1c0.4-0.6,0.6-1.3,0.7-2 c0-0.1,0.1-0.2,0.2-0.3c1.1,0.1,1.4-0.7,1.8-1.3C382.2,61.1,383.8,56.5,382.7,51.4z M9.5,72.3c-0.4-0.9-0.8-2-0.2-2.9 c4.3-6.9,8-14.3,15.9-19c6.6-3.9,13.9-6.9,21.1-10c10.1-4.3,21.1-6,32-8.1c0,0.2,0,0.4,0.1,0.6l0,0c-2.5,0.9-5.1,1.7-7.7,2.6 c-7.7,2.5-15.4,5-22.9,7.9c-10,3.9-18.1,9.9-23.8,17.8c-1.2,1.6-2.5,3.1-3.7,4.6c-5.1,6.3-2.3,11,2.9,16.4c0.3,0.3,0.7,0.7,0.9,1.1 C17.6,81.2,12,78.2,9.5,72.3z M372.5,60.6c-4,6.6-9.6,11.9-16.6,16.1c-4.8,2.9-10.5,5-16.2,6.8c-7.8,2.5-15.1,5.6-22.5,8.6 c-9.3,3.8-19,5.9-29.3,6.8c-14.1,1.2-27.8,3.6-41.6,5.9c-11.4,2-23.2,2.4-34.8,3.6c-13.2,1.4-26.4,0.4-39.6,0.2 c-7.4-0.1-14.8,0.8-22.1,1.2c-6.1,0.4-12.2,0.3-18.3-0.2c-9.2-0.7-18.5-1.3-27.7-2.2c-6.5-0.6-13.1-1.7-19.4-3.4 c-7.5-2-14.9-4-22.4-6c-1.2-0.3-2.3-0.6-3.2-1.3c-0.5-0.2-0.9-0.4-1.5-0.6c0.1,0,0.2-0.1,0.3-0.1c0.7-0.2,1.2,0,1.8,0.2c0,0,0,0,0,0 c8.1,1.1,16.2,2.8,24.4,3.2c1.2,0.1,2.4,0.1,3.5,0.1c1.1,0,3,0.5,3.1-0.6c0.1-1.4-1.8-2-3.3-2c-5,0-9.9-0.5-14.8-1.2 c-10.8-1.6-21.5-3.4-31.6-7.2c-6.9-2.5-12.7-6.4-16.2-12.3c-1.1-1.9-1.2-3.7-0.2-5.7c7.6-14.6,21.3-23.3,38.6-28.9 c15.7-5.1,31.3-10.6,47.6-14.2c11.7-2.6,23.7-4.3,35.3-6.9c20-4.5,40.6-5.7,61.3-6.4c8.5-0.3,16.8-2,25.4-1.3 c19.7,1.6,39.4,2.8,59.1,5.5c10.6,1.5,21.4,2.9,32.1,4c8.4,0.8,16.8,3.3,24.8,6.5c7.4,3,14.1,6.8,20,11.7 C374.7,46.2,376.4,54.2,372.5,60.6z" />
                  </svg>
                </span>
              </span>
            </h1>
            <p className="mb-3">
              The most reliable online courses and certifications in marketing, information technology, programming, and data science.
            </p>
            <form className="border rounded p-2 mb-4">
              <div className="input-group">
                <input className="form-control border-0 me-1" type="search" placeholder="Find your course" />
                <button type="button" className="btn btn-primary mb-0 rounded">
                  <FaSearch />
                </button>
              </div>
            </form>
            <Counter />
          </Col>
          <Col lg={5} xl={6} className="text-center position-relative">
            <figure className="position-absolute top-100 start-0 translate-middle mt-n6 ms-5 ps-5 d-none d-md-block">
              <svg width="297.5px" height="295.9px">
                <path stroke="#F99D2B" fill="none" strokeWidth={13} d="M286.2,165.5c-9.8,74.9-78.8,128.9-153.9,120.4c-76-8.6-131.4-78.2-122.8-154.2C18.2,55.8,87.8,0.3,163.7,9" />
              </svg>
            </figure>
            <div className="icon-lg bg-primary text-white rounded-4 shadow position-absolute top-0 start-100 translate-middle z-index-9 ms-n4 d-none d-md-block">
              <FaBell />
            </div>
            <Card className="p-3 card-body shadow rounded-4 position-absolute top-0 start-0 translate-middle ms-5 z-index-1 d-none d-xl-block">
              <div className="d-flex justify-content-between">
                <div className="avatar">
                  <img className="avatar-img rounded-circle shadow" src={avatar4} alt="avatar" />
                </div>
                <div className="text-start ms-3">
                  <h6 className="mb-0">Java Development class</h6>
                  <p className="mb-0 small text-body">Today at 1:00 pm</p>
                  <Button size="sm" variant="danger-soft" className="mt-2 mb-0">
                    Join now
                  </Button>
                </div>
              </div>
            </Card>
            <div className="position-absolute top-100 start-100 translate-middle z-index-1 ms-n6 mt-n5 d-none d-xxl-block">
              <Card className="card-body shadow p-4 rounded-3 d-inline-block position-relative z-index-1">
                <div className="icon-lg bg-success rounded-circle position-absolute top-100 start-100 translate-middle">
                  <BsChatLeftText className="text-white" />
                </div>
                <ul className="avatar-group mb-2">
                  <li className="avatar avatar-sm">
                    <img className="avatar-img rounded-circle" src={avatar1} alt="avatar" />
                  </li>
                  <li className="avatar avatar-sm">
                    <img className="avatar-img rounded-circle" src={avatar2} alt="avatar" />
                  </li>
                  <li className="avatar avatar-sm">
                    <img className="avatar-img rounded-circle" src={avatar3} alt="avatar" />
                  </li>
                  <li className="avatar avatar-sm">
                    <div className="avatar-img rounded-circle bg-primary">
                      <span className="text-white position-absolute top-50 start-50 translate-middle">+</span>
                    </div>
                  </li>
                </ul>
                <h6 className="mb-1 text-start">15K+ Students</h6>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item me-1 h6 mb-0">4.5</li>
                  {Array(Math.floor(4.5)).fill(0).map((_star, idx) => <li key={idx} className="list-inline-item me-1 small">
                        <FaStar size={14} className="text-warning" />
                      </li>)}
                  {!Number.isInteger(4.5) && <li className="list-inline-item me-1 small">

                      <FaStarHalfAlt size={14} className="text-warning" />
                    </li>}
                  {4.5 < 5 && Array(5 - Math.ceil(4.5)).fill(0).map((_star, idx) => <li key={idx} className="list-inline-item me-1 small">
                          <FaRegStar size={14} className="text-warning" />
                        </li>)}
                </ul>
              </Card>
            </div>
            <div className=" position-relative">
              <div className="bg-warning rounded-4 border border-white border-5 h-200px h-sm-300px shadow" />
              <img src={element6} className="position-absolute bottom-0 start-50 translate-middle-x" alt="element" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>;
};
export default Hero;
