import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {createEvent} from "../../services/events.ts";
import type {CreateEventData} from "../../lib/types.ts";

export default function CreateEvent() {
    const { register, handleSubmit } = useForm<CreateEventData>({
        defaultValues :{
        }
    });
    const navigate = useNavigate();

    const onSubmit = async (values: CreateEventData) => {
        try {
            await createEvent(values)
            navigate("/events");
        } catch (err) {
            console.error(err);
            alert("Event not created")// UI gia error na ftiaksw
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Title" {...register("title")} />
                <input type="datetime-local" {...register("date")} />
                <input placeholder="Location" {...register("location")} />
                {/*<label>*/}
                {/*    <input type="checkbox" {...register("isPublic")} />*/}
                {/*    Public event*/}
                {/*</label>*/}
                <textarea placeholder="Description" {...register("description")} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}