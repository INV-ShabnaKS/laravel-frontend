import { Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';

function authHoc(WrappedComponent) {
  return function ProtectedComponent(props) {
    const {auth}=useAuth();
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    return <WrappedComponent {...props} />;
  };
}

export default authHoc;
