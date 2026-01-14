import type { EventResponse } from "../../lib/types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { deleteEvent } from "../../services/events";
import toast from "react-hot-toast";

interface EventCardProps {
    event: EventResponse;
}

export default function EventCard({ event }: EventCardProps) {
    const { user } = useAuth();
    
    const canDelete = user && (user.isAdmin || user.userId === event.createdBy);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            return;
        }

        try {
            await deleteEvent(event.id);
            toast.success('Event deleted successfully');
            window.location.reload();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to delete event');
        }
    };

    return (
      <div className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 h-full">
        <Link
          to={`/events/${event.id}`}
          className="block p-6 h-full"
        >
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors flex-1">
                {event.title}
              </h3>
              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="flex-shrink-0 p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  aria-label="Delete event"
                >
                  <svg
                    className="w-5 h-5"
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
                </button>
              )}
            </div>
    
            {event.description && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {event.description}
              </p>
            )}
    
            <div className="flex flex-col gap-2 text-sm text-gray-700 mt-auto">
              {event.date && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{format(new Date(event.date), "PPP 'at' p")}</span>
                </div>
              )}
    
              {event.location && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{event.location}</span>
                </div>
              )}
    
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>
                  {event.attendeesCount || 0}{" "}
                  {event.attendeesCount === 1 ? "attendee" : "attendees"}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
