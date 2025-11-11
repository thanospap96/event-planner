import {  Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { AuthRequest, AuthPayload} from "../types/authTypes";

// interface MyPayload extends JwtPayload{
//     uerId: string;
//     email: string;
//     isAdmin: boolean;
// }

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
        if (!decoded.userId || !decoded.email) {
            return res.status(400).json({ message: "Invalid token" });
        }
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    if (!user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
