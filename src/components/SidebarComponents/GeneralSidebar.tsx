import { MdAccountBalanceWallet } from 'react-icons/md';
import { SidebarComponentProps } from '../../constants/types';
import GeneralDropDownMenu from '../admin/GeneralDropDownMenu';

const GeneralSidebar = ({
  toggle,
  handleGeneralMenuToggle,
  generalMenuOpen,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div
      className={[generalMenuOpen ? 'mb-[10px]' : 'mb-[5px]', 'ml-5 '].join(
        ' '
      )}
    >
      <button onClick={handleGeneralMenuToggle}>
        <span className={toggle ? 'flex' : 'hidden'}>
          {' '}
          <MdAccountBalanceWallet className="text-xl " />
        </span>
        <span
          className={[toggle ? 'hidden' : 'flex', 'font-bold italic'].join(' ')}
        >
          MY INFO
        </span>
      </button>
      {generalMenuOpen && (
        <GeneralDropDownMenu
          handleCloseToggle={handleCloseToggle}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default GeneralSidebar;
