import { jwtDecode, JwtPayload } from 'jwt-decode';
import { clearUser } from '../redux/userSlice';
import { clearAccounts } from '../redux/accountSlice';
import { clearTransactions } from '../redux/transactionSlice';
import { clearNotifications } from '../redux/notificationSlice';
import { clearAdmin } from '../redux/adminSlice';
import { clearSuperAdmin } from '../redux/superAdminSlice';

export const checkTokenExpiration = (access: string, dispatch: any) => {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(access);

  if (decoded.exp) {
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime < currentTime) {
      dispatch(clearUser());
      dispatch(clearAccounts());
      dispatch(clearTransactions());
      dispatch(clearNotifications());
      dispatch(clearAdmin());
      dispatch(clearSuperAdmin());
    }
  }
};
