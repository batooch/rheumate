import {useState} from "react";
import {Button} from "@/components/ui/button";
import {MySpeechRecognition, MySpeechRecognitionEvent} from "@/types.ts";

type ChatSpeechProps = {
    onResult: (text: string) => void;
    setIsListening: (value: boolean) => void;
};

const ChatSpeech = ({onResult, setIsListening}: ChatSpeechProps) => {
    const [localListening, setLocalListening] = useState(false);

    const startListening = () => {
        const SpeechRecognition =
            (window as unknown as { SpeechRecognition: new () => MySpeechRecognition }).SpeechRecognition ||
            (window as unknown as { webkitSpeechRecognition: new () => MySpeechRecognition }).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Dein Browser unterstützt keine Spracheingabe.");
            return;
        }

        const recognition = new SpeechRecognition() as MySpeechRecognition;
        recognition.lang = "de-DE";
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setLocalListening(true);
            setIsListening(true);
        };

        recognition.onend = () => {
            setLocalListening(false);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Spracherkennungsfehler:", event.error);
            setLocalListening(false);
            setIsListening(false);
        };

        recognition.onresult = (event: MySpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
        };

        recognition.start();
    };

    return (
        <Button
            type="button"
            onClick={startListening}
            className={`ml-2 rounded-full border ${
                localListening ? "bg-red-200 text-red-900 animate-pulse" : "bg-[#d5caff] text-purple-900"
            }`}
        >
            {localListening ? "🎙️ Sprich jetzt..." : "🎤"}
        </Button>
    );
};

export default ChatSpeech;
