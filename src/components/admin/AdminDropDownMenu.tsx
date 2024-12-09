import { FcPortraitMode } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { SidebarComponentProps } from '../../constants/types';
import { GoDotFill } from 'react-icons/go';
import TransactionDropDownMenu from './TransferDropDownMenu';
import CustomerDropDownMenu from './CustomerDropDownMenu';
import { useState } from 'react';
import AccountDropDownMenu from './AccountDropDownMenu';

const AdminDropDownMenu = ({
  toggle,
  handleDropDownToggle,
  dropDownOpen,
  handleCloseToggle,
}: SidebarComponentProps) => {
  const [customerDropDownOpen, setCustomerDropDownOpen] = useState(false);
  const [accountDropDownOpen, setAccountDropDownOpen] = useState(false);

  const handleCustomerDropDownToggle = () => {
    setCustomerDropDownOpen(!customerDropDownOpen);
  };

  const handleAccountDropDownOpenToggle = () => {
    setAccountDropDownOpen(!accountDropDownOpen);
  };

  return (
    <div className="flex flex-col items-start ml-[-10px] mr-5 mt-3 gap-3 font-bold">
      <NavLink
        to="/admin/dashboard"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl" />
        </span>
        <span
          className={[toggle ? 'hidden' : 'block', 'flex items-center'].join(
            ' '
          )}
        >
          <GoDotFill />
          Admin Dashboard
        </span>
      </NavLink>

      {/* ACCOUNTS SECTION */}
      <button onClick={handleAccountDropDownOpenToggle}>
        {toggle ? <span></span> : <span>Accounts</span>}
      </button>
      {accountDropDownOpen && (
        <AccountDropDownMenu
          handleCloseToggle={handleCloseToggle}
          toggle={toggle}
        />
      )}
      {/* CUSTOMERS SECTION */}

      <button onClick={handleCustomerDropDownToggle}>
        {toggle ? <span></span> : <span>Customers</span>}
      </button>
      {customerDropDownOpen && (
        <CustomerDropDownMenu
          handleCloseToggle={handleCloseToggle}
          toggle={toggle}
        />
      )}

      {/* TRANSACTIONS SECTION */}
      <button className="" onClick={handleDropDownToggle}>
        {toggle ? <span></span> : <span>Transactions</span>}
      </button>
      {dropDownOpen && (
        <TransactionDropDownMenu
          handleCloseToggle={handleCloseToggle}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default AdminDropDownMenu;
