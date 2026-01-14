import {Route, Routes} from "react-router-dom";
import EventList from "./components/pages/EventList.tsx";
import CreateEvent from "./components/pages/CreateEvent.tsx";
import EventDetail from "./components/pages/EventDetail.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import {Navigate} from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage.tsx";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/layout/Footer.tsx";
import { useAuth } from "./context/AuthContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";

export default function App() {
    const { token } = useAuth();
    const isAuthenticated = token !== null;

    return (
        <SearchProvider>                         
                {isAuthenticated && <NavBar />}
                
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />

                        {/* Protected */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/events" element={<EventList/>} />
                            <Route path="/events/new" element={<CreateEvent/>} />
                            <Route path="/events/:id" element={<EventDetail/>} />
                        </Route>

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                
                {isAuthenticated && <Footer />}            
        </SearchProvider>
    )
}