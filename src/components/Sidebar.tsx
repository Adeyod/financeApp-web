import { useState } from 'react';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { FcPortraitMode } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { UserState } from '../constants/types';

const Sidebar = ({ toggle, setToggle }) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const location = useLocation();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="">
      <div
        className={[
          toggle ? 'w-10' : 'min-w-[180px]',
          ' bg-secondary h-full relative bottom-0 transition-all duration-300 hidden md:flex',
        ].join(' ')}
      >
        <div className="absolute right-3 top-3" onClick={handleToggle}>
          {toggle ? (
            <IoMdClose className="text-2xl " />
          ) : (
            <IoMdMenu className="text-2xl" />
          )}
        </div>

        {currentUser && (
          <div className="flex flex-col items-start mx-5 mt-10 gap-3 font-bold text-white">
            <Link to="/profile">
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl" />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>Profile</span>
            </Link>
            <Link to="/change-password" className="flex flex-col items-center">
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl " />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>
                Change Password
              </span>
            </Link>

            <Link to="/transactions">
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl " />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>Transactions</span>
            </Link>

            <Link to={location.search}>
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl " />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>Transactions</span>
            </Link>

            <Link to="/accounts">
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl " />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>My Accounts</span>
            </Link>

            <Link to="/credit">
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl " />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>
                Credit Account
              </span>
            </Link>

            <Link to="/transfer">
              <span className={toggle ? 'block' : 'hidden'}>
                <FcPortraitMode className="text-xl " />
              </span>
              <span className={toggle ? 'hidden' : 'block'}>
                Transfer funds
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

///////////////////////////////////////////////////
