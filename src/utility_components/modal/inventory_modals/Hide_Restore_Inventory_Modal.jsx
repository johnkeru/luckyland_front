import React, { cloneElement, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function Hide_Restore_Inventory_Modal({ button, data, onClick, restore }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = () => {
        onClick(data.id, setLoading, handleOpen);
    }

    return (
        <>
            {cloneElement(button, { onClick: handleOpen })}

            <Dialog open={open} handler={loading ? undefined : handleOpen} className="px-3" size="sm" >
                <DialogHeader>{!restore ? 'Delete' : 'Restore'} {data.productName}</DialogHeader>
                <DialogBody>
                    {!restore ? `Are you sure you want to delete ${data.productName}? 
    Please note that this will expire within the next 30 days. 
    You can restore it later if needed.` :
                        `Are you sure you want to restore ${data.productName}?`}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" loading={loading} color={!restore ? "red" : 'green'} onClick={handleSubmit}>
                        <span>{!restore ? 'Delete' : 'Restore'}</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
