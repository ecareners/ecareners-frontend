import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { BsPinMapFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import HeroSlider from './HeroSlider';
import element17 from '@/assets/images/element/17.svg';
import about7 from '@/assets/images/about/07.jpg';
const Hero = () => {
  return <section className="position-relative pt-5">
      <figure className="position-absolute bottom-0 start-0 d-none d-lg-block">
        <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
          <path className="fill-warning opacity-5" d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z" />
        </svg>
      </figure>
      <figure className="position-absolute top-0 end-0">
        <svg width="822.2px" height="301.9px" viewBox="0 0 822.2 301.9">
          <path className="fill-success opacity-5" d="M752.5,51.9c-4.5,3.9-8.9,7.8-13.4,11.8c-51.5,45.3-104.8,92.2-171.7,101.4c-39.9,5.5-80.2-3.4-119.2-12.1 c-32.3-7.2-65.6-14.6-98.9-13.9c-66.5,1.3-128.9,35.2-175.7,64.6c-11.9,7.5-23.9,15.3-35.5,22.8c-40.5,26.4-82.5,53.8-128.4,70.7 c-2.1,0.8-4.2,1.5-6.2,2.2L0,301.9c3.3-1.1,6.7-2.3,10.2-3.5c46.1-17,88.1-44.4,128.7-70.9c11.6-7.6,23.6-15.4,35.4-22.8 c46.7-29.3,108.9-63.1,175.1-64.4c33.1-0.6,66.4,6.8,98.6,13.9c39.1,8.7,79.6,17.7,119.7,12.1C634.8,157,688.3,110,740,64.6 c4.5-3.9,9-7.9,13.4-11.8C773.8,35,797,16.4,822.2,1l-0.7-1C796.2,15.4,773,34,752.5,51.9z" />
        </svg>
      </figure>
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col lg={6} className="position-relative z-index-9">
            <h6 className="mb-3 font-base">
              <BsPinMapFill className="me-2" />
              St Joseph, Eugene, Oregon, USA
            </h6>
            <h1 className="display-4">Academia tuition classes</h1>
            <p className="lead mb-4">
              We are so eager to be working with kids and making a difference in their careers. Being a mentor is what we have always wanted to be.
            </p>
            <Row className="my-3">
              <HeroSlider />
            </Row>
            <a href="#contact-form" className="btn btn-primary">
              Contact me!
            </a>
          </Col>
          <Col lg={6} className="position-relative mt-5 mt-lg-0">
            <figure className="position-absolute top-0 start-0 ms-n3 mt-n3 z-index-9">
              <svg enableBackground="new 0 0 108 129.3">
                <path className="fill-blue" d="m50.4 14.9c0.2-3.3 2.4-5 5.6-4.1 1.3 0.4 2.1 1.2 2.5 2.5 0.4 1.5 0.3 3-0.4 4.4-0.8 1.4-1.9 2.3-3.6 2.3-1.6 0-2.8-1-3.4-2.5-0.3-0.6-0.4-1.3-0.6-1.9 0-0.2 0-0.4-0.1-0.7zm-31.6 82v-0.5c0.3-0.7 0.3-1.5 0.3-2.3 0-1 0.9-1.8 1.9-1.8 0.5 0 1 0.1 1.3 0.3 1.3 0.6 2.6 1.4 3.6 2.6 2 2.2 1.1 5.9-1.7 6.9-1.5 0.6-3 0.2-4.1-1-0.7-1.1-1.3-2.7-1.3-4.2zm17.1 21.8c-0.7 0.7-0.9 1.5-0.9 2.1 0 2.3 1 4.1 2.6 5 1.9 1.1 4 0.5 5.1-1.4 1.5-2.8-0.3-6.6-3.3-7.2-1.2-0.3-2.2 0-2.9 1-0.3 0.1-0.5 0.3-0.6 0.5zm60.7-30.4c0 0.2-0.1 0.4-0.1 0.6-0.1 0.4-0.1 0.8-0.3 1.2-0.9 2.5-3.8 3.1-5.7 1.2-1-0.9-1.3-2.1-1.5-3.4 0-0.4-0.1-0.8-0.3-1.2-0.6-1.5 0-2.8 1.6-3.3 1.9-0.7 4.5 0.3 5.5 2.1 0.5 0.7 0.7 1.7 0.8 2.8zm-85-53.3v0.3c0 1.8 0.3 3 1.2 4 0.9 1.1 2.1 1.6 3.6 1.3 1.4-0.3 2.3-1.2 2.8-2.6 0.8-2.5-0.5-5.4-3.1-6-0.1 0-0.2-0.1-0.3-0.1-0.2 0-0.3-0.1-0.5-0.2-1.2-0.5-2.6 0-3.2 1.5-0.2 0.7-0.4 1.3-0.5 1.8zm71.8 72.1c0 1.7-0.9 3.1-2.3 3.5-1.3 0.5-2.6 0-3.6-1.1-1.1-1.3-1.6-2.9-1.5-4.6 0-1.2 0.7-2.2 1.4-3.1 0.5-0.6 1.2-0.8 1.9-0.6 0.4 0.1 0.8 0.3 1.2 0.5 1.5 1 2.9 3.6 2.9 5.4zm-71.5-42v0.4c0 1.9 0.6 3.6 2.3 4.7 1.1 0.8 2.3 0.9 3.6 0.3 1.2-0.6 1.8-1.7 1.8-3 0.1-2.2-1-3.9-2.9-5-0.2-0.1-0.3-0.2-0.5-0.3-2.1-0.7-4.1 0.7-4.3 2.9zm55.9 43.5c0.1 0.1 0.1 0.3 0.2 0.5s0.2 0.5 0.3 0.7c0.6 1 1 1.9 1.1 3.1 0 1.3-0.4 2.2-1.6 2.8-1.1 0.6-2.2 0.4-3.2-0.4-1.1-0.8-1.7-2.1-1.9-3.4l-0.3-1.8c0-0.3-0.1-0.6-0.1-0.9-0.1-0.6 0-1.2 0.5-1.6l0.1-0.1c0.7-0.5 1.5-1.1 2.3-1.3 1.5-0.5 3 0.8 2.6 2.4zm-0.8-28.1c-1.1 1.3-1.8 2.7-1.8 4.1 0 1.5 0.2 2.4 0.6 3.1 0.7 1.1 1.8 1.7 3.1 1.5 1.5-0.2 2.9-1.5 3.2-3 0.3-1.7-0.1-3.3-1.1-4.7-0.1-0.2-0.2-0.3-0.4-0.5-0.1-0.2-0.2-0.3-0.4-0.5-0.8-1-2.2-1.1-3.2 0zm-27.5 21.6c2.7-0.5 4.9 2.7 4.3 5.4-0.5 2.1-2.7 3.2-4.7 2.3s-3.3-3.6-2.7-5.7c0.3-1.2 1.3-2.3 3.1-2zm56.5-36.5c-0.7 1.1-1.1 2.4-1 3.7 0 1 0.2 1.9 0.7 2.8 0.8 1.3 2 1.9 3.3 1.7s2.3-1.2 2.5-2.6c0.4-2.3-0.5-4.3-2-6-1-1.2-2.6-0.9-3.5 0.4zm-64.7 14.5c0.1 0.2 0.2 0.5 0.3 0.7 0.6 1.1 0.9 2.2 0.7 3.5-0.2 1.1-0.8 1.9-1.8 2.3-1.1 0.4-2.1 0-2.9-0.8-0.7-0.8-1.1-1.8-1.3-2.8-0.1-0.5-0.3-1-0.5-1.5-0.5-1.2-0.3-2.3 0.8-3 0.2-0.1 0.4-0.3 0.6-0.4s0.4-0.3 0.6-0.4c0.8-0.5 1.6-0.6 2.5-0.1 0.8 0.5 1.1 1.2 1 2.1-0.1 0.1 0 0.3 0 0.4zm46.9-60.6c1.1-0.6 1.6-1.6 1.6-2.7 0-1.8-1.2-3.9-2.8-5.2-1.7-1.3-3.8-0.5-4 1.7-0.1 1-0.1 2 0.1 3 0.2 1.2 0.8 2.3 1.9 3 1 0.7 2.1 0.8 3.2 0.2zm-28.5 68.8v-1-1.9c0.1-1.3 1.3-2.1 2.6-1.7 0.5 0.2 1 0.5 1.5 0.8 1 0.9 1.6 1.9 2.1 3.1 0.4 0.9 0.5 1.9 0.1 2.8-0.4 1.2-1.3 2-2.5 2.2-1.3 0.2-2.3-0.3-3.1-1.3-0.6-0.8-0.8-1.9-0.7-3zm40-49.3c1.6-0.6 2.6-2.2 2.6-4 0-1.7-0.9-3.1-2.3-3.6-1.5-0.5-3.1 0-4.1 1.3-1.1 1.4-1.1 4.1 0.1 5.4 0.8 1.1 2.3 1.4 3.7 0.9zm-40.7 11.2c0 0.7-0.2 1.5-0.6 2.1-1.2 1.8-3.6 2-4.9 0.3-1-1.2-1.3-2.7-1.3-4.2 0-0.3 0.1-0.7 0.1-1 0-0.1 0-0.2 0.1-0.3 0.4-1.8 1.9-2.5 3.6-1.7 1.7 0.7 3 2.8 3 4.8zm16.5-15.8c0-0.1 0.1-0.3 0.1-0.4-0.1-1.2-0.6-2.1-1.6-2.9 0-0.1-0.1-0.1-0.2-0.2-0.2-0.2-0.5-0.4-0.6-0.7-0.7-1.3-2.7-1.5-3.9 0-1.3 1.7-1.3 4.3 0 6 1.6 2.1 4.4 1.9 5.7-0.3 0.2-0.4 0.3-1 0.5-1.5zm22.7 21.2c0 1.5-0.7 2.8-2.1 3.7-1.8 1.2-4.1 0.5-4.9-1.6-0.9-2.5 0-4.9 3-5.8 1.1-0.4 2.2 0 3 0.9 0.7 0.8 1 1.7 1 2.8zm-20.1 4.4c0.1-0.2 0.1-0.5 0.2-0.7-0.1-2.3-2.6-4.8-4.8-4.8-1.4 0-2.5 1-2.4 2.3 0 0.8 0.1 1.6 0.3 2.4 0.3 1.3 0.8 2.3 1.9 3.1 1.6 1 3.5 0.6 4.4-1.1 0.2-0.4 0.3-0.8 0.4-1.2zm-22.7-32.2c0 1.4-0.7 2.6-1.9 3.1s-2.5 0.1-3.4-0.9c-1.3-1.5-1.6-3.2-1.3-5.1 0.2-0.7 0.5-1.3 1.1-1.8 1.2-0.9 2.7-0.6 3.5 0.6 0.3 0.4 0.5 0.8 0.8 1.1 0.8 1 1.2 1.9 1.2 3zm-20.9 16.4c0 0.2-0.1 0.3-0.1 0.4 0.1 1.8 0.5 3.1 1.6 4 1.6 1.4 3.9 0.9 4.7-1.1 0.5-1.3 0.3-2.5-0.5-3.6-0.3-0.5-0.6-0.9-0.7-1.4-0.3-1.2-1.5-1.8-2.7-1.5-0.8 0.2-1.4 0.8-1.8 1.5-0.2 0.7-0.4 1.3-0.5 1.7zm25.7 22.1c0 0.8-0.2 1.6-0.8 2.3-1.2 1.5-3.3 1.6-4.7 0.3-1.3-1.3-1.7-3.6-0.9-5.3 0.5-1.1 1.5-1.6 2.7-1.4h0.1 0.1c2.4 0.4 3.5 1.7 3.5 4.1zm25.4 4.6v2.6c0 0.8 0.3 1.8 1.1 2.7 1.4 1.4 3.6 1 4.3-0.8 0.8-1.9-0.7-5.6-2.6-6.4-1.4-0.6-2.8 0.4-2.8 1.9z" />
              </svg>
            </figure>
            <figure className="position-absolute top-0 start-0 mt-n6 ms-n5">
              <svg width="211px" height="211px">
                <path className="fill-danger opacity-2" d="M210.030,105.011 C210.030,163.014 163.010,210.029 105.012,210.029 C47.013,210.029 -0.005,163.014 -0.005,105.011 C-0.005,47.015 47.013,-0.004 105.012,-0.004 C163.010,-0.004 210.030,47.015 210.030,105.011 Z" />
              </svg>
            </figure>
            <figure className="position-absolute bottom-0 end-0 mb-n5 z-index-9">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="129px" height="133px">
                <path className="fill-danger" d="M127.581,25.993 C122.659,31.935 113.441,24.283 118.356,18.351 C123.278,12.408 132.496,20.060 127.581,25.993 ZM115.247,49.292 C106.977,59.275 91.492,46.420 99.748,36.454 C108.018,26.470 123.503,39.325 115.247,49.292 ZM86.935,2.378 C91.464,-3.089 99.944,3.951 95.423,9.409 C90.894,14.876 82.414,7.836 86.935,2.378 ZM93.501,43.010 C84.246,54.182 66.918,39.796 76.157,28.643 C85.411,17.471 102.740,31.856 93.501,43.010 ZM57.726,6.672 C63.633,-0.460 74.694,8.723 68.796,15.842 C62.889,22.973 51.828,13.791 57.726,6.672 ZM65.132,42.254 C65.414,45.250 64.407,48.520 62.488,50.836 C60.459,53.285 57.635,54.609 54.547,55.032 C51.448,55.456 48.387,54.215 45.962,52.383 C43.626,50.618 42.031,47.307 41.761,44.441 C41.479,41.444 42.486,38.175 44.406,35.858 C46.434,33.410 49.258,32.085 52.346,31.662 C55.446,31.238 58.507,32.479 60.931,34.312 C63.267,36.076 64.862,39.387 65.132,42.254 ZM48.502,101.257 C42.496,108.507 31.251,99.172 37.247,91.934 C43.252,84.684 54.497,94.019 48.502,101.257 ZM23.966,17.251 C29.774,10.238 40.651,19.267 34.852,26.269 C29.043,33.281 18.167,24.251 23.966,17.251 ZM9.378,26.952 C15.088,20.059 25.780,28.935 20.079,35.817 C14.369,42.711 3.677,33.835 9.378,26.952 ZM10.074,49.315 C5.742,54.545 -2.369,47.811 1.955,42.590 C6.287,37.361 14.399,44.094 10.074,49.315 ZM10.889,68.408 C13.679,70.517 13.903,74.910 11.746,77.514 C9.434,80.305 5.439,80.481 2.640,78.366 C-0.150,76.258 -0.375,71.865 1.783,69.260 C4.095,66.469 8.090,66.293 10.889,68.408 ZM9.881,114.513 C5.450,119.861 -2.845,112.974 1.578,107.635 C6.008,102.287 14.304,109.173 9.881,114.513 ZM12.758,94.899 C14.381,91.994 16.764,89.898 20.208,89.575 C22.532,89.358 25.068,90.140 26.866,91.630 C28.766,93.203 29.795,95.394 30.124,97.789 C30.589,101.171 28.744,104.038 26.279,106.100 C26.173,106.189 26.066,106.278 25.960,106.367 C24.381,107.689 21.309,108.287 19.326,107.873 C17.757,107.545 16.312,106.882 15.033,105.915 C13.453,104.722 12.479,102.811 12.056,100.935 C11.657,99.164 11.627,96.924 12.555,95.263 C12.622,95.142 12.690,95.021 12.758,94.899 ZM23.787,69.054 C28.020,63.943 35.947,70.523 31.721,75.626 C27.487,80.736 19.560,74.156 23.787,69.054 ZM23.899,47.361 C28.822,41.418 38.039,49.070 33.125,55.003 C28.202,60.945 18.985,53.293 23.899,47.361 ZM51.663,129.014 C42.901,139.591 26.494,125.972 35.242,115.411 C44.004,104.833 60.411,118.454 51.663,129.014 ZM69.137,67.525 C69.381,67.564 69.626,67.602 69.871,67.641 C77.305,68.819 80.658,77.977 75.894,83.728 C71.131,89.478 61.508,87.888 58.968,80.803 C58.884,80.570 58.800,80.337 58.717,80.104 C56.311,73.396 62.098,66.410 69.137,67.525 Z" />
              </svg>
            </figure>
            <div className="position-absolute top-0 start-50 translate-middle-x ms-n7 mt-n4 me-n3 z-index-9 d-none d-sm-block">
              <div className="px-4 py-3 bg-white bg-opacity-10 bg-blur border border-light shadow-lg rounded-4">
                <h6>You can follow me on:</h6>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">

                    <Link className="btn btn-round btn-sm bg-facebook" to="">
                      <FaFacebookF className="fa-fw" />
                    </Link>
                  </li>
                  <li className="list-inline-item">

                    <Link className="btn btn-round btn-sm bg-instagram-gradient" to="">
                      <FaInstagram className="fa-fw" />
                    </Link>
                  </li>
                  <li className="list-inline-item">

                    <Link className="btn btn-round btn-sm bg-twitter" to="">
                      <FaTwitter className="fa-fw" />
                    </Link>
                  </li>
                  <li className="list-inline-item">

                    <Link className="btn btn-round btn-sm bg-linkedin" to="">
                      <FaLinkedinIn className="fa-fw" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="position-absolute bottom-0 start-0 mb-0 mb-sm-4 ms-3 ms-sm-5 z-index-9">
              <div className="d-flex align-items-center p-2 p-sm-3 bg-white shadow rounded-4">
                <div className="icon-lg bg-white rounded-circle shadow">
                  <img src={element17} className="h-30px" alt="" />
                </div>
                <div className="ms-2">
                  <h6 className="mb-0 text-dark">Best tutor Award</h6>
                  <span className="small">Year 2021</span>
                </div>
              </div>
            </div>
            <img src={about7} className="rounded-3 z-index-1 position-relative" alt="Tutor image" />
          </Col>
        </Row>
      </Container>
    </section>;
};
export default Hero;
