import {useEffect, useState} from "react";
import axios from "axios";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {ChartData} from "../types";

function AreaChartStiffMental() {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const res = await axios.get<Record<string, { temperatur: number, mentalBurden: number }>>(
                    "http://localhost:9095/data-overview/mentalBurden-temperature",
                    {headers: {Authorization: `Bearer ${token}`}}
                );


                const merged: ChartData[] = Object.entries(res.data).map(([date, entry]) => ({
                    date,
                    temperatur: entry.temperatur ?? null,
                    mentalBurden: entry.mentalBurden ?? null
                }));

                setData(merged);
            } catch (error) {
                console.error("Fehler beim Laden der kombinierten Daten:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-96 p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-bold mb-4">
                Verlauf: Temperatur vs. Mentale Gesundheit
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area
                        type="monotone"
                        dataKey="temperatur"
                        stroke="#f87171"
                        fill="#fecaca"
                        name="Morgensteifigkeit"
                    />
                    <Area
                        type="monotone"
                        dataKey="mentalBurden"
                        stroke="#60a5fa"
                        fill="#dbeafe"
                        name="Mentaler Zustand"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );

}

export default AreaChartStiffMental;