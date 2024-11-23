import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { UserState } from '../constants/types';
import { useState } from 'react';
import GeneralSidebar from './SidebarComponents/GeneralSidebar';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import SuperAdminSidebar from './SidebarComponents/SuperAdminSidebar';
import LogoutComponent from './LogoutComponent';

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [generalMenuOpen, setGeneralMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [superAdminMenuOpen, setSuperAdminMenuOpen] = useState(false);

  const handleLogout = LogoutComponent();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  if (currentUser?.role === 'admin') {
    console.log(currentUser?.role);
  } else {
    console.log('this is not true');
  }

  const handleSuperAdminMenuToggle = () => {
    setSuperAdminMenuOpen(!superAdminMenuOpen);
  };

  const handleGeneralMenuToggle = () => {
    setGeneralMenuOpen(!generalMenuOpen);
  };

  const handleAdminMenuToggle = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="">
      <div
        className={[
          toggle ? 'w-10' : 'min-w-[180px]',
          ' bg-secondary h-full relative bottom-0 mb-32 transition-all duration-300 hidden md:flex overflow-y-auto',
        ].join(' ')}
      >
        <div className="absolute right-3 top-3" onClick={handleToggle}>
          {toggle ? (
            <IoMdClose className="text-2xl " />
          ) : (
            <IoMdMenu className="text-2xl" />
          )}
        </div>

        <div className="mt-10">
          {currentUser && (
            <GeneralSidebar
              handleGeneralMenuToggle={handleGeneralMenuToggle}
              generalMenuOpen={generalMenuOpen}
              toggle={toggle}
            />
          )}

          {(currentUser?.role === 'admin' ||
            currentUser?.role === 'super_admin') && (
            <AdminSidebar
              toggle={toggle}
              handleAdminMenuToggle={handleAdminMenuToggle}
              adminMenuOpen={adminMenuOpen}
            />
          )}

          {currentUser?.role === 'super_admin' && (
            <SuperAdminSidebar
              toggle={toggle}
              handleSuperAdminMenuToggle={handleSuperAdminMenuToggle}
              superAdminMenuOpen={superAdminMenuOpen}
            />
          )}

          {currentUser && (
            <button
              className="text-red-800 mt-5 font-bold mb-32 ml-5 text-[12px] smm:text-[15px] mng:text-[18px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
