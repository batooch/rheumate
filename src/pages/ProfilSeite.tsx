import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/apiService";
import { Medicament } from "@/types.ts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import benutzerChatIcon from "../images/benutzerChatIcon.png";
import { useLocation } from "react-router-dom";

function ProfilSeite() {
    const [data, setData] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/patients/me");
                const raw = response.data;
                console.log("Daten vom Backend:", raw);

                // Medikamente aufbauen
                const medicaments: Medicament[] = raw.medicationName
                    ? [{
                        name: raw.medicationName,
                        frequency: raw.medicationFrequency?.split("/") || [],
                        durationDays: raw.medicationDuration?.match(/(\d+)T/)?.[1] || "",
                        durationWeeks: raw.medicationDuration?.match(/(\d+)W/)?.[1] || "",
                        durationMonths: raw.medicationDuration?.match(/(\d+)M/)?.[1] || ""
                    }]
                    : [];

                // Alle Daten zusammenführen
                const userData = {
                    ...raw,
                    medicaments
                };

                setData(userData);
            } catch (error) {
                console.error("Fehler beim Laden der Profildaten:", error);
                toast.error("Fehler beim Laden der Profildaten");
            }
        };
        fetchData();
    }, [location.key]);

    if (!data) return <p className="text-center mt-10">Lade Daten...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-20 h-20 border">
                    <AvatarImage src={benutzerChatIcon} />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">Profilübersicht</h1>
                    <p className="text-sm text-gray-500">Alle persönlichen Informationen</p>
                </div>
            </div>

            {/* Stammdaten */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Stammdaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Vorname:</strong> {data.firstName}</p>
                    <p><strong>Nachname:</strong> {data.lastName}</p>
                    <p><strong>Geburtsdatum:</strong> {data.birthDate?.split("T")[0]}</p>
                    <p><strong>E-Mail:</strong> {data.email}</p>
                </CardContent>
            </Card>

            {/* Diagnose */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Rheuma-Diagnose</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Typ:</strong> {data.rheumaticType}</p>
                    <p><strong>Diagnose-Datum:</strong> {data.diagnosisDate?.split("T")[0]}</p>
                </CardContent>
            </Card>

            {/* Medikamente */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Medikamente</CardTitle>
                </CardHeader>
                <CardContent>
                    {Array.isArray(data.medicaments) && data.medicaments.length > 0 ? (
                        <ul className="space-y-2">
                            {data.medicaments.map((med: Medicament, index: number) => (
                                <li key={index} className="border p-2 rounded">
                                    <p><strong>Name:</strong> {med.name}</p>
                                    <p><strong>Häufigkeit:</strong> {med.frequency.join(", ")}</p>
                                    <p><strong>Dauer:</strong> {med.durationDays}T / {med.durationWeeks}W / {med.durationMonths}M</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Keine Medikamente eingetragen.</p>
                    )}
                </CardContent>
            </Card>

            {/* Bearbeiten-Button */}
            <div className="flex justify-end">
                <Button
                    className="bg-[#224c70] text-white hover:bg-[#1a3a57]"
                    onClick={() => navigate("/profil")}
                >
                    Bearbeiten
                </Button>
            </div>
        </div>
    );
}

export default ProfilSeite;
