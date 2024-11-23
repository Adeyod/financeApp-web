import { SidebarComponentProps } from '../../constants/types';
import AllAdminDropDownMenu from './AllAdminDropDownMenu';

const SuperAdminDropDownMenu = ({
  handleTheDropDownToggle,
  dropOpen,
  toggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col items-start ml-[-10px] mr-5 mt-3 gap-3 font-bold">
      {/* ADMINS SECTION */}
      <button onClick={handleTheDropDownToggle}>
        {toggle ? <span></span> : <span>Admins</span>}
      </button>
      {dropOpen && <AllAdminDropDownMenu toggle={toggle} />}
    </div>
  );
};

export default SuperAdminDropDownMenu;
