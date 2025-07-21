import {useNavigate} from "react-router-dom";
import {Button} from "./ui/button";
import {FileText} from "lucide-react";


function BerichtDownloadButton() {

    const navigate = useNavigate();
    const handleNavigateToReport = () => {
        navigate("/bericht");
    }
    return (
        <Button variant="outline" onClick={handleNavigateToReport}>
            <FileText className=" h-4 w-4"/>
            Arztbericht generieren
        </Button>

    );
}

export default BerichtDownloadButton;