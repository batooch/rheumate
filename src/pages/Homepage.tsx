import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import doctorGoia from "../images/doctorGoia.png";
import {useEffect, useState} from "react";



function Homepage() {
    const navigate = useNavigate();
    const [isBouncing, setIsBouncing] = useState(true);
    const [fullText, setFullText] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const [textComplete, setTextComplete] = useState(false);



   useEffect(() => {
   const fetchGreeting = async () => {
    try {
        const response = await fetch("http://localhost:9095/homepage", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const greeting = await response.text();
        setFullText(greeting);
        setDisplayedText(greeting);
    } catch (error) {
        console.error("Fehler beim Begrüßungstext:", error);
        setFullText("Willkommen zurück!");
        setDisplayedText("Willkommen zurück!");
    }
};

    fetchGreeting();

    const bounceTimer = setTimeout(() => {
        setIsBouncing(false);
    }, 7000);

    return () => clearTimeout(bounceTimer);
}, []);

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800 font-sans ">

            <div className="flex items-start gap-6 max-w-4xl">
                <img
                    src={doctorGoia}
                    alt="Goia"
                    className={`w-60 h-60 object-contain ${isBouncing ? 'animate-bounce' : ''}`}

                />
                <div className="relative bg-[#4F8374] hover:bg-[#3c665a]
                 text-gray-50 p-6 rounded-2xl shadow-xl max-w-xl self-start mt-6">
                    <p className="text-xl leading-relaxed">
                        {displayedText}
                    </p>
                    <div
                        className="absolute -bottom-3 left-8 w-0 h-0 border-x-[12px] border-x-transparent border-t-[12px]"
                        style={{ borderTopColor: '#4F8374' }}
                    ></div>
                </div>
            </div>
            <Button
                onClick={() => navigate("/chat")}
                className={`mt-4 text-xl px-10 py-5  bg-[#122536] text-white hover:bg-orange-300text-gray-800

                rounded-full  cursor-pointer shadow-lg transition duration-300  ${textComplete ? 'animate-pulse' : ''}`}
            >Chat</Button>
        </div>
    );
}

export default Homepage;