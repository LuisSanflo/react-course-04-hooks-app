import type React from "react";
import { use } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
    element: React.ReactNode;
}

export const PrivateRoute = ({ element }: Props) => {
    const { isAuthenticated, isChecking } = use(UserContext);

    if (isChecking) {
        return null;
    }

    if (isAuthenticated) {
        return element;
    }

    return <Navigate to={'/login'} replace />
}
