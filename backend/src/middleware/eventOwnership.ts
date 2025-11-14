import { NextFunction, Response} from "express";
import { AuthRequest} from "../types/authTypes";
import Event, {IEvent} from "../models/Event";

export interface EventRequest extends AuthRequest {
    event?: IEvent | null;
}

export const loadEvent = async(req: EventRequest, res: Response, next: NextFunction) => {
    try {
        const evt = await Event.findById(req.params.id);
        if(!evt) return res.status(400).json({ message: "Event not found" });
        req.event = evt;
        next();
    } catch(err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const requireOwnerOrAdmin = async(req: EventRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    const evt = req.event;

    if (!user || !evt) {
        return res.status(500).json({ message: "Guard misconfigured" });
    }

    const isOwner = String(evt.createdBy) === user.userId;
    const isAdmin = user.isAdmin;

    if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: "Creator or Admin can perform this action" });
    }
    next();
}