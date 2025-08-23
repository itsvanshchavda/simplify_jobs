import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const DeletePopup = ({ open, setOpen, loading, handleDelete }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent zIndex={100} className="w-[90%] sm:w-full font-circular rounded-2xl">
                <DialogHeader className="sr-only">
                    <DialogTitle className="text-base text-black/80 font-medium">
                        Delete Coverletter
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Are you sure you want to delete this coverletter?
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-start gap-2 py-4">
                    <div className="text-lg text-black/80 font-medium">
                        Delete Coverletter
                    </div>
                    <div className="font-normal text-sm text-muted-foreground">
                        Are you sure you want to delete this coverletter? You won't be able to undo this action.



                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                        className="flex-1 min-w-0"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        No
                    </Button>

                    <Button
                        style={{ outline: "none" }}
                        onClick={handleDelete}
                        className="bg-[#E11D48] hover:bg-[#e11d47c2] hover:text-white  flex-1 min-w-0 font-medium text-white"
                        disabled={loading}
                    >
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        {loading ? "Deleting..." : "Yes, delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeletePopup;