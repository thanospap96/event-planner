import Event from "../models/Event";
import { CreateEventData, UpdateEventData, EventResponse } from "../types/eventTypes";
import { Types } from "mongoose";

const toResponse = (event: any): EventResponse => ({
    id: String(event._id),
    title: event.title,
    description: event.description,
    date: new Date(event.date).toISOString(),
    location: event.location,
    capacity: event.capacity,
    createdBy: String(event.createdBy),
    attendees: (event.attendees || []).map((id: Types.ObjectId) => String(id)),
});

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
    return toResponse(evt);
};

export const listEvents = async (): Promise<EventResponse[]> => {
    const events = await Event.find().lean();
    return events.map(toResponse);
};

export const getEventById = async (id: string): Promise<EventResponse | null> => {
    const evt = await Event.findById(id).lean();
    return evt ? toResponse(evt) : null;
};

export const updateEventById = async (
    id: string,
    data: UpdateEventData
): Promise<EventResponse | null> => {
    const patch: any = { ...data };
    if (data.date) patch.date = new Date(data.date);

    const evt = await Event.findByIdAndUpdate(id, patch, { new: true }).lean();
    return evt ? toResponse(evt) : null;
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

    return toResponse(evt);
};

export const leaveEvent = async (id: string, userId: string): Promise<EventResponse | null> => {
    const evt = await Event.findById(id);
    if (!evt) return null;

    evt.attendees = evt.attendees.filter((a) => !a.equals(userId));
    await evt.save();

    return toResponse(evt);
};