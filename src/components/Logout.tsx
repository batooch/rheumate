import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { AuthContext } from "@/context/authContext";

function Logout() {
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            <LogOutIcon className="h-4 w-4" />
        </Button>
    );
}

export default Logout;
