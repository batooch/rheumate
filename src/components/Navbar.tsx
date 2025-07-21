import {useContext} from 'react';
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import benutzerChatIcon from "../images/benutzerChatIcon.png";
import Logout from "@/components/Logout.tsx";
import BerichtDownloadButton from "@/components/BerichtDownloadButton.tsx";
import {useLocation} from "react-router-dom";
import {AuthContext} from "@/context/authContext.tsx";


function Navbar() {
    const {token} = useContext(AuthContext);
    const location = useLocation();

    const hideOnRoutes = ['/LoginForm', '/Register', '/RegisterSkipPage'];
    const shouldHidePart = hideOnRoutes.includes(location.pathname);

    return (
        <header className="w-full border-b bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-lg font-semibold text-[#4F8374]">
                    RheuMate
                </Link>

                {token && !shouldHidePart && (
                    <nav className="flex gap-4 items-center">
                        <Link to="/diagramme" className="ml-6 text-lg font-semibold text-gray-800">
                            Gesundheitsverlauf
                        </Link>
                        <Link to="/chat" className="ml-6 text-lg font-semibold text-gray-800">
                            Mein Chat
                        </Link>
                        <Link to="/profilSeite" className="ml-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={benutzerChatIcon}/>
                                <AvatarFallback>B</AvatarFallback>
                            </Avatar>
                        </Link>
                        <BerichtDownloadButton/>
                        <Logout/>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Navbar;
