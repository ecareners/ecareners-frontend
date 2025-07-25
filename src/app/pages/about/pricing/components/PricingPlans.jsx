import { currency } from '@/context/constants';
import { getAllPricingPlans } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from 'react-bootstrap';
const PricingCard = ({
  plan
}) => {
  const {
    features,
    price,
    title,
    badge,
    isRecommended
  } = plan;
  return <Card className="border rounded-3 p-2 p-sm-4 h-100">
      <CardHeader className="p-0">
        <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-2">
          <div>
            <h5 className="mb-0">{title}</h5>
            {badge && <div className="badge text-bg-dark mb-0 rounded-pill">{badge}</div>}
            {isRecommended && <div className="badge bg-grad mb-0 rounded-pill">Recommended</div>}
          </div>
          <div>
            <h4 className="text-success mb-0 plan-price">
              {currency}
              {price}
            </h4>
            <p className="small mb-0">/ per user</p>
          </div>
        </div>
      </CardHeader>
      <div className="position-relative my-3 text-center">
        <hr />
        <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3">All plans included</p>
      </div>
      <CardBody className="pt-0">
        <ul className="list-unstyled mt-2 mb-0">
          {features.map((feature, idx) => {
          const Icon = feature.icon;
          return <li className="mb-3 h6 fw-light" key={idx}>
                {Icon && <Icon className={`text-${feature.variant} me-2`} />}
                {feature.name}
              </li>;
        })}
        </ul>
      </CardBody>
      <CardFooter className="text-center d-grid pb-0">
        <Button type="button" variant={isRecommended ? 'dark' : 'light'} className="mb-0">
          Get Started
        </Button>
      </CardFooter>
    </Card>;
};
const PricingPlans = () => {
  const allPricing = useFetchData(getAllPricingPlans);
  const [planDuration, setPlanDuration] = useState('month');
  const handleChange = () => {
    if (planDuration === 'month') {
      return setPlanDuration('year');
    }
    return setPlanDuration('month');
  };
  return <section className="py-5 price-wrap">
      <Container>
        <Row className="g-4 position-relative mb-4">
          <figure className="position-absolute top-0 start-0 d-none d-sm-block">
            <svg width="22px" height="22px" viewBox="0 0 22 22">
              <polygon className="fill-purple" points="22,8.3 13.7,8.3 13.7,0 8.3,0 8.3,8.3 0,8.3 0,13.7 8.3,13.7 8.3,22 13.7,22 13.7,13.7 22,13.7 " />
            </svg>
          </figure>
          <Col lg={10} className="mx-auto text-center position-relative">
            <figure className="position-absolute top-50 end-0 translate-middle-y d-none d-md-block">
              <svg width="27px" height="27px">
                <path className="fill-orange" d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z" />
              </svg>
            </figure>
            <h1>Affordable Pricing Packages</h1>
            <p className="mb-4 pb-1">Perceived end knowledge certainly day sweetness why cordially</p>
            <form className="d-flex align-items-center justify-content-center">
              <span className="h6 mb-0 fw-bold">Monthly</span>
              <div className="form-check form-switch form-check-lg mx-3 mb-0">
                <input className="form-check-input mt-0 price-toggle" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={false} onChange={handleChange} />
              </div>
              <div className="position-relative">
                <span className="h6 mb-0 fw-bold">Yearly</span>
                <span className="badge bg-danger bg-opacity-10 text-danger ms-1 position-absolute top-0 start-100 translate-middle mt-n2 ms-2 ms-md-5">
                  10% discount
                </span>
              </div>
            </form>
          </Col>
        </Row>
        <Row className="g-4">
          {allPricing?.map(item => item.plans.map((plan, idx) => {
          {
            if (item.duration === planDuration) return <Col md={6} xl={4} key={idx}>
                      <PricingCard plan={plan} />
                    </Col>;
          }
        }))}
        </Row>
      </Container>
    </section>;
};
export default PricingPlans;
