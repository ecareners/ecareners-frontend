import error404 from '@/assets/images/element/error404-01.svg';
import PageMetaData from '@/components/PageMetaData';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const page = () => {
  return <>
      <PageMetaData title="Tidak Ditemukan" />
      <Row>
        <Col xs={12} className="text-center">
          <img src={error404} className="h-200px h-md-400px mb-4" alt="error404" />
          <h1 className="display-1 text-danger mb-0">404</h1>
          <h2>Oh tidak, ada sesuatu yang salah!</h2>
          <p className="mb-4">Atau halaman ini sudah tidak ada lagi.</p>
          <Link to="/admin/dashboard" className="btn btn-primary mb-0">
            Kembali ke Dashboard
          </Link>
        </Col>
      </Row>
    </>;
};
export default page;
