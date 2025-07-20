import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";

function NavigationBackButton() {
    const navigate = useNavigate();

    return (
        <Button
            variant="outline"
            size="icon"
            className="text-[#145A64] border-[#145A64] hover:bg-[#e0f7fc] rounded-full mb-2"
            onClick={() => navigate(-1)}
        >
            <ArrowLeft className="h-5 w-5"/>
        </Button>
    );
}

export default NavigationBackButton;
