import React, { useState } from 'react'
import Modal from '../../../../utility_components/modal/Modal'
import { Button, DialogContent, DialogActions, Box, Typography } from '@mui/material'

const RoomModalReadMore = ({ room }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            title={room.name}
            handleClose={handleOpen}
            handleOpen={handleOpen}
            open={open}
            transition
            maxWidth="xl"
            sx={{
                '& .MuiDialog-paper': {
                    marginTop: '-10%', // Adjust as needed
                },
            }}
            button={<Button variant="contained" color="inherit" sx={{ mt: 4 }}>Read More</Button>}
            children={
                <>
                    <DialogContent dividers sx={{ width: '700px' }}>
                        <Box px={2} pb={2}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Description
                            </Typography>
                            <Typography >
                                {room.description}
                            </Typography>
                            <Typography variant="h6" fontWeight={600} gutterBottom mt={3}>
                                Extra Pax and Child Policy
                            </Typography>
                            {
                                room.policies.map(policy => (
                                    <Typography variant="body1" key={policy.id}>
                                        • {policy.name}
                                    </Typography>
                                ))
                            }
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

export default RoomModalReadMore