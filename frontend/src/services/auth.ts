import api from "../lib/api.ts"
import  type { LoginResponse, RegisterResponse} from "../lib/types.ts";

export const login = async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>("/auth/login", {email, password});
    return data;
}

export const register = async (username: string, email: string, password: string) => {
    const { data } = await api.post<RegisterResponse>("/auth/register", {username ,email, password});
    return data;
}