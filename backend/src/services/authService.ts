import User, {IUser} from '../models/User'
import bcrypt from 'bcryptjs';
import jwt = require('jsonwebtoken');
import { RegisterData, LoginData, AuthPayload, RegisterResponse, LoginResponse}  from "../types/authTypes";

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    const { username, email, password } = data;
    const emailForm = data.email.trim().toLowerCase();
    const existing = await User.findOne({ email: emailForm });
    if (existing) throw new Error ("User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({username, email: emailForm, password: hashedPassword});
    await newUser.save();

    const payload: AuthPayload = {
        userId: String(newUser._id),
        email: newUser.email,
        isAdmin: newUser.isAdmin,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1d"});

    return {message: "Successfully registered!", user: payload, token}
};

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    const { email, password } = data;

    const user = (await User.findOne({ email }));
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const payload: AuthPayload = {
        userId: String(user._id),
        email: user.email,
        isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d"});

    return {message: "Successfully login!", user: payload, token}

}