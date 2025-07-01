import { useLayoutContext } from '@/context/useLayoutContext';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsPower } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { toSentenceCase } from '@/utils/change-casing';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/useAuthContext';

const ProfileDropdown = ({
  className
}) => {
  const {
    changeTheme,
    theme
  } = useLayoutContext();
  const { user, logout, isAuthenticated } = useAuth();
  
  return <Dropdown drop="start" className={className}>
      <DropdownToggle as="a" className="avatar avatar-sm p-0 arrow-none" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
        <div className="avatar-img rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
          <FaUser className="text-white" size={20} />
        </div>
      </DropdownToggle>
      <DropdownMenu as="ul" className="dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
        {isAuthenticated && user && (
          <li className="px-3 mb-2">
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <div className="avatar-img rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <FaUser className="text-white" size={20} />
                </div>
              </div>
              <div>
                {user.name && <div className="fw-bold">{user.name}</div>}
                <div className="small text-muted">{user.email}</div>
              </div>
            </div>
            <hr className="my-2" />
          </li>
        )}
        <li>
          <Link className="dropdown-item bg-danger-soft-hover" onClick={logout} to="/auth/sign-in">
            <BsPower className="fa-fw me-2" />
            Sign Out
          </Link>
        </li>
      </DropdownMenu>
    </Dropdown>;
};

export default ProfileDropdown;
