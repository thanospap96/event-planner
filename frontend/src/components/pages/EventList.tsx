import { useEffect, useState } from "react";
import {listEvents} from "../../services/events.ts";
import type { EventResponse } from "../lib/types";
import { Link } from "react-router-dom";

export default function EventList() {
    const [events, setEvents] = useState<EventResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await listEvents();
                setEvents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Loading events...</div>;

    return (
        <div>
            <h1>Events</h1>
            <Link to="/events/new">Create event</Link>
            <ul>
                {events.map((ev) => (
                    <li key={ev.id}>
                        <strong>{ev.title}</strong>{" "}
                        {ev.date && <>– {new Date(ev.date).toLocaleString()}</>}
                        {ev.location && <> @ {ev.location}</>}
                    </li>
                ))}
            </ul>
        </div>
    );
}