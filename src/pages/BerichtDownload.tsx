import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import axios from "axios";


function BerichtDownload() {
    const [report, setReport] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:9095/health-analysis/medical-report-for-doctor-md", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'blob',
                });

                const url = window.URL.createObjectURL(new Blob([response.data], {type: 'text/markdown'}));

                // Download erstellen
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'arztbericht.md');
                document.body.appendChild(link);
                link.click();
                link.remove();

            } catch (e) {
                console.error("Fehler beim Abrufen des Berichts", e);
                setError("BerichtDownload konnte nicht geladen werden.");
            }
        };

        fetchReport();
    }, []);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gesundheitsbericht</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap text-gray-800">
                {error && <p className="text-red-500">{error}</p>}
                <p>{report}</p>
            </CardContent>
        </Card>
    );

}

export default BerichtDownload;