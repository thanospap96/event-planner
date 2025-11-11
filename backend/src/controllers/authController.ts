import { Request, Response } from "express";
import * as authService from "../services/authService"
import {RegisterData, LoginData} from "../types/authTypes";

export const register = async (req: Request<{}, {}, RegisterData>, res: Response) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json(result);
    }catch(err: any) {
        res.status(400).json({message: err.message});
    }
}

export const login = async (req: Request<{}, {}, LoginData>, res: Response) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).json(result);
    } catch(err: any) {
        res.status(400).json({message: "User not found" });
    }

};