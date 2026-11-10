import type React from "react";
import { use } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
    element: React.ReactNode;
}

export const PrivateRoute = ({ element }: Props) => {
    const { authStatus } = use(UserContext);

    if (authStatus === 'checking') {
        return null;
    }

    if (authStatus === 'authenticated') {
        return element;
    }

    return <Navigate to={'/login'} replace />
}
