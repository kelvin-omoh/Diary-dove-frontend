import { Navigate } from "react-router-dom";
import useCheckToken from './useCheckToken' // Adjust the import path

export const PrivateRoute = ({ element }) => {
    const token = useCheckToken();
    return token ? element : <Navigate to="/login" replace />;
};
