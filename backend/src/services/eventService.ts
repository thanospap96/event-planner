import Event from "../models/Event";
import { CreateEventData, UpdateEventData, EventResponse } from "../types/eventTypes";
import { Types } from "mongoose";

const toResponse = (event: any, userId?: string): EventResponse => {
    const attendees = (event.attendees || []).map((id: Types.ObjectId) => String(id));
    return {
        id: String(event._id),
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString(),
        location: event.location,
        capacity: event.capacity,
        createdBy: String(event.createdBy),
        attendees: attendees,
        attendeesCount: attendees.length,
        isAttending: userId ? attendees.includes(userId) : undefined,
    };
};

export const createEvent = async (
    data: CreateEventData,
    userId: string
): Promise<EventResponse> => {
    const evt = new Event({
        ...data,
        date: new Date(data.date),
        createdBy: userId,
        attendees: [userId],
    });

    await evt.save();
    return toResponse(evt, userId);
};

export const listEvents = async (userId?: string): Promise<EventResponse[]> => {
    const events = await Event.find().lean();
    return events.map((event) => toResponse(event, userId));
};

export const getEventById = async (id: string, userId?: string): Promise<EventResponse | null> => {
    const evt = await Event.findById(id).lean();
    return evt ? toResponse(evt, userId) : null;
};

export const updateEventById = async (
    id: string,
    data: UpdateEventData,
    userId?: string
): Promise<EventResponse | null> => {
    const patch: any = { ...data };
    if (data.date) patch.date = new Date(data.date);

    const evt = await Event.findByIdAndUpdate(id, patch, { new: true }).lean();
    return evt ? toResponse(evt, userId) : null;
};

export const deleteEventById = async (id: string): Promise<boolean> => {
    const result = await Event.findByIdAndDelete(id);
    return !!result;
};


export const joinEvent = async (id: string, userId: string): Promise<EventResponse | null> => {
    const evt = await Event.findById(id);
    if (!evt) return null;

    if (!evt.attendees.some((a) => a.equals(userId))) {
        evt.attendees.push(new Types.ObjectId(userId));
        await evt.save();
    }

    return toResponse(evt, userId);
};

export const leaveEvent = async (id: string, userId: string): Promise<EventResponse | null> => {
    const evt = await Event.findById(id);
    if (!evt) return null;

    evt.attendees = evt.attendees.filter((a) => !a.equals(userId));
    await evt.save();

    return toResponse(evt, userId);
};