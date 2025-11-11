import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
    {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, index: true, trim: true, lowercase: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},

    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);