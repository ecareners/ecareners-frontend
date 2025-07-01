import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const FikesFooter = () => {
  return (
    <footer className="fikes-footer bg-dark text-white">
      {/* Main Footer Content */}
      <div className="container py-5">
        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-4">
            <h5 className="text-primary mb-3">KONTAK KAMI</h5>
            <div className="contact-info">
              <div className="d-flex align-items-start mb-3">
                <FaMapMarkerAlt className="text-secondary me-2 mt-1" />
                <div>
                  <p className="mb-1">Jl. dr. Soeparno Grendeng</p>
                  <p className="mb-1">Purwokerto Utara 53122</p>
                  <p className="mb-0">Banyumas - Jawa Tengah, Indonesia</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaPhone className="text-secondary me-2" />
                <span>+62 281 6572772</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaEnvelope className="text-secondary me-2" />
                <span>fikes@unsoed.ac.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Profil</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Sejarah</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Visi, Misi dan Tujuan</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Pimpinan Fakultas</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Organisasi</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Program Studi</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Kesehatan Masyarakat</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Keperawatan</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Farmasi</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Ilmu Gizi</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Pendidikan Jasmani</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Akademik</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Layanan Akademik</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Kalender Akademik</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Komisi Tugas Akhir</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Komisi Etik</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Kemahasiswaan</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">UKM dan HIMA</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Program Kreativitas</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Program Wirausaha</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none">Info Beasiswa</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-white">
                © 2024 FIKES. All rights reserved
              </p>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex justify-content-end">
                <Link to="#" className="text-white me-3">
                  <FaFacebook size={20} />
                </Link>
                <Link to="#" className="text-white me-3">
                  <FaTwitter size={20} />
                </Link>
                <Link to="#" className="text-white me-3">
                  <FaInstagram size={20} />
                </Link>
                <Link to="#" className="text-white">
                  <FaYoutube size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FikesFooter; 