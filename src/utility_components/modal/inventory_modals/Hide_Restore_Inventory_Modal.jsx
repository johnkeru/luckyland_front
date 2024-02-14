import {
    Button,
    DialogContent,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import ButtonWithLoading from '../../ButtonWithLoading';
import CommonFooter from "../CommonFooter";
import Modal from "../Modal";

export default function Hide_Restore_Inventory_Modal({ button, data, onClick, restore }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleSubmit = () => {
        onClick(data.id, setLoading, handleOpen);
    }

    return (
        <>

            <Modal
                button={button}
                handleClose={handleOpen}
                handleOpen={handleOpen}
                open={open}
                maxWidth="sm"
                title={`${!restore ? 'Delete' : 'Restore'} ${data.productName}`}
                loading={loading}
                children={
                    <>
                        <DialogContent dividers>
                            <Typography variant="body1">
                                {!restore ? `Are you sure you want to delete ${data.productName}? 
    Please note that this will expire within the next 30 days. 
    You can restore it later if needed.` :
                                    `Are you sure you want to restore ${data.productName}?`}
                            </Typography>
                        </DialogContent>
                        <CommonFooter>
                            <Button
                                variant="contained" size='medium'
                                color="info"
                                onClick={handleOpen}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <ButtonWithLoading
                                size='medium'
                                loading={loading}
                                color={!restore ? "error" : 'success'}
                                loadingText={!restore ? 'Deleting...' : 'Restoring...'}
                                onClick={handleSubmit}
                            >
                                {!restore ? 'Delete' : 'Restore'}
                            </ButtonWithLoading>
                        </CommonFooter>
                    </>
                }
            />
        </>
    );
}
