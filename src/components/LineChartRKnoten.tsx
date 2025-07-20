import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const dummyData = [
    { date: "20.05", hands: 1, feet: 0 },
    { date: "21.05", hands: 0, feet: 1 },
    { date: "22.05", hands: 2, feet: 1 },
    { date: "23.05", hands: 1, feet: 2 },
    { date: "24.05", hands: 3, feet: 0 },
    { date: "25.05", hands: 1, feet: 1 },
    { date: "26.05", hands: 2, feet: 1 },
    { date: "27.05", hands: 1, feet: 2 },
    { date: "28.05", hands: 0, feet: 2 },
    { date: "29.05", hands: 1, feet: 1 },
    { date: "30.05", hands: 2, feet: 1 },
    { date: "31.05", hands: 2, feet: 1 },
    { date: "01.06", hands: 1, feet: 2 },
    { date: "02.06", hands: 3, feet: 1 },
];


function LineChartRKnoten() {
    return(
        <Card className="w-full p-4">
            <CardHeader>
                <CardTitle>Rheumaknoten im Verlauf</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={dummyData}>
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip/>
                      <Legend/>
                      <Line
                          type="monotone"
                          dataKey="hands"
                          stroke="#60a5fa"
                          strokeWidth={2}
                          name="Hände"
                          dot={{ r: 4 }}
                      />
                      <Line
                          type="monotone"
                          dataKey="feet"
                          stroke="#f87171"
                          strokeWidth={2}
                          name="Füße"
                          dot={{ r: 4 }}
                      />
                  </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default LineChartRKnoten;