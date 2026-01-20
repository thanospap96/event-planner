import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import EventList from "./components/pages/EventList";
import CreateEvent from "./components/pages/CreateEvent";
import EventDetail from "./components/pages/EventDetail";
import ProtectedRoute from "./routes/ProtectedRoute";
import WelcomePage from "./components/pages/WelcomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/layout/Footer";
import { SearchProvider } from "./context/SearchContext";

export default function App() {
    return (
        <SearchProvider>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        element={
                            <>
                                <NavBar />
                                <Outlet />
                                <Footer />
                            </>
                        }
                    >
                        <Route path="/events" element={<EventList />} />
                        <Route path="/events/new" element={<CreateEvent />} />
                        <Route path="/events/:id" element={<EventDetail />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SearchProvider>
    );
}