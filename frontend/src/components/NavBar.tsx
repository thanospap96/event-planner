import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import ProfileIcon from "./ui/ProfileIcon";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const isLoggedIn = !!user;

  return (
    <nav className="w-full border-b border-purple-700 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 py-4">
        
        <div className="flex items-center gap-4">
          <Link
            to="/events"
            className="text-lg font-bold text-purple-700 hover:text-purple-900"
          >
            Events
          </Link>

          
          <div className="relative w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm rounded-full border border-gray-300 bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              to="/events/new"
              className="text-sm font-medium px-3 py-1.5 rounded-md
                         bg-purple-600 text-white hover:bg-purple-700
                         transition-colors"
            >
              Create Event
            </Link>

            <ProfileIcon/>  

            <button
              onClick={logout}
              className="text-sm px-3 py-1.5 rounded-md border border-gray-300
                         text-gray-600 hover:bg-red-500 hover:border-red-500 hover:text-white
                         transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm px-3 py-1.5 rounded-md border border-purple-500
                         text-purple-600 hover:bg-purple-600 hover:text-white
                         transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm px-3 py-1.5 rounded-md bg-purple-600 text-white
                         hover:bg-purple-700 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
