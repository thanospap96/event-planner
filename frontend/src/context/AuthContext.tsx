import {createContext, useContext, useEffect, useState} from 'react'
import  type {AuthPayload, LoginResponse} from "../lib/types.ts";
import * as authApi from "../services/auth";
import * as React from "react";

type AuthState = {
    user: AuthPayload | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthPayload | null>(null);
    const [loading, setLoad] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token) setToken(token);
        if (user) setUser(JSON.parse(user));
        setLoad(false);
    }, []);

    const persist = (res: LoginResponse) => {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
    };

    const login = async (email: string, password: string) => {
        const res = await authApi.login(email, password)
        persist(res);
    };

    const register = async (username: string ,email: string, password: string) => {
        const res = await authApi.register(username, email, password)
        persist(res);
    };

    const logout =  () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
