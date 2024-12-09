import { SidebarComponentProps } from '../../constants/types';
import { useState } from 'react';
import { MdAccountBalanceWallet } from 'react-icons/md';
import SuperAdminDropDownMenu from '../admin/SuperAdminDropDownMenu';

const SuperAdminSidebar = ({
  toggle,
  superAdminMenuOpen,
  handleSuperAdminMenuToggle,
}: SidebarComponentProps) => {
  const [dropOpen, setDropOpen] = useState(false);

  const handleTheDropDownToggle = () => {
    setDropOpen(!dropOpen);
  };

  return (
    <div className="ml-5 mt-2">
      <button onClick={handleSuperAdminMenuToggle}>
        <span className={toggle ? 'flex' : 'hidden'}>
          {' '}
          <MdAccountBalanceWallet className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'flex', 'font-bold italic'].join(' ')}
        >
          SUPER ADMIN
        </span>
      </button>
      {superAdminMenuOpen && (
        <SuperAdminDropDownMenu
          handleTheDropDownToggle={handleTheDropDownToggle}
          dropOpen={dropOpen}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default SuperAdminSidebar;
