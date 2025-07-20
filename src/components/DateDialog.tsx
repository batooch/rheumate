import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import DatePicker from "@/components/DatePicker.tsx";

type DateDialogProps = {
    label: string;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

function DateDialog({label, date, setDate}: DateDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <DatePicker date={date} setDate={setDate}/>
                <DialogClose>
                    <Button className="mt-4">Fertig</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>


    );
}

export default DateDialog;