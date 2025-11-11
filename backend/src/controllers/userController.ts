import {Response} from "express";
import {AuthRequest} from "../types/authTypes";
import * as userService from "../services/userService";
import { UserResponse} from "../types/userTypes";

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const users: UserResponse[] = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error : any) {
        res.status(500).json({message: error.message});
    }
};

export const getUserByUsername = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const  username  = req.params.username;
        const user = await userService.findOneByUsername(username);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserByEmail = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const email = String(req.query.email || "").trim().toLowerCase();
        const user = await userService.findOneByEmail(email);
        if (!user) {
            res.status(404).json({message: "User not found"});
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const ok = await userService.deleteById(id);
        if (!ok) { res.status(404).json({ message: "User not found" }); return; }
        res.status(200).json( {message: "User deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};