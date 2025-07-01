import PageMetaData from '@/components/PageMetaData';
import { Col, Row } from 'react-bootstrap';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import SignIn from './components/SignIn';
const SignInPage = () => {
  return <>
      <PageMetaData title="E-CARENERS Login" />
      <AuthLayout>
        <Col xs={12} lg={6} className="m-auto">
          <Row className="my-5">
            <Col sm={10} xl={8} className="m-auto">
              <span className="mb-0 fs-1">👋</span>
              <h1 className="fs-2">Login to E-CARENERS!</h1>
              <p className="lead mb-4">Welcome back! Please log in to your E-CARENERS account.</p>
              <SignIn />
              {/* 'Or' separator and social login buttons removed */}
              <div className="mt-4 text-center">
                {/* Sign up link removed */}
              </div>
            </Col>
          </Row>
        </Col>
      </AuthLayout>
    </>;
};
export default SignInPage;
