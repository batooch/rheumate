import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Pencil, Loader2, Mail} from "lucide-react";

type ButtonSelfLetterProps = {
    className?: string;
};

function ButtonSelfMessage({className}: ButtonSelfLetterProps) {
    const navigate = useNavigate();
    const [hasLetter, setHasLetter] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkLetterExists = async () => {
            try {
                const response = await axios.get("http://localhost:9095/self-messages/exists", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setHasLetter(response.data.exists);
            } catch (err) {
                console.error("Fehler beim Laden des Briefstatus", err);
            } finally {
                setLoading(false);
            }
        };

        checkLetterExists();
    }, []);

    const handleClick = () => {
        if (hasLetter) {
            navigate("/easter/egg/get");
        } else {
            navigate("/easter/egg/write");
        }
    };

    if (loading) {
        return (
            <Button disabled className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20}/>
                Lädt...
            </Button>
        );
    }

    return (
        <Button onClick={handleClick} className={`flex items-center gap-2 ${className ?? ""}`}>
            {hasLetter ? (
                <>
                    <Mail size={20}/>
                    Deine Nachricht an dich
                </>
            ) : (
                <>
                    <Pencil size={20}/>
                    Schreibe dir einen Brief
                </>
            )}
        </Button>
    );

}

export default ButtonSelfMessage;
