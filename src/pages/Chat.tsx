import {ChangeEvent, FormEvent, KeyboardEvent, useState, useRef, useEffect} from "react";
import {Message} from "@/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import goiaIcon from "../images/doctorGoiaIcon.png";
import benutzerChatIcon from "../images/benutzerChatIcon.png";
import {getStreakData, getTodayData} from "@/services/streakService";
import {getProgress} from "@/services/progressService.tsx";
import {useNavigate} from "react-router-dom";
import ButtonSelfMessage from "@/components/ButtonSelfMessage.tsx";


function Chat() {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [streakCount, setStreakCount] = useState<number | null>(null);
    const [todayCount, setTodayCount] = useState<number | null>(null);
    const navigate = useNavigate();

    //streak-effekt
    const [isBouncing, setIsBouncing] = useState(true);

    // Scroll-Ref
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Fortschritt
    const [trackingActive, setTrackingActive] = useState(false);
    // const [currentStep, setCurrentStep] = useState(0); // Startet bei 1
    // const totalSteps = 10;
    const [progress, setProgress] = useState(0);

    // fetch für den Fortschritt

    async function fetchProgress() {
        try {
            const value = await getProgress();
            console.log("Fortschritt:", value);
            if (value !== undefined) {
                setProgress(value);
            }
        } catch (error) {
            console.error("Fehler beim Laden des Fortschritts:", error);
        }
    }


    useEffect(() => {
        fetchProgress();
    }, []);


    // Anzeige je nach Bildschirmgröße
    // Streak
    const [isCompactView, setIsCompactView] = useState(false);
    const [showStreakEffect, setShowStreakEffect] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsCompactView(window.innerWidth < 960); // < 640px = mobile
        };

        handleResize(); // initial prüfen
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // wenn alle Fragen beantwortet sind, dann Effekt
    /* useEffect(() => {
         if (allQuestionsAnswered) {
             // Wenn alle Fragen beantwortet sind, starte den Streak-Effekt
             setIsBouncing(true); // z. B. Bounce-Animation starten

             const timer = setTimeout(() => {
                 setIsBouncing(false); // nach 7 Sekunden Animation beenden
             }, 7000);

             return () => clearTimeout(timer); // Cleanup
         }
     }, [allQuestionsAnswered]);
 */


    // fetch für den Streak
    const fetchToday = async () => {
        try {
            const data = await getTodayData();
            setTodayCount(data.othersCompletedToday);

            if (todayCount > 0) {
                //Effekt nur zeigen, wenn Streak nicht zurückgesetzt wurde
                setShowStreakEffect(true);
                console.log(todayCount);
                setTimeout(() => setShowStreakEffect(false), 2000);
            }
        } catch (error) {
            console.error("Fehler beim Laden der Streak-Daten:", error);
            setTodayCount(null);
        }
    };

    const fetchStreak = async () => {
        try {
            const data = await getStreakData();
            setStreakCount(data.streak);

            if (streakCount > 0) {
                //Effekt nur zeigen, wenn Streak nicht zurückgesetzt wurde
                setShowStreakEffect(true);
                console.log(streakCount);
                setTimeout(() => setShowStreakEffect(false), 2000);
            }
        } catch (error) {
            console.error("Fehler beim Laden der Streak-Daten:", error);
            setStreakCount(null);
        }
    };

    useEffect(() => {
        fetchToday();
    }, []);
    useEffect(() => {
        fetchStreak();
    }, []);


    // useEffects

    // automatisches scrollen
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    // fortschrittbalken
    {/* useEffect(() => {
        if (!trackingActive) return;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.sender === "goia" && currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    }, [messages]);

    useEffect(() => {
        if (currentStep >= totalSteps) {
            setTrackingActive(false);
        }
    }, [currentStep]); */
    }


    const shortcutMessage = [
        {
            label: "Symptomtracking starten",
            text: "Lass uns mit den täglichen Fragen starten."
        },
        {
            label: "SOS Rheumaspitze",
            text: "Hilfe. Ich habe eine Rheumaspitze. Wie soll ich mich am besten verhalten?"
        },
        {
            label: "FAQ Psoriasis-Arthritis",
            text: "Bitte gib mir eine verständliche Übersicht über die wichtigsten Fragen zu Psoriasis-Arthritis."
        }
    ];

