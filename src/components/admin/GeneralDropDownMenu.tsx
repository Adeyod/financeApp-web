import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../NavLinkComponent';
import { FcPortraitMode } from 'react-icons/fc';
import { CgPassword } from 'react-icons/cg';
import { AiOutlineTransaction } from 'react-icons/ai';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { SidebarComponentProps } from '../../constants/types';
import { GoDotFill } from 'react-icons/go';

const GeneralDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col items-start mr-5 mt-3 gap-3 font-bold">
      <NavLink
        to="/profile"
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
          Profile
        </span>
      </NavLink>

      <NavLink
        to="/change-password"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <CgPassword className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'flex items-center text-[15px]',
          ].join(' ')}
        >
          <GoDotFill />
          Change Password
        </span>
      </NavLink>

      <NavLink
        onClick={handleCloseToggle}
        to="/transactions"
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <AiOutlineTransaction className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'block', 'flex items-center'].join(
            ' '
          )}
        >
          <GoDotFill />
          Transactions
        </span>
      </NavLink>

      <NavLink
        to="/accounts"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <MdAccountBalanceWallet className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'block', 'flex items-center'].join(
            ' '
          )}
        >
          <GoDotFill />
          My Accounts
        </span>
      </NavLink>

      <NavLink
        to="/credit"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FaCreditCard className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'block', 'flex items-center'].join(
            ' '
          )}
        >
          <GoDotFill />
          Credit Account
        </span>
      </NavLink>

      <NavLink
        to="/transfer"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FaMoneyBillTransfer className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'block', 'flex items-center'].join(
            ' '
          )}
        >
          <GoDotFill />
          Transfer funds
        </span>
      </NavLink>
    </div>
  );
};

export default GeneralDropDownMenu;
