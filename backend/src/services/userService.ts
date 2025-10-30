import User from "../models/User";
import {UserResponse} from "../types/userTypes";

export const findAllUsers = async (): Promise<UserResponse[]> => {
    const users = await User.find().lean();
    return users.map(user => ({
      id: String(user._id),
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    }));
}

export const findOneByUsername = async (username: string): Promise<UserResponse | null> => {
    const user = await User.findOne({ username }).lean();
    if (!user) return null;

    return {
        id: String(user._id),
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    };
};

export const findOneByEmail = async (email: string): Promise<UserResponse | null> => {
    const user = await User.findOne({ email }).lean();
    if (!user) return null;

    return {
        id:String(user._id),
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    };
};