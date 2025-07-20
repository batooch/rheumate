import {useNavigate} from "react-router-dom";
import {Button} from "./ui/button";
import {FileText} from "lucide-react";


function ButtonUserKISum() {

    const navigate = useNavigate();
    const handleNavigateToReport = () => {
        navigate("/user/ki/sum");
    }
    return (
        <Button variant="outline" onClick={handleNavigateToReport}>
            <FileText className=" h-4 w-4"/>
            Deine Symptome zusammengefasst
        </Button>

    );
}

export default ButtonUserKISum;