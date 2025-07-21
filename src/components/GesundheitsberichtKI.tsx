import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardHeader, CardContent, CardTitle} from "@/components/ui/card";
import {FileText} from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function GesundheitsberichtKI() {
    const [bericht, setBericht] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBericht = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:9095/health-analysis/health-report-by-patient", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "text",
                });

                setBericht(response.data);
            } catch (err) {
                console.error("Fehler beim Laden des Berichts", err);
                setError("Die KI-Zusammenfassung konnte nicht geladen werden.");
            }
        };

        fetchBericht();
    }, []);

    return (
        <Card className="mt-12 max-w-3xl mx-auto shadow-md text-left">
            <CardHeader className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-muted-foreground"/>
                <CardTitle className="text-xl font-semibold">
                    Was Goia dir sagen möchte
                </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-800">
                {error && <p className="text-red-500">{error}</p>}
                {bericht ? (
                    <ReactMarkdown>{bericht}</ReactMarkdown>
                ) : (
                    <p className="text-muted-foreground">Lade Zusammenfassung…</p>
                )}
            </CardContent>
        </Card>
    );
}
