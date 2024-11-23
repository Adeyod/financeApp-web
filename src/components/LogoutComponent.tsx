import { toast } from 'react-toastify';
import { clearUser, loginFailure, loginStart } from '../redux/userSlice';
import axios from 'axios';
import { clearSuperAdmin } from '../redux/superAdminSlice';
import { clearAdmin } from '../redux/adminSlice';
import { clearNotifications } from '../redux/notificationSlice';
import { clearTransactions } from '../redux/transactionSlice';
import { clearAccounts } from '../redux/accountSlice';
import { logoutRoute } from '../hooks/ApiRoutes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(loginStart());
    try {
      const { data } = await axios.get(logoutRoute);
      if (data) {
        dispatch(clearUser());
        dispatch(clearAccounts());
        dispatch(clearTransactions());
        dispatch(clearNotifications());
        dispatch(clearAdmin());
        dispatch(clearSuperAdmin());

        toast.success(data.message);
        navigate('/login');
      }
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
  return handleLogout;
};

export default LogoutComponent;
