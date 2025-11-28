export type AuthPayload = {
    userId: string;
    email: string;
    isAdmin: boolean;
    username?: string; // na tsekarw ksana
};

export type LoginResponse = {
    message: string;
    user: AuthPayload;
    token: string;
};

export type RegisterResponse = LoginResponse;

export type UserResponse = {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
};

export type CreateEventData = {
    title: string;
    description?: string;
    date: string;       // ISO string
    location?: string;
    capacity?: number;
};

export type EventResponse = {
    id: string;
    title: string;
    description?: string;
    date: string;         // ISO
    location?: string;
    createdBy: string;
    attendeesCount: number;
    isAttending?: boolean;
};

// export type PaginatedEvents = {
//     items: EventResponse[];
//     total: number;
//     page: number;
//     limit: number;
// };