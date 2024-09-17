import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const PublicRoutes = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return (
    <div>
      {currentUser && currentUser !== null ? (
        <Navigate to="/profile" />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default PublicRoutes;
