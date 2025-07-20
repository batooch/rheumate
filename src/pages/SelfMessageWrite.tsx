import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import paperBg from "@/images/paper.jpg";
import {useNavigate} from "react-router-dom";
import NavigationBackButton from "@/components/NavigationBackButton.tsx";
import {toast} from "sonner";

function SelfMessageWrite() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchWithToken = async (bodyText: string) => {
        const token = localStorage.getItem("token");
        return fetch("http://localhost:9095/self-messages/create", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                ...(token ? {Authorization: `Bearer ${token}`} : {}),
            },
            body: bodyText,
        });
    };

    const handleSave = async () => {
        if (!text.trim()) {
            toast.error("Bitte gib eine Nachricht ein.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetchWithToken(text);

            if (response.status === 201) {
                toast.success("Dein Brief wurde gespeichert.");
                setText("");
                navigate(-1);
            } else {
                const errorText = await response.text();
                toast.error(`Fehler: ${errorText}`);
            }
        } catch (error) {
            console.error("Fehler beim Speichern des Briefes:", error);
            toast.error("Ups! Beim Speichern ist ein Fehler aufgetreten.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-center bg-cover flex items-center justify-center px-4"
            style={{
                backgroundImage: `url(${paperBg})`,
                fontFamily: '"Shadows Into Light", cursive',
                backgroundColor: "#fdfcf7",
            }}
        >
            <Card
                className="max-w-2xl w-full bg-[#fffdf7] rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-[#e7decf] relative px-6 py-4">
                <CardHeader className="flex flex-col items-start">
                    <NavigationBackButton/>
                    <CardTitle className="text-3xl text-center w-full text-[#145A64] mb-2">
                        Dein Brief an dich selbst
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-[#145A64]">
                    <p className="text-center mb-4 text-lg font-medium">
                        Was möchtest du deinem zukünftigen Ich sagen, wenn es dir mal nicht gut geht?
                    </p>
                    <Textarea
                        className="h-64 text-xl p-4 bg-transparent border-[#145A64] text-[#2a4f54] placeholder:text-[#618c91] resize-none"
                        placeholder="Hey du, ..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="flex justify-center mt-6">
                        <Button
                            onClick={handleSave}
                            className="bg-[#d2f1f7] text-[#145A64] hover:bg-[#bceaf4] px-8 py-2 rounded-full text-lg shadow"
                            disabled={loading}
                        >
                            {loading ? "Speichert..." : "Speichern"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default SelfMessageWrite;
