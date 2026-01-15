import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {createEvent} from "../../services/events.ts";
import type {CreateEventData} from "../../lib/types.ts";
import toast from "react-hot-toast";

export default function CreateEvent() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateEventData>({
        defaultValues: {}
    });
    const navigate = useNavigate();

    const onSubmit = async (values: CreateEventData) => {
        try {
            await createEvent(values);
            toast.success("Event created successfully!");
            navigate("/events");
        } catch (err: any) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to create event");
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate("/events")}
                    className="mb-6 text-gray-600 hover:text-gray-700 flex items-center gap-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Events
                </button>

                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
                        <p className="text-gray-600">Fill in the details below to create your event</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Event Title <span>*</span>
                            </label>
                            <input
                                id="title"
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
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                Date & Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="date"
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
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                id="location"
                                placeholder="Enter event location"
                                {...register("location")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Enter event description"
                                rows={5}
                                {...register("description")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                                Capacity
                            </label>
                            <input
                                id="capacity"
                                type="number"
                                placeholder="Enter maximum attendees (optional)"
                                min="1"
                                {...register("capacity", { valueAsNumber: true })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/events")}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium shadow-md"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}