import LineChartMentalState from "@/components/LineChartMentalState.tsx";
import LineChartTemperature from "@/components/LineChartTemperature.tsx";
import BarChartMorningStiffness from "@/components/BarChartMorningStiffness.tsx";
import GesundheitsberichtKI from "@/components/GesundheitsberichtKI.tsx";

export default function MeineDiagramme() {
    return (
        <div className="text-center max-w-6xl mx-auto mt-16 px-4">
            <h1 className="mb-8 text-2xl font-bold">Dein Gesundheitsverlauf im Überblick</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LineChartMentalState/>
                <LineChartTemperature/>
                <BarChartMorningStiffness/>
                <div className="flex items-start gap-4 mt-4">
                    <img
                        src="/src/images/doctorGoia.png"
                        alt="Goia Ärztin"
                        className="w-32 h-auto object-contain"
                    />
                    <div className="relative bg-[#4F8374] text-white p-4 rounded-2xl shadow-md max-w-sm text-left">
                        <p className="text-base leading-relaxed">
                            Schön, dass du deine Symptome so gut dokumentierst.
                        </p>
                        <div
                            className="absolute -bottom-3 left-6 w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px]"
                            style={{borderTopColor: '#4F8374'}}
                        ></div>
                    </div>
                </div>

            </div>

            <GesundheitsberichtKI/>
        </div>
    );
}
