import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import axios from "axios";


function LineChartMentalState() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:9095/data-overview/mental-burden", {
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


    return (
        <div className="w-full h-96 p-4 border rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold mb-4">Verlauf des mentalen Zustands</h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="mentalBurden" stroke="#34d399" name="Mentaler Zustand"/>

                </LineChart>
            </ResponsiveContainer>
        </div>

    );
}

export default LineChartMentalState;