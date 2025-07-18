import TopNavbar from '@/components/TopNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import logo from '@/assets/images/logo.svg';
import logoLight from '@/assets/images/logo-light.svg';
import AppMenu from '@/components/TopNavbar/components/AppMenu';
import { useLayoutContext } from '@/context/useLayoutContext';
import clsx from 'clsx';
import { toSentenceCase } from '@/utils/change-casing';
const TopNavigationBar = () => {
  const {
    changeTheme,
    theme,
    appMenuControl
  } = useLayoutContext();
  const themeModes = [{
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-circle-half fa-fw theme-icon-active" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
          <use href="#" />
        </svg>,
    theme: 'light'
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-moon-stars-fill fa-fw mode-switch me-1" viewBox="0 0 16 16">
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
          <use href="#" />
        </svg>,
    theme: 'dark'
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-circle-half fa-fw mode-switch me-1" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
          <use href="#" />
        </svg>,
    theme: 'auto'
  }];
  return <TopNavbar className="navbar-transparent">
      <Container>
        <Link className="navbar-brand me-0" to="/">
          <img height={36} width={170} className="light-mode-item navbar-brand-item" src={logo} alt="logo" />
          <img height={36} width={170} className="dark-mode-item navbar-brand-item" src={logoLight} alt="logo" />
        </Link>
        <button onClick={appMenuControl.toggle} className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded={appMenuControl.open} aria-label="Toggle navigation">
          <span className="navbar-toggler-animation">
            <span />
            <span />
            <span />
          </span>
        </button>
        <AppMenu mobileMenuOpen={appMenuControl.open} menuClassName="ms-auto" />
        <Dropdown>
          <DropdownToggle size="sm" variant="light" className="arrow-none lh-1 p-2 mb-0" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static">
            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="currentColor" className="bi bi-circle-half fa-fw theme-icon-active" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
              <use href="#" />
            </svg>
          </DropdownToggle>
          <DropdownMenu className="min-w-auto dropdown-menu-end" aria-labelledby="bd-theme">
            {themeModes.map((mode, idx) => <li className={clsx({
            'mb-1': themeModes.length - 1 != idx
          })} key={idx}>
                <button onClick={() => changeTheme(mode.theme)} type="button" className={clsx('dropdown-item d-flex align-items-center', {
              active: theme === mode.theme
            })} data-bs-theme-value="light">
                  {mode.icon}
                  {toSentenceCase(mode.theme)}
                </button>
              </li>)}
          </DropdownMenu>
        </Dropdown>
        <div className="navbar-nav ms-3 d-none d-sm-block">
          <Button variant="dark" size="sm" className="mb-0">
            Buy now
          </Button>
        </div>
      </Container>
    </TopNavbar>;
};
export default TopNavigationBar;
