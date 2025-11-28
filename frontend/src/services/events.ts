import api from "..//lib/api";
import type { CreateEventData, EventResponse,} from "../lib/types";

export const listEvents = async () => {
    const { data } = await api.get<EventResponse[]>("/events");
    return data;
};


export const getEvent = async (id: string) => {
    const { data } = await api.get<EventResponse>(`/events/${id}`);
    return data;
};

export const createEvent = async (payload: CreateEventData) => {
    const { data } = await api.post<EventResponse>("/events", payload);
    return data;
};

export const updateEvent = async (id: string, payload: Partial<CreateEventData>) => {
    const { data } = await api.put<EventResponse>(`/events/${id}`, payload);
    return data;
};

export const deleteEvent = async (id: string) => {
    await api.delete(`/events/${id}`);
};

export const joinEvent = async (id: string) => {
    const { data } = await api.post<EventResponse>(`/events/${id}/join`, {});
    return data;
};

export const leaveEvent = async (id: string) => {
    const { data } = await api.post<EventResponse>(`/events/${id}/leave`, {});
    return data;
};