// Hilfsfunktion für fetch mit Token
    const fetchWithToken = async (bodyText: string) => {
        const token = localStorage.getItem("token");
        return fetch("http://localhost:9095/chat", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                ...(token ? {Authorization: `Bearer ${token}`} : {})
            },
            body: bodyText,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            sender: "user",
            text: input
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetchWithToken(input); // ← hier wird der Token mitgegeben
            const data = await response.text();
            const botMessage: Message = {sender: "goia", text: data};
            setMessages(prev => [...prev, botMessage]);
            await fetchStreak();
            await fetchToday();
            await fetchProgress();
        } catch (error) {
            console.log(error);
            setMessages(prev => [...prev, {sender: "goia", text: "Fehler bei der Verbindung."}]);
        }

        setInput("");
    };

    const sendShortcutMessage = async (text: string) => {
        const userMessage: Message = {
            sender: "user",
            text: text
        };
        setMessages(prev => [...prev, userMessage]);

        // Symptomtracking starten erkennen
        if (text.includes("täglichen Fragen")) {
            setTrackingActive(true);
            await fetchProgress();
        }

        try {
            const response = await fetchWithToken(text);
            const data = await response.text();
            const botMessage: Message = {sender: "goia", text: data};
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.log(error);
            setMessages(prev => [...prev, {sender: "goia", text: "Fehler bei der Verbindung."}]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-gray-50 font-sans relative">

            {streakCount !== null && (
                <div
                    className={`absolute left-4 z-10 ${
                        showStreakEffect ? "animate-streak-bounce" : ""
                    }`}
                    style={{
                        top: trackingActive && isCompactView ? "55px" : "16px"
                    }}
                >
                    <div className="flex flex-col items-start space-y-1">
                        {/* Streak-Badge */}
                        <div
                            className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-300">
                            <span className="text-orange-500 text-xl mr-2">🔥</span>
                            <span className="text-gray-800 font-semibold">{streakCount}</span>
                        </div>
                        {/* Textanzeige */}
                        <div
                            className="text-sm bg-white px-2 py-1.5 rounded-md shadow border border-gray-200 text-gray-700 max-w-[180px] leading-snug">
                            Heute haben schon <strong>{todayCount}</strong> RheuMates die Fragen beantwortet.
                        </div>

                    </div>
                </div>
            )}

            {/* Button rechts */}
            <Button
                onClick={() => navigate("/arzt-nachricht")}
                className="absolute right-4 top-16 bg-[#224c70] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#1a3a57]"
            >
                Nachricht an Arzt senden
            </Button>

            <ButtonSelfMessage
                className="absolute right-4 top-28 bg-[#d5caff] text-purple-900 px-4 py-2 rounded-full shadow-md hover:bg-[#c5baff]"
            />


            {messages.length === 0 && (
                <h1 className="absolute top-[30vh] w-full text-center text-gray-600 text-2xl m-0 z-10">
                    <p>Lass uns starten.</p>
                    <p>Wie kann ich dir heute helfen?</p>
                </h1>
            )}

            {/*  {trackingActive && (
                <div className="w-full max-w-[800px] px-4 mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Frage {currentStep} von {totalSteps}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                            className="bg-green-200 h-2 rounded-full"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>

                </div>
            )} */}

            {/* Fortschrittsbalken

            <div className="w-full max-w-[800px] px-4 mt-4">
                <div className="text-sm text-gray-700 mb-1">
                    {progress.toFixed(1)} % der Fragen beantwortet
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3">
                    <div
                        className="bg-[#224c70] h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            */}


            <div className="w-full max-w-[800px] flex-grow overflow-y-auto px-4 mt-[6vh] mb-[26vh]">
                {messages.map((msg, index) => {
                    const isUser = msg.sender === "user";
                    const icon = isUser ? benutzerChatIcon : goiaIcon;
                    return (
                        <div
                            key={index}
                            className={`flex items-start my-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                        >
                            {!isUser && (
                                <Avatar className="w-8 h-8 ml-2">
                                    <AvatarImage src={icon}/>
                                    <AvatarFallback>G</AvatarFallback>
                                </Avatar>
                            )}

                            <Card
                                className={`px-4 py-2 ${
                                    isUser ? "bg-[#fffccf] text-gray-80000" : "bg-[#4F8374] text-gray-50"
                                } max-w-md break-words`}
                            >
                                <p className="text-sm font-semibold">
                                    {isUser ? "Du:" : "Goia:"}
                                </p>
                                <p>{msg.text}</p>
                            </Card>

                            {isUser && (
                                <Avatar className="w-8 h-8 ml-2">
                                    <AvatarImage src={icon}/>
                                    <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef}/>
            </div>


            <div className="absolute  bottom-[20vh] w-full max-w-[800px] flex justify-center">
                {shortcutMessage.map((msg, index) => (
                    <Button
                        key={index}
                        className="rounded-full bg-[#224c70] border text-white"
                        onClick={() => sendShortcutMessage(msg.text)}
                    >
                        {msg.label}
                    </Button>
                ))}
            </div>


            <form
                onSubmit={handleSubmit}
                className="absolute bottom-[10vh] w-full max-w-[800px] flex bg-white border border-gray-300 rounded-xl p-[10px_15px] shadow-sm"
            >
                <Textarea
                    value={input}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                    placeholder="Dein Anliegen"
                    rows={1}
                    className="flex-grow resize-none border-none h-10 max-h-[100px] bg-gray-50 min-h-0 p-2"
                    onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                />


                <Button type="submit"
                        className="ml-2.5  bg-[#122536] text-white rounded-full border">Senden</Button>

            </form>
        </div>
    );
}

export default Chat;