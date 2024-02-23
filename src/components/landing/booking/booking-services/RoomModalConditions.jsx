import { Box, Button, DialogActions, DialogContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import Modal from '../../../../utility_components/modal/Modal';

const RoomModalConditions = ({ room, color }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            title='Publish Rate - Booking Conditions'
            handleClose={handleOpen}
            handleOpen={handleOpen}
            open={open}
            transition
            maxWidth="xl"
            sx={{
                '& .MuiDialog-paper': {
                    marginTop: '-20%', // Adjust as needed
                },
            }}
            button={<Button color="inherit" sx={{ p: 0, boxShadow: 'none', bgcolor: 'transparent', fontStyle: 'italic', color, fontSize: '13px', textTransform: 'capitalize', textDecoration: 'underline', ":hover": { bgcolor: 'transparent', textDecoration: 'underline' } }}>Conditions</Button>}
            children={
                <>
                    <DialogContent dividers sx={{ width: '700px' }}>
                        <Box>
                            <Typography mb={3}>Rebookable : {room.condition.rebookable ? 'Yes' : 'No'}</Typography>
                            <Typography>Cancellable : {room.condition.cancellable ? 'Yes' : 'No'}</Typography>
                            <Typography>{room.condition.cancelDescription}</Typography>
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button variant='contained' color='warning' onClick={handleOpen}>Close</Button>
                    </DialogActions>
                </>
            }
        />
    )
}

export default RoomModalConditions