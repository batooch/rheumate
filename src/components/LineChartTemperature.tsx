import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import axios from "axios";
import {TemperatureEntry} from "@/types.ts";


function LineChartTemperature() {
    const [data, setData] = useState<TemperatureEntry[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:9095/data-overview/temperature", {
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
        temperature: entry.temperature,
    }));


    return (
        <div className="w-full h-96 p-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold mb-4">Verlauf deiner Körpertemperatur</h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="temperature" stroke="#34d399" name="Temperatur"/>

                </LineChart>
            </ResponsiveContainer>
        </div>

    );
}

export default LineChartTemperature;