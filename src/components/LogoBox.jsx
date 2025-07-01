import logoEcareners from '@/assets/images/logo-ecareners.jpg';
// import logo from '@/assets/images/logo.svg';
// import logoLight from '@/assets/images/logo-light.svg';
import { Link } from 'react-router-dom';

const LogoBox = ({
  height = 48,
  width = 200
}) => {
  return <Link className="navbar-brand d-flex align-items-center" to="/">
      <img
        src={logoEcareners}
        alt="logo e-CareNers"
        style={{ height, width, maxHeight: 'none', maxWidth: 'none', objectFit: 'contain', display: 'block' }}
        className="navbar-brand-item me-2"
      />
      <span className="brand-text fw-bold fs-4 text-primary">E-CARENERS</span>
    </Link>;
};

export default LogoBox;
