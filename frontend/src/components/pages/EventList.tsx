import { useEffect, useState, useMemo } from "react";
import {listEvents} from "../../services/events.ts";
import type { EventResponse } from "../../lib/types";
import EventCard from "../ui/eventCard";
import { useSearch } from "../../context/SearchContext";

export default function EventList() {
    const [events, setEvents] = useState<EventResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm } = useSearch();

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

    const filteredEvents = useMemo(() => {
        if (!searchTerm.trim()) return events;
        
        const term = searchTerm.toLowerCase();
        return events.filter(event => 
            event.title.toLowerCase().includes(term) ||
            event.description?.toLowerCase().includes(term) ||
            event.location?.toLowerCase().includes(term)
        );
    }, [events, searchTerm]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-gray-600 text-lg">Loading events...</div>
        </div>
    );

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-lg text-gray-600 mb-2">
                            {searchTerm ? 'No events match your search' : 'No events found'}
                        </p>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try a different search term' : 'Create your first event to get started!'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((ev) => (
                            <EventCard key={ev.id} event={ev} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}