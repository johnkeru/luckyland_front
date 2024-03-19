import { Box, Button, DialogContent, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { LuUserCircle } from "react-icons/lu";
import { MdEmail, MdOutlineBedroomParent } from "react-icons/md";
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import { statusColor } from '../../../utility_functions/statusColor';
import { formatDateRange } from '../../../utility_functions/formatTime';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import { BsCalendar2Date, BsFillPersonFill } from "react-icons/bs";
import { PiHashStraightBold } from "react-icons/pi";
import { FaPesoSign } from "react-icons/fa6";
import { IoPeople } from 'react-icons/io5';

const Reservation_Details_Modal = ({ data, button, updateStatus }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentStatus, setCurrentStatus] = useState('');

    const [loading, setLoading] = useState(false);
    const [borrowedItems, setBorrowedItems] = useState([]);

    const handleUpdateStatus = (status) => {
        setCurrentStatus(status);
        updateStatus(data.id, { status }, setLoading, handleClose);
    }

    useEffect(() => {
        let timer;
        if (open) {
            const delay = 500;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                basicGetCall({
                    endpoint: `api/reservations/getCustomerWhoBorrows/${data.customerId}`,
                    setLoading, // this will cause the parent button to disabled
                    setDataDirectly: setBorrowedItems
                });
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [open]);

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            draggable
            maxWidth='lg'
            title="Reservation Details"
            loading={loading}
            children={
                <>
                    <DialogContent dividers>
                        <Box width='600px'>
                            <Box display='flex' justifyContent='space-between' alignItems='start' width='100%'>

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
                                    <Box>
                                        <Box display='flex' ml={1} mb={.5} gap={1} alignItems='center' title='reservation date'>
                                            <BsCalendar2Date color='gray' />
                                            <Typography variant='body1'>{formatDateRange(data.checkIn, data.checkOut)}</Typography>
                                        </Box>
                                        <Box display='flex' ml={1} gap={1} alignItems='center' title='reservation id'>
                                            <PiHashStraightBold color='gray' />
                                            <Typography variant='body1'>{data.hash}</Typography>
                                        </Box>
                                        <Box display='flex' ml={1} gap={1} alignItems='center' title='total paid'>
                                            <FaPesoSign color='gray' />
                                            <Typography variant='body1'>{data.amountPaid}</Typography>
                                        </Box>
                                        <Box display='flex' ml={1} gap={1} alignItems='center' title='guest no.'>
                                            {data.guestNo > 1 ? <IoPeople color='gray' /> : <BsFillPersonFill color='gray' />}
                                            <Typography variant='body1'>{data.guestNo}</Typography>
                                        </Box>
                                    </Box>
                                    <Box width='60%'>
                                        <Typography gutterBottom>Borrowed Items: </Typography>
                                        {
                                            borrowedItems.length !== 0 ?
                                                borrowedItems.map(borrowedItem => (
                                                    <Typography key={borrowedItem.productName} variant="body2" mb={.4} color='GrayText'>• {borrowedItem.productName} ({borrowedItem.borrowed_quantity})</Typography>
                                                )) :
                                                <Typography variant="body2" mb={.4} color='GrayText'>No items borrowed.</Typography>
                                        }
                                    </Box>
                                </Box>
                                {/* mid */}
                                <Box display='flex' gap={1} my={1} color='white'>
                                    <Box display='flex' bgcolor={blue[400]} borderRadius={2} width='100%'>
                                        <Box px={1} py={3} width='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Box textAlign='center'>
                                                <Typography variant='h5' mb={1}>{data.adult}</Typography>
                                                <Typography>Adult/s</Typography>
                                            </Box>
                                        </Box>
                                        {data.children ? <Box px={1} py={3} width='100%' display='flex' alignItems='center' justifyContent='center' borderRight='1px solid #ddd' borderLeft='1px solid #ddd'>
                                            <Box textAlign='center'>
                                                <Typography variant='h5' mb={1}>{data.children}</Typography>
                                                <Typography>Child/ren</Typography>
                                            </Box>
                                        </Box> : undefined}
                                        {data.seniors ? <Box px={1} py={3} width='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Box textAlign='center'>
                                                <Typography variant='h5' mb={1}>{data.seniors}</Typography>
                                                <Typography>Senior/s</Typography>
                                            </Box>
                                        </Box> : undefined}
                                    </Box>
                                    <Box bgcolor={blue[400]} width='30%' display='flex' alignItems='center' justifyContent='center' borderRadius={2}>
                                        <Box textAlign='center'>
                                            <Typography variant='h6' mb={1}>{data.room}</Typography>
                                            <MdOutlineBedroomParent fontSize='1.5rem' />
                                        </Box>
                                    </Box>
                                </Box>
                                {/* mid */}
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
                                data.status === 'Pending' ||
                                data.status === 'Approved'
                            ) ? <ButtonWithLoading
                                loading={loading && currentStatus === 'Cancelled'}
                                disabled={loading}
                                color='error'
                                loadingText='Cancelling...'
                                onClick={() => handleUpdateStatus('Cancelled')}
                            >
                                Cancelled
                            </ButtonWithLoading> : undefined}
                            {
                                data.status === 'Pending' ?
                                    <ButtonWithLoading
                                        loading={loading && currentStatus === 'Approved'}
                                        disabled={loading}
                                        color='info'
                                        loadingText='Approving...'
                                        onClick={() => handleUpdateStatus('Approved')}
                                    >
                                        Approved
                                    </ButtonWithLoading> :
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
                                                loading={loading && currentStatus === 'Depart'}
                                                disabled={loading}
                                                color='inherit'
                                                loadingText='Departing...'
                                                onClick={() => handleUpdateStatus('Depart')}
                                            >
                                                Depart
                                            </ButtonWithLoading> :
                                            undefined
                            }
                        </Box>
                    </CommonFooter>
                </>
            }
        />
    )
}

export default Reservation_Details_Modal