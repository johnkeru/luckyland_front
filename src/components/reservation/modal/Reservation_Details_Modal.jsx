import { Box, Button, DialogContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { GrReturn } from "react-icons/gr";
import { LuUserCircle } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import ButtonIcon from '../../../utility_components/ButtonIcon';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import formatPrice from '../../../utility_functions/formatPrice';
import { formatDateRange } from '../../../utility_functions/formatTime';
import { statusColor } from '../../../utility_functions/statusColor';
import Return_Borrowed_Items_Modal from './Return_Borrowed_Items_Modal';

const Reservation_Details_Modal = ({ data, button, configMethods }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentStatus, setCurrentStatus] = useState('');

    const [loading, setLoading] = useState(false);

    const [openBorrowedModal, setOpenBorrowedModal] = useState(false);
    const handleCloseOpenBorrowedModal = () => setOpenBorrowedModal(false);
    const handleCloseAll = () => {
        handleCloseOpenBorrowedModal();
        handleClose();
    }

    const handleUpdateStatus = (status) => {
        if (status === 'Departed') {
            if (data.borrowedItems.length !== 0) {
                setOpenBorrowedModal(true);
                return;
            }
        }
        setCurrentStatus(status);
        configMethods.updateStatus(data.id, { status }, setLoading, handleClose);
    }

    const handleCancelled = (status) => {
        if (status === 'Departed') {
            if (data.borrowedItems.length !== 0) {
                setOpenBorrowedModal(true);
                return;
            }
        }
        setCurrentStatus(status);
        configMethods.handleCancelled(data.id, setLoading, handleClose);
    }
    return (
        <>

            {
                openBorrowedModal ? <Return_Borrowed_Items_Modal
                    configMethods={configMethods}
                    borrowedItems={data.borrowedItems}
                    handleCloseOpenBorrowedModal={handleCloseOpenBorrowedModal}
                    handleCloseAll={handleCloseAll}
                    openBorrowedModal={openBorrowedModal}
                    data={data}
                /> : undefined
            }

            <Modal
                button={button}
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
                maxWidth='lg'
                title="Reservation Details"
                loading={loading}
                children={
                    <>
                        <DialogContent dividers>
                            <Box width='500px'>

                                <Box display='flex' justifyContent='space-between' width='100%'>
                                    <Box display='flex' gap={3}>
                                        <LuUserCircle fontSize='70px' color='gray' />
                                        <Box mr={3}>
                                            <Typography variant='h5'>{data.customerName}</Typography>
                                            <Box display='flex' gap={1} alignItems='center'>
                                                <FaPhone color='gray' />
                                                <Typography variant='body1'>{data.contactPhoneNumber}</Typography>
                                            </Box>
                                            <Box display='flex' gap={1} alignItems='center'>
                                                <MdEmail color='gray' />
                                                <Typography variant='body1'>{data.contactEmail}</Typography>
                                            </Box>
                                            <Box display='flex' gap={1} alignItems='center'>
                                                <FaLocationDot color='gray' />
                                                <Typography variant='body1'>{data.address}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography fontSize='2.2rem' color={statusColor(data.status)}>
                                            {data.status}
                                        </Typography>
                                        <Typography variant='body1'>({!!data.isWalkIn ? 'Walk In' : 'Online'})</Typography>
                                    </Box>
                                </Box>

                                <Box my={3} >
                                    <Box display='flex' justifyContent='space-between'>
                                        <Box width='100%'>
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Date:</span> {formatDateRange(data.checkIn, data.checkOut)}</Typography>
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>ID:</span> {data.hash}</Typography>
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Total amount:</span> ₱{formatPrice(data.price)}</Typography>
                                            {data.status === 'Cancelled' ? <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Refund:</span> ₱{formatPrice(data?.refund || 0)}</Typography> : undefined}
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Paid:</span> ₱{formatPrice(data.amountPaid)}</Typography>
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Guest/s:</span> {data.guestNo}</Typography>
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Status:</span> {data.status === 'Cancelled' ? 'cancelled' : data.amountPaid === data.price ? 'Paid' : 'Not fully paid'}</Typography>
                                        </Box>
                                        {data?.cottage ? <Box width='100%'>
                                            <Typography variant='body2'><span style={{ fontWeight: 600, marginRight: '5px' }}>Cottage:</span> {data.cottage}</Typography>
                                        </Box> : undefined}
                                        {
                                            (data.status === 'In Resort' || data.status === 'Departed') ? <Box width='60%'>
                                                <Box display='flex' gap={2} alignItems='center' width='100%'>
                                                    <Typography gutterBottom>Borrowed {data.borrowedItems.length || ''} Items: </Typography>
                                                    {data.status === 'In Resort' && data.borrowedItems.length !== 0 ? <ButtonIcon onClick={() => setOpenBorrowedModal(true)} children={<GrReturn />} title='return items' /> : undefined}
                                                </Box>
                                                <Box display='flex' flexWrap='wrap'>
                                                    {
                                                        data.borrowedItems.length !== 0 ?
                                                            data.borrowedItems.map(borrowedItem => (
                                                                <Typography mr={1.5} mb={.4} key={borrowedItem.productName} variant="body2" color='GrayText'>{borrowedItem.productName} ({borrowedItem.borrowed_quantity})</Typography>
                                                            )) :
                                                            <Typography variant="body2" mb={.4} color='GrayText'>No items borrowed.</Typography>
                                                    }
                                                </Box>
                                            </Box> : undefined
                                        }
                                    </Box>
                                </Box>

                                {data.gCashRefNumber ? <Typography fontSize='1.3rem'>
                                    GCASH Reference #: {data.gCashRefNumber}
                                </Typography> : undefined}

                            </Box>
                        </DialogContent>

                        <CommonFooter sx={{ display: 'flex', justifyContent: 'space-between' }}>

                            <Button
                                color="error"
                                variant='text'
                                disabled={loading}
                                onClick={handleClose}
                            >
                                Close
                            </Button>

                            <Box display='flex' gap={1}>
                                {(
                                    data.status === 'Approved'
                                ) ? <ButtonWithLoading
                                    loading={loading && currentStatus === 'Cancelled'}
                                    disabled={loading}
                                    color='error'
                                    loadingText='Cancelling...'
                                    onClick={() => handleCancelled('Cancelled')}
                                >
                                    Cancelled
                                </ButtonWithLoading> : undefined}
                                {
                                    data.status === 'Approved' ?
                                        <ButtonWithLoading
                                            loading={loading && currentStatus === 'In Resort'}
                                            disabled={loading}
                                            color='success'
                                            loadingText='In Resort...'
                                            onClick={() => handleUpdateStatus('In Resort')}
                                        >
                                            In Resort
                                        </ButtonWithLoading> :
                                        data.status === 'In Resort' ?
                                            <ButtonWithLoading
                                                loading={loading && currentStatus === 'Departed'}
                                                disabled={loading}
                                                color='inherit'
                                                loadingText='Departing...'
                                                onClick={() => handleUpdateStatus('Departed')}
                                            >
                                                Departed
                                            </ButtonWithLoading> :
                                            undefined
                                }
                            </Box>
                        </CommonFooter>
                    </>
                }
            />
        </>
    )
}

export default Reservation_Details_Modal