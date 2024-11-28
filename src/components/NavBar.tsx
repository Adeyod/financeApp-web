import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration } from '../hooks/authChecker';
import axios from 'axios';
import { loginFailure } from '../redux/userSlice';
import { toast } from 'react-toastify';

import { NotificationState, UserState } from '../constants/types';
import { getNotifications } from '../hooks/ApiCalls';
import { getNotificationsSuccess } from '../redux/notificationSlice';
import GeneralSidebar from './SidebarComponents/GeneralSidebar';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import SuperAdminSidebar from './SidebarComponents/SuperAdminSidebar';
import LogoutComponent from './LogoutComponent';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleDropDown] = useState(false);
  const [generalMenuOpen, setGeneralMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [superAdminMenuOpen, setSuperAdminMenuOpen] = useState(false);
  const [fixed, setFixed] = useState(false);

  const handleGeneralMenuToggle = () => {
    setGeneralMenuOpen(!generalMenuOpen);
  };

  const handleAdminMenuToggle = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };
  const handleSuperAdminMenuToggle = () => {
    setSuperAdminMenuOpen(!superAdminMenuOpen);
  };

  const dispatch = useDispatch();

  const { currentUser, access } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const handleLogout = LogoutComponent();
  const { totalIsViewed } = useSelector(
    (state: { notifications: NotificationState }) => state.notifications
  );

  const [searchValue] = useState('');
  const [page] = useState(1);
  const limit = '10';

  const handleFixed = () => {
    if (window.scrollY > 10) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const getAllNotifications = async (searchValue: string) => {
    try {
      const response = await getNotifications(
        page.toString(),
        limit,
        searchValue
      );
      dispatch(getNotificationsSuccess(response?.notifications));
      return;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(loginFailure(error));
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    }
  };

  useEffect(() => {
    if (currentUser && access) {
      getAllNotifications(searchValue);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleFixed);
    return () => {
      window.removeEventListener('scroll', handleFixed);
    };
  }, []);

  useEffect(() => {
    if (currentUser && access) {
      checkTokenExpiration(access, dispatch);
    }
  }, [currentUser, access, dispatch]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleCloseToggle = () => {
    setToggle(false);
  };
  return (
    <div className="">
      <div
        className={[
          fixed
            ? 'fixed left-0 right-0 top-0 z-10 transition-all duration-[2000ms] ease-in-out'
            : '',
          'p-4 h-[70px] bg-primary flex justify-between text-white font-bold',
        ].join(' ')}
      >
        <div className="cursor-pointer flex items-center">
          <img src="../../color-logo.png" alt="" />
          <Link to="/" className="ml-[-60px] italic text-xl">
            FundFlow
          </Link>
        </div>

        <div className="">
          <div className="hidden md:flex gap-3 text-xl">
            {currentUser && currentUser !== null ? (
              <div className="gap-3 items-center flex">
                <div className="relative">
                  <p className="absolute rounded-full px-2 bg-red-600 font-bold text-xl top-[-15px]">
                    {totalIsViewed > 0 && totalIsViewed}
                  </p>
                  <Link to="/notifications">
                    <IoNotifications className="text-3xl" />
                  </Link>
                </div>
                <Link to="/profile">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      currentUser?.profile_image?.url
                        ? currentUser?.profile_image?.url
                        : '../../public/placeholderImage2.jpg'
                    }
                    alt=""
                  />
                </Link>

                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">Log In</Link>
                <Link to="register">Register</Link>
              </div>
            )}
          </div>

          <div className="">
            <button className="md:hidden" onClick={handleToggle}>
              {toggle ? (
                <IoMdClose className="text-4xl" />
              ) : (
                <IoMdMenu className="text-4xl" />
              )}
            </button>
            <div
              className={[
                toggle
                  ? 'fade-enter fade-enter-active'
                  : 'hidden fade-exit fade-exit-active',
                'bg-secondary text-black overflow-y-visible z-[9999] absolute md:hidden h-screen top-[70px] w-[30vw] pl-10  pb-10 items-start right-0 text-xl',
              ].join(' ')}
            >
              {currentUser && currentUser !== null ? (
                <div className=" ml-[-50px] text-[12px] flex flex-col items-start gap-1 mt-6">
                  <GeneralSidebar
                    handleGeneralMenuToggle={handleGeneralMenuToggle}
                    generalMenuOpen={generalMenuOpen}
                    toggle={toggleDropDown}
                    handleCloseToggle={handleCloseToggle}
                  />

                  {(currentUser?.role === 'admin' ||
                    currentUser?.role === 'super_admin') && (
                    <AdminSidebar
                      toggle={toggleDropDown}
                      handleAdminMenuToggle={handleAdminMenuToggle}
                      adminMenuOpen={adminMenuOpen}
                      handleCloseToggle={handleCloseToggle}
                    />
                  )}

                  {currentUser?.role === 'super_admin' && (
                    <SuperAdminSidebar
                      toggle={toggleDropDown}
                      handleSuperAdminMenuToggle={handleSuperAdminMenuToggle}
                      superAdminMenuOpen={superAdminMenuOpen}
                      handleCloseToggle={handleCloseToggle}
                    />
                  )}

                  <button
                    className="text-red-600 mb-32 ml-7 mt-5 text-[12px] smm:text-[15px] mng:text-[18px]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Link onClick={handleCloseToggle} to="/login" className="">
                    Login
                  </Link>
                  <Link onClick={handleCloseToggle} to="/register" className="">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
