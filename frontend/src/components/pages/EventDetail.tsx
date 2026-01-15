import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent, joinEvent, leaveEvent, deleteEvent, updateEvent } from "../../services/events.ts";
import type { EventResponse, CreateEventData } from "../../lib/types";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

export default function EventDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState<EventResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateEventData>();

    useEffect(() => {
        const loadEvent = async () => {
            if (!id) return;
            try {
                const data = await getEvent(id);
                setEvent({ ...data, isAttending: data.isAttending ?? false });
                // Pre-populate form with event data
                const eventDate = new Date(data.date);
                const localDateTime = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 16);
                reset({
                    title: data.title,
                    description: data.description || "",
                    date: localDateTime,
                    location: data.location || "",
                });
            } catch (err: any) {
                toast.error("Failed to load event");
                navigate("/events");
            } finally {
                setLoading(false);
            }
        };
        loadEvent();
    }, [id, navigate, reset]);

    const handleAttend = async () => {
        if (!id || !event) return;
        setIsJoining(true);
        try {
            if (event.isAttending) {
                await leaveEvent(id);
                setEvent({ ...event, isAttending: false, attendeesCount: event.attendeesCount - 1 });
                toast.success("You left the event");
            } else {
                const updated = await joinEvent(id);
                setEvent(updated);
                toast.success("You joined the event!");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update attendance");
        } finally {
            setIsJoining(false);
        }
    };

    const handleDelete = async () => {
        if (!id || !event) return;
        
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteEvent(id);
            toast.success('Event deleted successfully');
            navigate('/events');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Failed to delete event');
        } finally {
            setIsDeleting(false);
        }
    };

    const canEdit = user && event && (user.isAdmin || user.userId === event.createdBy);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
    };

    const onUpdateSubmit = async (values: CreateEventData) => {
        if (!id) return;
        setIsUpdating(true);
        try {
            const updated = await updateEvent(id, values);
            setEvent({ ...updated, isAttending: event?.isAttending ?? false });
            toast.success("Event updated successfully!");
            setIsEditing(false);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update event");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-gray-600 text-lg">Loading event...</div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">Event not found</p>
                    <button
                        onClick={() => navigate("/events")}
                        className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen #ba5fef py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                    <button
                    onClick={() => navigate("/events")}
                    className="mb-6 text-gray-600 hover:text-gray-700 flex items-center gap-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Events
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-12 text-white relative">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                                {event.description && (
                                    <p className="text-purple-100 text-lg">{event.description}</p>
                                )}
                            </div>
                            {canEdit && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleEdit}
                                        className="flex-shrink-0 p-2 text-white hover:bg-white/20 rounded-md transition-colors"
                                        aria-label="Edit event"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-shrink-0 p-2 text-white hover:bg-white/20 rounded-md transition-colors disabled:opacity-50"
                                        aria-label="Delete event"
                                    >
                                        {isDeleting ? (
                                            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {event.date && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Date & Time</h3>
                                        <p className="text-gray-900 text-lg">{format(new Date(event.date), "PPP 'at' p")}</p>
                                    </div>
                                </div>
                            )}

                            {event.location && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</h3>
                                        <p className="text-gray-900 text-lg">{event.location}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Organizer</h3>
                                        <p className="text-gray-900 text-lg">{event.createdBy.username}</p>
                                    </div>
                                </div> */}

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Attendees</h3>
                                    <p className="text-gray-900 text-lg">{event.attendeesCount || 0} {event.attendeesCount === 1 ? 'person' : 'people'}</p>
                                </div>
                            </div>
                        </div>

                    

                        <div className="pt-6 border-t border-gray-200">
                            <button
                                onClick={handleAttend}
                                disabled={isJoining}
                                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                                    event.isAttending
                                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        : "bg-purple-600 text-white hover:bg-purple-700"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isJoining ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </span>
                                ) : event.isAttending ? (
                                    "Not Attending"
                                ) : (
                                    "I'm Attending"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Edit Event</h2>
                                <button
                                    onClick={handleCloseEdit}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Close"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onUpdateSubmit)} className="p-6 space-y-6">
                            <div>
                                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="edit-title"
                                    placeholder="Enter event title"
                                    {...register("title", { required: "Title is required" })}
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.title ? "border-red-300" : "border-gray-300"
                                    }`}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="edit-date"
                                    type="datetime-local"
                                    {...register("date", { required: "Date is required" })}
                                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.date ? "border-red-300" : "border-gray-300"
                                    }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="edit-location" className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    id="edit-location"
                                    placeholder="Enter event location"
                                    {...register("location")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="edit-description"
                                    placeholder="Enter event description"
                                    rows={5}
                                    {...register("description")}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseEdit}
                                    disabled={isUpdating}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdating ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </span>
                                    ) : (
                                        "Update Event"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

