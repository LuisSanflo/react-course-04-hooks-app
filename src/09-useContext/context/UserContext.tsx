import { createContext, useEffect, useState, type PropsWithChildren } from "react"
import { users, type User } from "../data/user-mock.data";

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type AuthUser = User | null;

interface UserContextProps {
    authStatus: AuthStatus;
    isAuthenticated: boolean;
    user: AuthUser;
    login: (userId: number) => boolean;
    logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<AuthUser>(null);

    const handleLogin = (userId: number) => {
        const userFound = users.find(userRow => userRow.id === userId);

        if (!userFound) {
            console.log(`User not found ${userId}`);
            setUser(null);
            setAuthStatus('not-authenticated');
            return false;
        }

        setUser(userFound);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        return true;
    }

    const handleLogout = () => {
        setAuthStatus('not-authenticated');
        setUser(null);
        localStorage.removeItem('userId');
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            handleLogin(+storedUserId);
            return;
        }

        handleLogout();
    }, [])

    return <UserContext value={{
        authStatus: authStatus,
        isAuthenticated: authStatus === 'authenticated',
        user: user,
        login: handleLogin,
        logout: handleLogout,
    }}> {children}</UserContext >
}
