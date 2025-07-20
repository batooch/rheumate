import {useNavigate} from "react-router-dom";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";


function BerichtGenerierung() {

    const navigate = useNavigate();
    const handleNavigateToReport = () => {
        navigate("/bericht");
    }
    return (
        <Button variant="outline"  onClick={handleNavigateToReport}>
            <Mail className=" h-4 w-4"/>
        </Button>

    );
}

export default BerichtGenerierung;