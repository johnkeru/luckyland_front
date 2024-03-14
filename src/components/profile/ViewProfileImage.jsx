import { Avatar, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';

export default function ViewProfileImage({ data }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Box onClick={handleClickOpen}>
                <Avatar
                    alt={data.firstName}
                    src={open ? '' : data?.image}
                    sx={{ width: 150, height: 150 }}
                />
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent', // Set the background color to transparent
                        boxShadow: 'none', // Remove the box shadow
                    }
                }}
            >
                <DialogContent>
                    <Avatar
                        alt={data.firstName}
                        src={data?.image}
                        sx={{ width: 400, height: 400, bgcolor: 'white' }}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}