import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import axios from "axios";


function UserSummaryKI() {
    const [userSummary, setUserSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try{
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:9095/health-analysis/health-report-by-patient", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setUserSummary(response.data);
            }catch (e) {
                console.error("Fehler beim Abrufen der Zusammenfassung", e);
                setError("Zusammenfassung konnte nicht gealden werden.");
            }
        };
        fetchReport();
    }, []);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Deine Symptomzusammenfassung </CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap text-gray-800">
                {error && <p className="text-red-500">{error}</p>}
                <p>{userSummary}</p>
            </CardContent>
        </Card>
    );

}

export default UserSummaryKI;