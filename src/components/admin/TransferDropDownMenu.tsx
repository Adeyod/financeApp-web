import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { SidebarComponentProps } from '../../constants/types';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

const TransactionDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col">
      <NavLink
        to="/admin/transactions/all"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        {toggle ? (
          <span>
            <MdAccountBalanceWallet className="text-xl " />
          </span>
        ) : (
          <div className="flex items-center">
            <span>
              <GoDotFill />
            </span>
            <span>All Transactions</span>
          </div>
        )}
      </NavLink>
    </div>
  );
};

export default TransactionDropDownMenu;
