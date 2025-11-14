import { Schema, model, Document, Types} from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location?: string;
    capacity?: number;
    createdBy: Types.ObjectId;
    attendees: Types.ObjectId[];
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date, required: true },
        location: { type: String },
        capacity: { type: Number },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        attendees: [{ type: Schema.Types.ObjectId, ref: "User"}],
    },
        { timestamps: true }
    );

export default model<IEvent>('Event', EventSchema);