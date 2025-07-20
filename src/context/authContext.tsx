import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
