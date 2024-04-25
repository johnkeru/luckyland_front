import React from "react";
import Modal from '../../../utility_components/modal/Modal';
import { formatDate } from '../../../utility_functions/formatTime';
import { Box, DialogContent, Typography } from "@mui/material";

export default function View_Inventory_Modal({ data, button }) {
    const item = data;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            button={button}
            handleClose={handleOpen}
            maxWidth="lg"
            handleOpen={handleOpen}
            open={open}
            title={`${item.name} Detail`}
            children={
                <DialogContent dividers>
                    <Box sx={{ width: { xs: '100%', sm: '400px' } }}>
                        <Typography variant="h5" color="primary" gutterBottom>{item.name}</Typography>
                        <Typography variant="body1" color="text.secondary">Price: ${item.price}</Typography>
                        <Typography variant="body1" color="text.secondary">Description: {item.description}</Typography>
                        <Typography variant="body1" color="text.secondary">Current Quantity: {item.currentQuantity}</Typography>
                        <Typography variant="body1" color={item.status === 'In Stock' ? 'success.main' : 'error.main'}>Status: {item.status}</Typography>
                        <Typography variant="body1" color="text.secondary">Last Check: {formatDate(new Date(item.lastCheck))}</Typography>
                        <Typography variant="body1" color="text.secondary">Categories: {item.categories.map(category => category.name).join(', ')}</Typography>
                    </Box>
                </DialogContent>
            } />
    );
}
