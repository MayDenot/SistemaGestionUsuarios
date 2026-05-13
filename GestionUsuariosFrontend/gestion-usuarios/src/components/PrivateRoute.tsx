import { Navigate } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.ts";
import type {JSX} from "react";

interface Props {
    children: JSX.Element
}

const PrivateRoute = ({ children }: Props) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to={"/login"} replace />
    }

    return children;
}

export default PrivateRoute;