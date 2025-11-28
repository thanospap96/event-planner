import { Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";

export default function ProtectedRoute() {
    const {token, loading} = useAuth();
    if (loading) return null;
    return token ? <Outlet/> : <Navigate to="/login" replace/>;
};