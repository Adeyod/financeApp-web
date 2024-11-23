import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { FcPortraitMode } from 'react-icons/fc';
import { GoDotFill } from 'react-icons/go';
import { SidebarComponentProps } from '../../constants/types';

const AllAdminDropDownMenu = ({ toggle }: SidebarComponentProps) => {
  return (
    <div className="flex flex-col ">
      <NavLink
        to="/super-admin/admins/all"
        className={(isActive) => NavLinkComponent(isActive)}
      >
        {toggle ? (
          <span>
            <FcPortraitMode className="text-xl" />{' '}
          </span>
        ) : (
          <div className="flex items-center">
            <span>
              <GoDotFill />
            </span>
            <span>All Admins</span>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default AllAdminDropDownMenu;
