export interface EventResponse {
    id: string;
    title: string;
    description?: string;
    date: String;
    location?: string;
    capacity?: number;
    createdBy: string;
    attendees: string[];
}

export interface CreateEventData {
    title: string;
    description?: string;
    date: string;
    location?: string;
    capacity?: number;

}

export interface UpdateEventData {
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    capacity?: number;
}