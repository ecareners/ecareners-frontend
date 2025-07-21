import error404Img from '@/assets/images/element/error404-01.svg';
import Footer from '@/components/error-components/Footer';
import TopNavigationBar from '@/components/error-components/TopNavigationBar';
import PageMetaData from '@/components/PageMetaData';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return <>
      <PageMetaData title="Tidak Ditemukan" />
      <TopNavigationBar />
      <main>
        <section className="pt-5">
          <Container>
            <Row>
              <Col xs={12} className="text-center">
                <img src={error404Img} className="h-200px h-md-400px mb-4" alt="error404" />
                <h1 className="display-1 text-danger mb-0">404</h1>
                <h2>Oh tidak, ada sesuatu yang salah!</h2>
                <p className="mb-4">Atau halaman ini tidak lagi ada.</p>
                <Link to="/" className="btn btn-primary mb-0">
                  Kembali ke Beranda
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer className="pt-5 bg-light" />
    </>;
};
export default NotFound;
