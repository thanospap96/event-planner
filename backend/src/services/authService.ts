import User from '../models/User'
import bcrypt from 'bcryptjs';
import jwt = require('jsonwebtoken');
import { RegisterData, LoginData, AuthPayload, RegisterResponse, LoginResponse}  from "../types/authTypes";

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
    const { username, email, password } = data;
    const emailForm = data.email.trim().toLowerCase();

    const existingEmail = await User.findOne({ email: emailForm });
    if (existingEmail) throw new Error ("Email already exists");

    const existingUsername= await User.findOne({ username })
    if (existingUsername) throw new Error ("Username already in use")


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

    const emailForm = email.trim().toLowerCase();
    const user = await User.findOne({ email: emailForm });
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