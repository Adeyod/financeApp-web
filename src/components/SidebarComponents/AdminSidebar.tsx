import { MdAccountBalanceWallet } from 'react-icons/md';
import { SidebarComponentProps } from '../../constants/types';
import AdminDropDownMenu from '../admin/AdminDropDownMenu';
import { useState } from 'react';

const AdminSidebar = ({
  toggle,
  handleAdminMenuToggle,
  adminMenuOpen,
  handleCloseToggle,
}: SidebarComponentProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    setDropDownOpen(!dropDownOpen);
    console.log('DROP DOWN TOGGLED:', !dropDownOpen);
  };

  return (
    <div
      className={[adminMenuOpen ? 'mb-[1px]' : 'mb-[10px]', 'ml-5 '].join(' ')}
    >
      <button onClick={handleAdminMenuToggle}>
        <span className={toggle ? 'flex' : 'hidden'}>
          {' '}
          <MdAccountBalanceWallet className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'flex', 'font-bold italic'].join(' ')}
        >
          ADMIN
        </span>
      </button>
      {adminMenuOpen && (
        <AdminDropDownMenu
          handleDropDownToggle={handleDropDownToggle}
          dropDownOpen={dropDownOpen}
          toggle={toggle}
          handleCloseToggle={handleCloseToggle}
        />
      )}
    </div>
  );
};

export default AdminSidebar;
