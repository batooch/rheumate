import {useEffect, useState} from "react";
import {Medicament} from "@/types.ts";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import DatePicker from "@/components/DatePicker.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import benutzerChatIcon from "../images/benutzerChatIcon.png";
import {Sun, Sunrise, Sunset} from "lucide-react";
import api from "@/services/apiService"
import ButtonUserKISum from "@/components/ButtonUserKISum.tsx";


function MeinProfil() {

    const [forename, setForename] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
    const [rheumaType, setRheumaType] = useState<string>("");
    const [diagnosisDate, setDiagnosisDate] = useState<Date | undefined>(undefined);
    const [medicaments, setMedicaments] = useState<Medicament[]>([]);
    const [newMed, setNewMed] = useState<Medicament>({
        name: "",
        frequency: [],
        durationDays: "",
        durationWeeks: "",
        durationMonths: ""
    });

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
        setNewMed({name: "", frequency: [], durationDays: "", durationWeeks: "", durationMonths: ""});
    };


    const handleMedDelete = (indexToDelete: number) => {
        setMedicaments((prev) => prev.filter((_, index) => index !== indexToDelete));
    };

    useEffect(() => {
        const fetchProfilData = async () => {
            try {
                const response = await api.get("/patients/me");
                const data = response.data;

                setForename(data.firstName ?? "");
                setLastName(data.lastName ?? "");
                setBirthdate(data.birthDate ? new Date(data.birthDate) : undefined);
                setRheumaType(data.rheumaticType ?? "");
                setDiagnosisDate(data.diagnosisDate ? new Date(data.diagnosisDate) : undefined);
                setMedicaments(Array.isArray(data.medicaments) ? data.medicaments : []);

            } catch (error: unknown) {
                console.error("Fehler beim Laden der Daten:", error);
                toast.error("Fehler beim Laden der Daten:");
            }
        }
        fetchProfilData();
    }, []);

    const navigate = useNavigate();
    const handleSave = async () => {
        try {
            const payload = {
                firstName: forename,
                lastName: lastName,
                birthDate: birthdate?.toLocaleDateString("sv-SE"),
                rheumaticType: rheumaType,
                diagnosisDate: diagnosisDate?.toLocaleDateString("sv-SE"),
                medicationName: medicaments.map(m => m.name).join(", "),
                medicationFrequency: medicaments.map(m => m.frequency.join("/")).join(", "),
                medicationDuration: medicaments.map(m => {
                    return `${m.durationDays}T ${m.durationWeeks}W ${m.durationMonths}M`
                }).join(", "),
            };

            await api.patch("/patients/me", payload);
            toast.success("Profil erfolgreich aktualisiert!");
            navigate("/profilSeite");

        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            toast.error("Fehler beim Speichern.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-20 h-20 border">
                    <AvatarImage src={benutzerChatIcon}/>
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-6">Mein Profil bearbeiten</h1>
            </div>

            <div className="mb-6">
                <ButtonUserKISum/>
            </div>

            <div className="mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Stammdaten</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="block font-medium mb-1">Vorname:</Label>
                            <Input
                                type="text"
                                value={forename ?? ""}
                                onChange={(e) => setForename(e.target.value)}
                                placeholder="Dein Vorname"
                            />
                        </div>
                        <div>
                            <Label className="block font-medium mb-1">Nachnahme:</Label>
                            <Input
                                type="text"
                                value={lastName ?? ""}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Dein Nachnahme"
                            />
                        </div>
                        <div>
                            <Label className="block font-medium mb-1">Geburtsdatum:</Label>
                            <DatePicker date={birthdate} setDate={setBirthdate}/>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-6 mb-6">
                    <CardHeader>
                        <CardTitle>Rheuma-Diagnose</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="block font-medium mb-1">Diagnose-Typ:</Label>
                            <Select value={rheumaType ?? ""} onValueChange={setRheumaType}>
                                <SelectTrigger>
                                    <SelectValue style={{color: "#999999"}} placeholder="Diagnose auswählen"/>
                                </SelectTrigger>
                                <SelectContent className="bg-white z-50">
                                    <SelectItem value="Rheuma 1">Rheuma 1</SelectItem>
                                    <SelectItem value="Rheuma 2">Rheuma 2</SelectItem>
                                    <SelectItem value="Rheuma 3">Rheuma 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="block font-medium mb-1">Diagnose-Datum:</Label>
                            <DatePicker date={diagnosisDate} setDate={setDiagnosisDate}/>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Deine Medikamente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="space-y-2">
                            <Label className="block font-medium">Name</Label>
                            <Input
                                value={newMed.name ?? ""}
                                onChange={(e) => setNewMed({...newMed, name: e.target.value})}
                            />
                        </div>


                        <div className="space-y-2">
                            <Label className="block font-medium">Häufigkeit</Label>
                            <div className="flex gap-2 flex-wrap">
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
                        </div>


                        <div className="space-y-2">
                            <Label className="block font-medium">Dauer</Label>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Tage"
                                        className="w-22 placeholder:text-xs"
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
                                        className="w-22 placeholder:text-xs"
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
                                        className="w-22 placeholder:text-xs"
                                        value={newMed.durationMonths}
                                        onChange={(e) =>
                                            setNewMed({...newMed, durationMonths: e.target.value})
                                        }
                                    />
                                    <span className="text-sm text-gray-600">Monate</span>
                                </div>
                            </div>
                        </div>


                        <Button variant="outline" onClick={handleMedAdd}>
                            Medikament hinzufügen
                        </Button>


                        {medicaments.length > 0 && (
                            <ul className="mt-4 space-y-2">
                                {medicaments.map((med, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center border p-2 rounded"
                                    >
                        <span>
                            {med.name} – {med.frequency.join(", ")} – {med.durationDays}T /{" "}
                            {med.durationWeeks}W / {med.durationMonths}M
                        </span>
                                        <Button variant="ghost" onClick={() => handleMedDelete(index)}>
                                            ×
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end mt-4 space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/profilSeite")}
                        className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                        Abbrechen
                    </Button>
                    <Button onClick={handleSave} className="bg-[#224c70] text-white hover:bg-[#1a3a57]">
                        Änderungen speichern
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MeinProfil;