import React, {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            firstName,
            lastName,
            birthDate,
            email,
            password
        }

        if (password !== confirmPassword) {
            toast.error("Die Passwörter stimmen nicht überein.")
            return
        }

        try {
            const response = await axios.post("http://localhost:9095/user/register", payload)

            if (response.status === 201 || response.status === 200) {
                // Speichere den Token im Local Storage
                localStorage.setItem("token", response.data.token);

                toast.success("Registrierung erfolgreich!");
                navigate("/register/skip")
            }
        } catch (error: unknown) {
            console.error("Fehler bei der Registrieung:", error)
            toast.error("Registrierung fehlgeschlagen")
        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl">Registrieren</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Label htmlFor="firstName">Vorname</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="lastName">Nachname </Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="birthDate">Geburtsdatum</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">E-Mail</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Passwort</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Passwort bestätigen</Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="border w-full">
                            Registrieren
                        </Button>

                        <div className="text-center">
                            <p>
                                Du hast bereits ein Konto? <a href="/login">Anmelden</a>
                            </p>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>


    );
}

export default Register;