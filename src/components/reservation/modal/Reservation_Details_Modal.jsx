import { Box, Button, DialogContent, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import { BsCalendar2Date, BsFillPersonFill } from "react-icons/bs";
import { FaLocationDot, FaPesoSign, FaPhone } from "react-icons/fa6";
import { IoIosCheckbox } from "react-icons/io";
import { IoPeople } from 'react-icons/io5';
import { LuUserCircle } from "react-icons/lu";
import { MdEmail, MdOutlineBedroomParent } from "react-icons/md";
import { PiHashStraightBold } from "react-icons/pi";
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import { formatDateRange } from '../../../utility_functions/formatTime';
import { statusColor } from '../../../utility_functions/statusColor';
import Return_Borrowed_Items_Modal from './Return_Borrowed_Items_Modal';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import { GrReturn } from "react-icons/gr";

const Reservation_Details_Modal = ({ data, button, configMethods }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentStatus, setCurrentStatus] = useState('');

    const [loading, setLoading] = useState(false);

    const [openBorrowedModal, setOpenBorrowedModal] = useState(false);
    const handleCloseOpenBorrowedModal = () => setOpenBorrowedModal(false);

    const handleUpdateStatus = (status) => {
        if (status === 'Depart') {
            if (data.borrowedItems.length !== 0) {
                setOpenBorrowedModal(true);
                return;
            }
        }
        setCurrentStatus(status);
        configMethods.updateStatus(data.id, { status }, setLoading, handleClose);
    }

    return (
        <>

            {
                openBorrowedModal ? <Return_Borrowed_Items_Modal
                    configMethods={configMethods}
                    borrowedItems={data.borrowedItems}
                    handleCloseOpenBorrowedModal={handleCloseOpenBorrowedModal}
                    openBorrowedModal={openBorrowedModal}
                    customerId={data.customerId}
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
                                            {!!data.isWalkIn ? <Box display='flex' ml={1} gap={1} alignItems='center' title='total paid'>
                                                <FaPesoSign color='gray' />
                                                <Typography variant='body1'>{data.amountPaid}</Typography>
                                            </Box> : undefined}
                                            <Box display='flex' ml={1} gap={1} alignItems='center' title='guest no.'>
                                                {data.guestNo > 1 ? <IoPeople color='gray' /> : <BsFillPersonFill color='gray' />}
                                                <Typography variant='body1'>{data.guestNo}</Typography>
                                            </Box>

                                            <Box display='flex' ml={1} gap={1} alignItems='center' title='guest no.'>
                                                {data.amountPaid === data.price ? <>
                                                    <IoIosCheckbox color='gray' />
                                                    <Typography variant='body1'>Paid</Typography>
                                                </> : <Typography variant='body1'>{`Balance: ₱${data.price - data.amountPaid}`}</Typography>}
                                            </Box>

                                        </Box>
                                        {
                                            (data.status !== 'Cancelled') ? <Box width='60%'>
                                                <Box display='flex' gap={2} alignItems='center'>
                                                    <Typography gutterBottom>Borrowed {data.borrowedItems.length || ''} Items: </Typography>
                                                    {data.borrowedItems.length !== 0 ? <ButtonIcon onClick={() => setOpenBorrowedModal(true)} children={<GrReturn />} title='return items' /> : undefined}
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
                                    {/* mid */}
                                    <Box display='flex' gap={1} my={1} color='white'>
                                        <Box display='flex' bgcolor={blue[300]} borderRadius={1} width='100%'>
                                            <Box px={1} py={2} width='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Box textAlign='center'>
                                                    <Typography variant='h5' mb={1}>{data.adult}</Typography>
                                                    <Typography>Adult/s</Typography>
                                                </Box>
                                            </Box>
                                            {data.children ? <Box px={1} py={2} width='100%' display='flex' alignItems='center' justifyContent='center' borderRight='1px solid #ddd' borderLeft='1px solid #ddd'>
                                                <Box textAlign='center'>
                                                    <Typography variant='h5' mb={1}>{data.children}</Typography>
                                                    <Typography>Child/ren</Typography>
                                                </Box>
                                            </Box> : undefined}
                                            {data.seniors ? <Box px={1} py={2} width='100%' display='flex' alignItems='center' justifyContent='center'>
                                                <Box textAlign='center'>
                                                    <Typography variant='h5' mb={1}>{data.seniors}</Typography>
                                                    <Typography>Senior/s</Typography>
                                                </Box>
                                            </Box> : undefined}
                                        </Box>
                                        <Box bgcolor={blue[300]} width='30%' display='flex' alignItems='center' justifyContent='center' borderRadius={1}>
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
        </>
    )
}

export default Reservation_Details_Modal