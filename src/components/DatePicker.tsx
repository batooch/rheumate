import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "./ui/button";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "./ui/calendar";

type DatePickerProps = {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

function DatePicker({date, setDate}: DatePickerProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP") : <span style={{ color: "#999999" }}>Datum auswählen</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white z-50 shadow-md border rounded">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>

        </Popover>
    );
}

export default DatePicker;