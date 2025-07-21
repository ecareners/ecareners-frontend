import { Container } from 'react-bootstrap';
import clsx from 'clsx';

const Footer = ({
  className
}) => {
  return (
    <footer className={clsx('py-3', className)}>
      <Container>
        <div className="text-center">
          <p className="mb-0 text-muted">
            Hak Cipta ©2025 E-CARENERS
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
