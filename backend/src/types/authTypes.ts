import { Request} from "express";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthPayload {
    userId: string;
    email: string;
    isAdmin: boolean;
}

export interface RegisterResponse {
    message: string;
    user: AuthPayload;
    token: string;
}

export interface LoginResponse {
    message: string;
    user: AuthPayload;
    token: string;
}

export interface AuthRequest extends Request {
    user?: AuthPayload;
}