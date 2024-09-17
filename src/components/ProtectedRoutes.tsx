import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <div>
      {currentUser && currentUser !== null ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ProtectedRoutes;
