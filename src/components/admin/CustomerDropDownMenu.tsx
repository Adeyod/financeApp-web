import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { AiOutlineTransaction } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';
import { SidebarComponentProps } from '../../constants/types';

const CustomerDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col">
      <NavLink
        to="/admin/customers/all"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        {toggle ? (
          <span>
            <AiOutlineTransaction className="text-xl " />
          </span>
        ) : (
          <div className="flex items-center">
            <span>
              <GoDotFill />
            </span>
            <span>All Customers</span>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default CustomerDropDownMenu;
