import { Navigate, Outlet } from 'react-router-dom';
import { AuthAction } from '../../../CustomStateManage/OrgUnits/AuthState';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = AuthAction.getState('solar');

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/redirect" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
