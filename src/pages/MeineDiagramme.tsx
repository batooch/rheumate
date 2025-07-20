import AreaChartStiffMental from "@/components/AreaChart.tsx";
import LineChartMentalState from "@/components/LineChartMentalState.tsx";
import LineChartRKnoten from "@/components/LineChartRKnoten.tsx";
import BarChartRKnoten from "@/components/BarChartRKnoten.tsx";
import LineChartTemperature from "@/components/LineChartTemperature.tsx";
import BarChartMorningStiffness from "@/components/BarChartMorningStiffness.tsx";

export default function MeineDiagramme() {
    return(
        <div className="text-center max-w-4xl mx-auto mt-16">
            <h1>Meine Diagramme:</h1>
            <LineChartMentalState/>
            <LineChartTemperature/>
            <BarChartMorningStiffness/>
            <AreaChartStiffMental/>
            <LineChartRKnoten/>
            <BarChartRKnoten/>
        </div>
    );
}


