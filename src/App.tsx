import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import MeineDiagramme from './pages/MeineDiagramme.js';
import Navbar from "./components/Navbar.js";
import MeinProfil from './pages/MeinProfil.js';
import Chat from "@/pages/Chat.tsx";
import LoginForm from "@/pages/LogInForm.tsx";
import Register from "@/pages/Register.tsx";
import {Toaster} from "sonner";
import axios from "axios";
import RegisterSkipPage from "@/pages/RegisterSkipPage.tsx";
import Bericht from "@/pages/Bericht.tsx";
import UserSummaryKI from "@/pages/UserSummaryKI.tsx";
import ArztNachricht from "@/pages/ArztNachricht.tsx";
import SelfMessageWrite from "./pages/SelfMessageWrite.js";
import SelfMessageGet from "@/pages/SelfMessageGet.tsx";
import ProfilSeite from "@/pages/ProfilSeite.tsx";

// Axios-Interceptor einrichten (direkt am Anfang der Datei)
axios.interceptors.request.use((config) => {
    // Token NICHT für Login/Registrierung mitschicken
    if (
        config.url &&
        !config.url.endsWith("/user/register") &&
        !config.url.endsWith("/user/login")
    ) {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        // Wenn ein Token vorhanden ist, füge es zu den Headers hinzu
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

function App() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <BrowserRouter>
                <Navbar/>
                <Routes>

                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="/register/skip" element={<RegisterSkipPage/>}/>
                    <Route path="/easter/egg/write" element={<SelfMessageWrite/>}/>
                    <Route path="/easter/egg/get" element={<SelfMessageGet/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/diagramme" element={<MeineDiagramme/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/profil" element={<MeinProfil/>}/>
                    <Route path="/homepage" element={<Homepage/>}/>
                    <Route path="/bericht" element={<Bericht/>}/>
                    <Route path="/user/ki/sum" element={<UserSummaryKI/>}/>
                    <Route path="/arzt-nachricht" element={<ArztNachricht/>}/>
                    <Route path="/profilSeite" element={<ProfilSeite/>}/>
                </Routes>
                <Toaster richColors position="bottom-right" />
            </BrowserRouter>
            <Toaster richColors position="bottom-right"/>
        </div>
    );
}

export default App;
