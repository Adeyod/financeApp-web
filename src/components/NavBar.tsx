import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { checkTokenExpiration } from '../hooks/authChecker';
import axios from 'axios';
import { logoutRoute } from '../hooks/ApiRoutes';
import { loginFailure, loginStart, logoutSuccess } from '../redux/userSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [fixed, setFixed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, access } = useSelector((state: any) => state.user);

  const handleFixed = () => {
    if (window.scrollY > 10) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const handleLogout = async () => {
    dispatch(loginStart());
    try {
      const { data } = await axios.get(logoutRoute);
      if (data) {
        dispatch(logoutSuccess());
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error: any) {
      console.error(error.message);
      dispatch(loginFailure(error));
    }
  };

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
              <div className="gap-4 flex">
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
                'bg-primary absolute md:hidden h-full top-[70px] w-[30vw] pl-10  pb-10 items-start right-0 text-xl',
              ].join(' ')}
            >
              {currentUser && currentUser !== null ? (
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Link to="/profile" className="">
                    Profile
                  </Link>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Link to="/login" className="">
                    Login
                  </Link>
                  <Link to="/register" className="">
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
