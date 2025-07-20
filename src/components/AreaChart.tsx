import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const dummyData = [
    { date: "01.06", pain: 4, mentalState: 7 },
    { date: "02.06", pain: 6, mentalState: 5 },
    { date: "03.06", pain: 5, mentalState: 6 },
    { date: "04.06", pain: 3, mentalState: 8 },
];

function AreaChartStiffMental() {
    return (
        <div className=" w-full h-96 p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-bold mb-4">Verlauf: Morgensteifigkeit vs. Mentale Gesundheit</h2>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyData}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="pain" stroke="#f87171" fill="#fecaca" name="Morgensteifigkeit" />
                    <Area type="monotone" dataKey="mentalState" stroke="#60a5fa" fill="#dbeafe" name="Mentaler Zustand" />
                </AreaChart>

            </ResponsiveContainer>
        </div>
    );
}

export default AreaChartStiffMental;