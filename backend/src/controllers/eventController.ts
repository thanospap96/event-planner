import { Response } from 'express';
import { AuthRequest} from "../types/authTypes";
import { EventRequest} from "../middleware/eventOwnership";
import * as eventService from "../services/eventService";
import { CreateEventData, UpdateEventData} from "../types/eventTypes";

export const getEvents = async (req: AuthRequest, res: Response) => {
    try {
        const events = await eventService.listEvents();
        res.status(200).json(events);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getEventById = async (req: AuthRequest, res: Response) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        if(!event) return res.status(404).json({message: "Event not found"});
        res.status(200).json(event);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
    try {
        const data = req.body as CreateEventData;
        const userId = req.user!.userId
        const event = await eventService.createEvent(data, userId);
        res.status(201).json(event);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const updateEvent = async (req: EventRequest, res: Response) => {
    try {
        const data = req.body as UpdateEventData;
        const event = await eventService.updateEventById(req.params.id, data);
        if (!event) return res.status(404).json({message: "Event not found"});
        res.status(200).json(event);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteEvent = async (req: EventRequest, res: Response) => {
    try {
        const ok = await eventService.deleteEventById(req.params.id);
        if (!ok) return res.status(404).json({message: "Event not found"});
        res.status(200).json(ok);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const joinEvent = async (req: AuthRequest, res: Response) => {
    try {
        const event = await eventService.joinEvent(req.params.id, req.user!.userId);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const leaveEvent = async (req: AuthRequest, res: Response) => {
    try {
        const event = await eventService.leaveEvent(req.params.id, req.user!.userId);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
