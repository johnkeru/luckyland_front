import { Box, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import Modal from '../../../utility_components/modal/Modal';

const GCashReferenceCode_Modal = ({ button, row }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            button={button}
            handleClose={handleOpen}
            handleOpen={handleOpen}
            open={open}
            maxWidth='sm'
            title={
                <Box mr={5}>
                    {row.customerName} GCash Referece Number
                </Box>
            }
            children={
                <>
                    <DialogContent dividers sx={{ width: '100%', bgcolor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={row.gCashRefNumberURL} alt="" height='550px' />
                    </DialogContent>
                </>
            }
        />
    )
}

export default GCashReferenceCode_Modal