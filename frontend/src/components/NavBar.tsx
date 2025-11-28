import { Link } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";
export default function NavBar() {
    const {user, logout} = useAuth();

    return (
        <nav style={{ display:"flex", gap:12, padding:12, borderBottom:"1px solid #eee" }}>
            <Link to="/">Events</Link>
            {user ? (
                <>
                    <Link to="/events/create">Create</Link>
                    <span style={{ marginLeft:"auto" }}>{user.email} {user.isAdmin && "(admin)"}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <span style={{ marginLeft:"auto" }}>
          <Link to="/login">Login</Link> · <Link to="/register">Register</Link>
        </span>
            )}
        </nav>
    );
}