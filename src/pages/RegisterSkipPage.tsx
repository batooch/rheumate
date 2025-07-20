import {useState} from "react";
import {Medicament} from "@/types.ts";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DatePicker from "@/components/DatePicker";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {Sun, Sunrise, Sunset} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import axios from "axios";

function RegisterSkipPage() {
    const [rheumaType, setRheumaType] = useState("");
    const [diagnosisDate, setDiagnosisDate] = useState<Date | undefined>(undefined);
    const [medicaments, setMedicaments] = useState<Medicament[]>([]);
    const [newMed, setNewMed] = useState<Medicament>({
        name: "",
        frequency: [],
        durationDays: "",
        durationWeeks: "",
        durationMonths: ""
    });

    const navigate = useNavigate();

    const toggleFrequency = (time: string) => {
        setNewMed((prev) => ({
            ...prev,
            frequency: prev.frequency.includes(time)
                ? prev.frequency.filter((t) => t !== time)
                : [...prev.frequency, time],
        }));
    };

    const handleMedAdd = () => {
        setMedicaments([...medicaments, newMed]);
        setNewMed({name: "", frequency: [],  durationDays: "", durationWeeks: "", durationMonths:""});
    };

    const handleMedDelete = (indexToDelete: number) => {
        setMedicaments((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    const handleSave = async () => {
        try {
            const payload = {
                rheumaType,
                diagnosisDate,
                medicaments
            };

            const token = localStorage.getItem("token");

            const response = await axios.post("http://localhost:9090/patients/register/skip", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log("Daten erfolgreich gespeichert.",response);
            toast.success("Registrierung erfolgreich!");
            navigate("/homepage");

        } catch (error: unknown) {
            console.error("Fehler beim Speichern:", error);
            toast.error("Fehler beim Speichern");
        }
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Ergänzende Informationen</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Rheuma-Diagnose</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label>Rheuma-Typ</Label>
                    <Select value={rheumaType} onValueChange={setRheumaType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Typ auswählen"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Rheuma 1">Rheuma 1</SelectItem>
                            <SelectItem value="Rheuma 2">Rheuma 2</SelectItem>
                            <SelectItem value="Rheuma 3">Rheuma 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <div>
                        <Label>Diagnose-Datum</Label>
                        <DatePicker date={diagnosisDate} setDate={setDiagnosisDate}/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Deine Medikamente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Label>Name</Label>
                    <Input value={newMed.name} onChange={(e) => setNewMed({...newMed, name: e.target.value})}/>

                    <Label className="mt-4">Häufigkeit</Label>
                    <div className="flex gap-2 flex-wrap mb-2">
                        {["morgens", "mittags", "abends"].map((label) => (
                            <Button
                                key={label}
                                type="button"
                                variant={newMed.frequency.includes(label) ? "default" : "outline"}
                                onClick={() => toggleFrequency(label)}
                            >
                                {label === "morgens" && <Sunrise className="mr-1 h-4 w-4"/>}
                                {label === "mittags" && <Sun className="mr-1 h-4 w-4"/>}
                                {label === "abends" && <Sunset className="mr-1 h-4 w-4"/>}
                                {label}
                            </Button>
                        ))}
                    </div>

                    {newMed.frequency.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {newMed.frequency.map((time, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {time}
                                    <button
                                        type="button"
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                        onClick={() => toggleFrequency(time)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <Label className="block font-medium mb-1">Dauer:</Label>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                placeholder="Tage"
                                className="w-20"
                                value={newMed.durationDays}
                                onChange={(e) =>
                                    setNewMed({...newMed, durationDays: e.target.value})
                                }
                            />
                            <span className="text-sm text-gray-600">Tage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                placeholder="Wochen"
                                className="w-20"
                                value={newMed.durationWeeks}
                                onChange={(e) =>
                                    setNewMed({...newMed, durationWeeks: e.target.value})
                                }
                            />
                            <span className="text-sm text-gray-600">Wochen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                placeholder="Monate"
                                className="w-20"
                                value={newMed.durationMonths}
                                onChange={(e) =>
                                    setNewMed({...newMed, durationMonths: e.target.value})
                                }
                            />
                            <span className="text-sm text-gray-600">Monate</span>
                        </div>
                    </div>


                    <Button variant="outline" onClick={handleMedAdd}>Medikament hinzufügen</Button>

                    {medicaments.length > 0 && (
                        <ul className="mt-4 space-y-2">
                            {medicaments.map((med, index) => (
                                <li key={index} className="flex justify-between items-center border p-2 rounded">
                                     <span>
                                         {med.name} – {med.frequency.join(", ")} – {med.durationDays}T / {med.durationWeeks}W / {med.durationMonths}M
                                      </span>

                                    <Button variant="ghost" onClick={() => handleMedDelete(index)}>×</Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
            <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={() => navigate("/homepage")}>Überspringen</Button>
                <Button variant="outline" onClick={handleSave}>Speichern &Weiter</Button>
            </div>
        </div>
    );
}

export default RegisterSkipPage;
