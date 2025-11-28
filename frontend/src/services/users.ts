import api from "../lib/api.ts";
import type { UserResponse } from "../lib/types";

export const listUsers = async() => {
    const { data } = await api.get<UserResponse[]>("/users");
    return data;
};

export const getByUsername = async (username: string) => {
    const { data } = await api.get<UserResponse>(`/users/${encodeURIComponent(username)}`);
    return data;
};

export const getByEmail = async (email: string) => {
    const { data } = await api.get<UserResponse>("/users/by-email", { params: { email } });
    return data;
};

export const deleteUser = async (id: string) => {
    await api.delete(`/users/${id}`);
};
