import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { UserState } from '../constants/types';

type ProtectedRoutesProps = {
  children?: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  if (!currentUser || currentUser === null) {
    return <Navigate to="/login" />;
  }
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoutes;
