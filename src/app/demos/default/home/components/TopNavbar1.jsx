import LogoBox from '@/components/LogoBox';
import TopNavbar from '@/components/TopNavbar';
import { useLayoutContext } from '@/context/useLayoutContext';
import { Container, Collapse } from 'react-bootstrap';
import ProfileDropdown from '@/components/TopNavbar/components/ProfileDropdown';
import { FaStethoscope, FaVideo, FaClipboardList, FaUserMd, FaChartLine } from 'react-icons/fa';

// Medical-themed menu items for all pages
const MEDICAL_MENU_ITEMS = [
  {
    key: 'protocols',
    label: 'Protokol',
    icon: FaStethoscope,
    url: '/pages/protocols', // SOPs page
  },
  {
    key: 'training',
    label: 'Video',
    icon: FaVideo,
    url: '/pages/videos', // Current page
  },
  {
    key: 'case-studies',
    label: 'Tugas',
    icon: FaClipboardList,
    url: '/pages/assignment', // Video Library page
  },
  {
    key: 'conferences',
    label: 'Konferensi',
    icon: FaUserMd,
    url: '/pages/conference', // Conference page
  },
  {
    key: 'assessments',
    label: 'Penilaian',
    icon: FaChartLine,
    url: '/pages/assessments', // Assessment page
  }
];

const TopNavbar1 = () => {
  const {
    appMenuControl
  } = useLayoutContext();

  return <TopNavbar>
      <Container fluid className="px-3 px-xl-5 d-flex align-items-center">
        <LogoBox height={48} width={200} />
        
        <button 
          onClick={appMenuControl.toggle} 
          className="navbar-toggler ms-auto d-lg-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarCollapse" 
          aria-controls="navbarCollapse" 
          aria-expanded={appMenuControl.open} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-animation">
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* Medical-themed Home Menu - Centered and Responsive */}
        <Collapse in={appMenuControl.open} className="navbar-collapse flex-grow-1">
          <ul className="navbar-nav justify-content-center">
            {MEDICAL_MENU_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={item.key + idx} className="nav-item">
                  <a 
                    href={item.url} 
                    className="nav-link px-3 d-flex align-items-center gap-2"
                    onClick={() => {
                      // Close mobile menu when link is clicked
                      if (window.innerWidth < 992) {
                        appMenuControl.close();
                      }
                    }}
                  >
                    <Icon className="medical-nav-icon" />
                    <span className="nav-link-text">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Collapse>
        
        <ProfileDropdown className="ms-1 ms-lg-0 d-none d-lg-block" />
      </Container>
    </TopNavbar>;
};
export default TopNavbar1;
