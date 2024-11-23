import { NavLink } from 'react-router-dom';
import { SidebarComponentProps } from '../../constants/types';
import NavLinkComponent from '../NavLinkComponent';
import { CgPassword } from 'react-icons/cg';
import { GoDotFill } from 'react-icons/go';

const AccountDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col">
      <NavLink
        to="/admin/accounts/all"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        {toggle ? (
          <span>
            <CgPassword className="text-xl " />
          </span>
        ) : (
          <div className="flex items-center">
            <span>
              <GoDotFill />
            </span>
            <span>All Accounts</span>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default AccountDropDownMenu;
