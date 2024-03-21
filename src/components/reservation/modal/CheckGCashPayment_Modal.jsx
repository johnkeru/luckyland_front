import React, { useState } from 'react'
import BasicInputNumber from '../../../utility_components/BasicInputNumber'
import Modal from '../../../utility_components/modal/Modal'
import { Box, DialogContent, Typography } from '@mui/material';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';

const CheckGCashPayment_Modal = ({ button, configMethods, row }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setAmount(0);
    };

    const [amount, setAmount] = useState(0);
    const handleChange = (amount) => {
        setAmount(amount);
    }

    const handleUpdatePayment = () => {
        configMethods.handleGCashPayment(row.id, { amount: parseInt(amount) }, setLoading, handleClose);
    }

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            maxWidth='sm'
            title={
                <Box mr={5}>
                    Check GCash Reference
                </Box>
            }
            loading={loading}
            children={
                <>
                    <DialogContent dividers>
                        <Typography gutterBottom variant='h6' fontWeight={600}>
                            GCash Referece #: {row.gCashRefNumber}
                        </Typography>
                        <Typography gutterBottom>
                            Current amount: ₱{row.amountPaid}
                        </Typography>
                        <Typography gutterBottom>
                            Please ensure to verify the GCash number reference before proceeding to input the corresponding amount.
                        </Typography>

                        <BasicInputNumber
                            fullWidth
                            defaultValue={amount}
                            onChange={e => handleChange(e.target.value)}
                        />
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            loading={loading}
                            disabled={loading}
                            color='info'
                            loadingText='Updating Inital payment...'
                            onClick={handleUpdatePayment}
                        >
                            Update inital payment
                        </ButtonWithLoading>
                    </CommonFooter>
                </>
            }
        />
    )
}

export default CheckGCashPayment_Modal