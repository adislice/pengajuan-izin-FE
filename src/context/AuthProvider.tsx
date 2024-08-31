import { LoginFormData } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
    name: string,
    email: string,
    level: number
}

interface AuthContextType {
    user: User | null,
    access_token: string,
    isLoading: boolean,
    login: (data: LoginFormData, level: number) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>('');
    const [loading, setLoading] = useState(false);

    async function login(data: LoginFormData, level: number) {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser({...data, level, name:'adi'});
        setLoading(false);
        return;
        
    }

    return (
        <AuthContext.Provider value={{ user, access_token: token, login, isLoading: loading }}>
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