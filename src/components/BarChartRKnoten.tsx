import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const dummyData = [
    { date: "03.05", hands: 1, feet: 0 },
    { date: "04.05", hands: 0, feet: 1 },
    { date: "05.05", hands: 2, feet: 1 },
    { date: "06.05", hands: 1, feet: 2 },
    { date: "07.05", hands: 3, feet: 0 },
    { date: "08.05", hands: 1, feet: 1 },
    { date: "09.05", hands: 2, feet: 1 },
    { date: "10.05", hands: 1, feet: 2 },
    { date: "11.05", hands: 0, feet: 2 },
    { date: "12.05", hands: 1, feet: 1 },
    { date: "13.05", hands: 2, feet: 1 },
    { date: "01.06", hands: 1, feet: 1 },
];

function BarChartRKnoten() {

    return(
        <Card className="w-full p-4">
            <CardHeader>
                <CardTitle>Rheumaknoten im Verlauf</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={dummyData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="hands" fill="#60a5fa" name="Hände" />
                        <Bar dataKey="feet" fill="#f87171" name="Füße" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default BarChartRKnoten;