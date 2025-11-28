import {Route, Routes} from "react-router-dom";
// import Login from "./components/pages/Login.tsx";
// import {Register} from "./components/pages/Register.tsx";
import EventList from "./components/pages/EventList.tsx";
import CreateEvent from "./components/pages/CreateEvent.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import {Navigate} from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage.tsx";

export default function App() {
    return (
        <Routes>
            {/* Public */}
            {/*<Route path="/login" element={< Login />} />*/}
            {/*<Route path="/register" element={< Register />}/>*/}
            <Route path="/" element={< WelcomePage />} />

            {/* Protected */}
            <Route element={ <ProtectedRoute />}>
                <Route path="/events" element={<EventList/>} />
                <Route path="events/new" element={<CreateEvent/>} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}