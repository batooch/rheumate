import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import { MorningStiffnessEntry } from "@/types.ts";
import axios from "axios";




function BarChartMorningStiffness() {
    const [data, setData] = useState<MorningStiffnessEntry[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:9095/data-overview/morning-stiffness", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                setData(response.data);

            }catch (error) {
                console.error("Fehler beim Laden der Daten:", error)
            }
        };
        fetchData();
    }, []);

    const chartData = data.map((entry) => ({
        date: entry.date.slice(5),
        morningStiffness: entry.morningStiffness ? 1 : 0, 
    }));


    return(
        <Card className="w-full p-4">
            <CardHeader>
                <CardTitle>Morgensteifigkeit im Verlauf</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis ticks={[0, 1]} domain={[0, 1]}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="morningStiffness" fill="#facc15" name="Morgensteifigkeit" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default BarChartMorningStiffness;