import { createContext, type ReactNode, useRef, useState } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Services";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
    isLogout: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        dataNascimento: '',
        foto: '',
        peso: 0,
        altura: 0,
        imc: 0,
        token: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    
    const isLogout = useRef(false);

    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
            isLogout.current = false; 
        } catch (error) {
            ToastAlerta("Dados do Usuário inconsistentes!", "erro");
        }
        
        setIsLoading(false);
    }

    function handleLogout() {
        isLogout.current = true;
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            dataNascimento: '',
            foto: '',
            peso: 0,
            altura: 0,
            imc: 0,
            token: '',
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading, isLogout: isLogout.current }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;