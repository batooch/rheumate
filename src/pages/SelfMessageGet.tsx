import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {toast} from "sonner";
import paperBg from "@/images/paper.jpg";
import axios from "axios";
import NavigationBackButton from "@/components/NavigationBackButton";

function SelfMessageGet() {
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<string>(
                    "http://localhost:9095/self-messages/my-letter",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage(response.data);
            } catch (error) {
                console.error("Fehler beim Laden des Briefes:", error);
                setMessage(null);
            }
        };

        fetchMessage();
    }, []);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete("http://localhost:9095/self-messages/delete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success("Dein Brief wurde erfolgreich gelöscht.");
                navigate(-1);
            } else {
                toast.error(`Fehler: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
            toast.error("Beim Löschen ist ein Fehler aufgetreten.");
        }
    };

    return (
        <div
            className="min-h-screen bg-center bg-cover flex items-center justify-center px-4 py-8"
            style={{
                backgroundImage: `url(${paperBg})`,
                fontFamily: '"Shadows Into Light", cursive',
                backgroundColor: "#fdfcf7",
            }}
        >
            <Card
                className="max-w-3xl w-full bg-[#fffdf7] rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-[#e7decf] px-6 py-4">
                <CardHeader className="flex flex-col items-start">
                    <NavigationBackButton/>
                    <CardTitle className="text-3xl text-center w-full text-[#145A64] mb-2">
                        Dein Brief an dich selbst
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-[#145A64]">
                    {message ? (
                        <>
                            <div
                                className="bg-[#f7f5ee] border border-[#e7decf] p-4 rounded shadow text-[#145A64] whitespace-pre-wrap">
                                {message}
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button
                                    variant="outline"
                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                    onClick={handleDelete}
                                >
                                    <Trash className="w-4 h-4 mr-2"/>
                                    Löschen
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-lg text-[#618c91]">
                            Du hast noch keinen Brief geschrieben.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default SelfMessageGet;
