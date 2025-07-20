import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

function ArztNachricht() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new URLSearchParams();
            formData.append("subject", subject);
            formData.append("message", message);

            await api.post("/ui/message-to-doctor", formData.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            toast.success("Nachricht erfolgreich gesendet");
            navigate("/chat");
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
            toast.error("Nachricht konnte nicht gesendet werden");
            navigate("/chat");navigate("/chat");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Schreibe eine Nachricht an deinen Arzt</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div>
                        <Label className="block font-medium mb-1">Betreff</Label>
                        <Input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Gib hier den Titel deiner Nachricht ein"
                            className="rounded-xl"
                            required
                        />
                    </div>

                    <div>
                        <Label className="block font-medium mb-1">Nachricht</Label>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Beschreibe hier dein Anliegen"
                            rows={6}
                            className="rounded-xl"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <Button
                            type="button"
                            onClick={() => navigate("/")}
                            variant="outline"
                            className="rounded-full border-gray-300 hover:bg-gray-100"
                        >
                            Zurück
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="rounded-full bg-[#224c70] text-white hover:bg-[#1a3a57]"
                        >
                            Senden
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ArztNachricht;
