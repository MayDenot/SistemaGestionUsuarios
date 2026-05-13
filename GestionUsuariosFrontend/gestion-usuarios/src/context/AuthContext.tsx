import type {User} from "../types";
import {createContext, type ReactNode, useEffect, useState} from "react";

interface AuthContextType {
    user : User | null
    token: string | null
    login: (token: string, refreshToken: string, user: User) => void
    logout: () => void
}

// Crea el contexto vacio
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// El provider envuelve toda la app y provee el estado
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
      <AuthContext.Provider value={{user, token, login, logout}}>
          {children}
      </AuthContext.Provider>
    );
}