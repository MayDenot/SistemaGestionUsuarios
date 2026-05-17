import type {User} from "../types";
import {createContext, type ReactNode, useEffect, useState} from "react";

interface AuthContextType {
    user : User | null,
    token: string | null,
    updateUser: (user: User) => void,
    login: (token: string, refreshToken: string, user: User) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("accessToken");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const login = (accessToken: string, refreshToken: string, user: User) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(accessToken);
        setUser(user);
    }

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
    }

    return (
      <AuthContext.Provider value={{user, token, updateUser, login, logout}}>
          {children}
      </AuthContext.Provider>
    );
}