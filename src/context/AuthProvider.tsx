import { LoginFormData, User } from "@/types";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthStatus = 'authenticated' | 'configuring' | 'unauthenticated';

interface AuthContextType {
    user: User | null,
    login: (data: LoginFormData) => Promise<User>,
    logout: () => Promise<void>,
    authStatus: AuthStatus
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authStatus, setAuthStatus] = useState<AuthStatus>('configuring');

    async function login(data: LoginFormData) {
        try {
            const response = await axios.post('/auth/login', data);
            setUser(response.data.user);
            const access_token = response.data.access_token as string;
            localStorage.setItem('token', access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setAuthStatus('authenticated');
            return response.data.user as User;
        } catch (error) {
            throw error;
        }
    }

    async function logout() {
        try {
            setAuthStatus('configuring');
            await axios.post('/auth/logout');
            localStorage.removeItem('token');
            setUser(null);
            setAuthStatus('unauthenticated');
            axios.defaults.headers.common['Authorization'] = null;
        } catch (error) {}
    }

    function checkUser() {
        setAuthStatus('configuring')
        axios.post('auth/user').then((res) => {
            setUser(res.data as User)
            setAuthStatus('authenticated');
        }).catch(e => {
            console.error(e)
            setAuthStatus('unauthenticated');
        })
        .finally(() => {
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkUser();
        } else {
            setAuthStatus('unauthenticated');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, authStatus}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context == null) {
        throw new Error("AuthContext was used outside of AuthProvider or unavailable");
    }
    return context;
}