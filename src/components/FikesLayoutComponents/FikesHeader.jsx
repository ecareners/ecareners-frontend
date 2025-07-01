import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaGlobe } from 'react-icons/fa';

const FikesHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);

  return (
    <header className="fikes-header">
      {/* Top Bar */}
      <div className="fikes-topbar bg-primary text-white py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <i className="fas fa-envelope me-1"></i>
                  fikes@unsoed.ac.id
                </span>
                <span>
                  <i className="fas fa-phone me-1"></i>
                  +62 281 6572772
                </span>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <div className="dropdown me-3">
                  <button 
                    className="btn btn-link text-white p-0 border-0"
                    onClick={toggleLanguage}
                  >
                    <FaGlobe className="me-1" />
                    LANGUAGE
                  </button>
                  {isLanguageOpen && (
                    <div className="dropdown-menu show">
                      <Link className="dropdown-item" to="#">Indonesia</Link>
                      <Link className="dropdown-item" to="#">English</Link>
                    </div>
                  )}
                </div>
                <Link to="/auth/sign-in" className="btn btn-outline-light btn-sm">
                  <FaUser className="me-1" />
                  ADMISI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <div className="d-flex align-items-center">
              <div className="fikes-logo me-3">
                <div className="logo-circle bg-primary text-white d-flex align-items-center justify-content-center">
                  <span className="fw-bold">FIKES</span>
                </div>
              </div>
              <div>
                <h5 className="mb-0 text-primary fw-bold">Universitas Jenderal Soedirman</h5>
                <small className="text-cool-gray">Fakultas Ilmu-Ilmu Kesehatan</small>
              </div>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Menu */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button">
                  Profil
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Sejarah</Link></li>
                  <li><Link className="dropdown-item" to="#">Visi, Misi dan Tujuan</Link></li>
                  <li><Link className="dropdown-item" to="#">Pimpinan Fakultas</Link></li>
                  <li><Link className="dropdown-item" to="#">Organisasi dan Tata Kerja</Link></li>
                  <li><Link className="dropdown-item" to="#">Tenaga Pendidik</Link></li>
                  <li><Link className="dropdown-item" to="#">Tenaga Kependidikan</Link></li>
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button">
                  Program Studi
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Kesehatan Masyarakat</Link></li>
                  <li><Link className="dropdown-item" to="#">Keperawatan</Link></li>
                  <li><Link className="dropdown-item" to="#">Farmasi</Link></li>
                  <li><Link className="dropdown-item" to="#">Ilmu Gizi</Link></li>
                  <li><Link className="dropdown-item" to="#">Pendidikan Jasmani</Link></li>
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button">
                  Akademik
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Layanan Akademik</Link></li>
                  <li><Link className="dropdown-item" to="#">Kalender Akademik</Link></li>
                  <li><Link className="dropdown-item" to="#">Komisi Tugas Akhir</Link></li>
                  <li><Link className="dropdown-item" to="#">Komisi Etik Kesehatan</Link></li>
                  <li><Link className="dropdown-item" to="#">Gugus Penjaminan Mutu</Link></li>
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button">
                  Kemahasiswaan
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">UKM dan HIMA</Link></li>
                  <li><Link className="dropdown-item" to="#">Program Kreativitas Mahasiswa</Link></li>
                  <li><Link className="dropdown-item" to="#">Program Mahasiswa Wirausaha</Link></li>
                  <li><Link className="dropdown-item" to="#">Info Beasiswa</Link></li>
                  <li><Link className="dropdown-item" to="#">Bimbingan dan Konseling</Link></li>
                </ul>
              </li>
              
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button">
                  PPID Pelaksana
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Informasi Berkala</Link></li>
                  <li><Link className="dropdown-item" to="#">Informasi Setiap Saat</Link></li>
                  <li><Link className="dropdown-item" to="#">Informasi Serta Merta</Link></li>
                  <li><Link className="dropdown-item" to="#">Regulasi KIP</Link></li>
                  <li><Link className="dropdown-item" to="#">Permohonan Informasi</Link></li>
                  <li><Link className="dropdown-item" to="#">Pengadaan Barang dan Jasa</Link></li>
                  <li><Link className="dropdown-item" to="#">PPID Unsoed</Link></li>
                  <li><Link className="dropdown-item" to="#">Jaringan Dokumentasi & Informasi Hukum</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default FikesHeader; 