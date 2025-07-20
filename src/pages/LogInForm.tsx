import { Card, CardContent } from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState, useContext } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { AuthContext } from "@/context/authContext.tsx";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:9095/user/login", {
                email,
                password,
            });

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("token", response.data.token);
                setToken(response.data.token); // Token im Context aktualisieren
                toast.success("Login erfolgreich!");
                navigate("/homepage");
            }
        } catch (err: unknown) {
            console.error("Login fehlgeschlagen:", err);
            toast.error("Login fehlgeschlagen. Bitte überprüfe deine Daten.");
            setError("Email oder Passwort falsch");
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className="flex justify-center mt-24">
            <Card className="w-full max-w-md">
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="mb-">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="deine@gmail.de"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                            />
                            <p className="text-red-600">{error}</p>
                        </div>
                        <Button type="submit" className="border">Login</Button>
                    </form>
                    <div className="text-center">
                        <p>
                            Du hast noch keinen Account? <a href="/register">Registrieren</a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;
