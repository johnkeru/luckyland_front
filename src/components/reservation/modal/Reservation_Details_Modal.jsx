import { Box, Button, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { GiDuration } from "react-icons/gi";
import { GrReturn } from "react-icons/gr";
import { MdBed } from 'react-icons/md';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import GCashIcon from '../../../utility_components/icons/GCashIcon';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import formatPrice from '../../../utility_functions/formatPrice';
import { formatMonth } from '../../../utility_functions/formatTime';
import Return_Borrowed_Items_Modal from './Return_Borrowed_Items_Modal';

import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { BsCalendarDate, BsHouseDoor } from 'react-icons/bs';
import { FaBalanceScale, FaMoneyBillAlt, FaMoneyCheck, FaPhone, FaUmbrellaBeach } from 'react-icons/fa';
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { PiIdentificationBadge } from "react-icons/pi";
import { RiRadioButtonLine } from "react-icons/ri";


const Reservation_Details_Modal = ({ data, button, configMethods }) => {
    const status = data.status;
    const APPROVED = 'Approved';
    const CANCELLED = 'Cancelled';
    const IN_RESORT = 'In Resort';
    const DEPARTED = 'Departed';

    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);
    const [currentStatus, setCurrentStatus] = useState('');

    const [loading, setLoading] = useState(false);

    const isBorrowedOk = data.borrowedItems.find(item => !item.paid);

    const [openBorrowedModal, setOpenBorrowedModal] = useState(false);
    const handleCloseOpenBorrowedModal = () => setOpenBorrowedModal(false);

    const handleUpdateStatus = (status) => {
        if (status === DEPARTED) {
            if (data.borrowedItems.length !== 0 && data.borrowedItems.some(item => !item.paid)) {
                setOpenBorrowedModal(true);
                return;
            }
        }
        setCurrentStatus(status);
        configMethods.updateStatus(data.id, { status }, setLoading, handleClose);
    }

    const handleCancelled = (status) => {
        if (status === DEPARTED) {
            if (data.borrowedItems.length !== 0 && !data.borrowedItems.some(item => !item.paid)) {
                setOpenBorrowedModal(true);
                return;
            }
        }
        setCurrentStatus(status);
        configMethods.handleCancel(data.id, setLoading, handleClose);
    }

    const dialogBgColor = status === CANCELLED ? 'error.main' : status === APPROVED ? 'info.main' : status === IN_RESORT ? 'success.main' : 'background.paper2';
    const dialogTextColor = status === CANCELLED ? 'error.contrastText' : status === APPROVED ? 'info.contrastText' : status === IN_RESORT ? 'success.contrastText' : 'inherit';

    return (
        <>

            {
                openBorrowedModal ? <Return_Borrowed_Items_Modal
                    configMethods={configMethods}
                    borrowedItems={data.borrowedItems}
                    handleCloseOpenBorrowedModal={handleCloseOpenBorrowedModal}
                    openBorrowedModal={openBorrowedModal}
                    data={data}
                /> : undefined
            }

            <Modal
                button={button}
                handleClose={handleToggle}
                handleOpen={handleToggle}
                open={open}
                maxWidth='lg'
                overrideTitle={<DialogTitle sx={{
                    fontWeight: 600,
                    bgcolor: dialogBgColor,
                    color: dialogTextColor
                }}>
                    Reservation Details
                </DialogTitle>}
                loading={loading}
                sx={{ opacity: openBorrowedModal ? 0 : 1 }}
                children={
                    <>
                        <DialogContent dividers>
                            <Box sx={{ width: '100%', display: 'flex', gap: 5 }}>
                                {/* Customer Information */}
                                <Box>
                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'info.main', }}>Customer Information</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <PiIdentificationBadge size={20} />
                                            <Typography variant="body1">
                                                <b>Reservation Code:</b> {data.hash}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <AiOutlineUser size={20} />
                                            <Typography variant="body1">
                                                <b>Name:</b> {data.customerName}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <AiOutlineMail size={20} />
                                            <Typography variant="body1">
                                                <b>Email:</b> {data.contactEmail}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <FaPhone size={20} />
                                            <Typography variant="body1">
                                                <b>Phone Number:</b> {data.contactPhoneNumber || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', }}>
                                            <BsHouseDoor size={20} />
                                            <Typography variant="body1">
                                                <b>Address:</b> {data.address}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Booking Dates */}
                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'info.main' }}>Reservation Details</Typography>

                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            {data.isWalkIn ? <FaPersonWalkingArrowRight size={20} /> : <RiRadioButtonLine size={20} />}
                                            <b>Reserved:</b>
                                            <Typography variant="body1" color={data.isWalkIn ? 'inherit' : 'success.main'}>
                                                {data.isWalkIn ? 'Walk-In' : 'Online'}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <BsCalendarDate size={20} />
                                            <Typography variant="body1">
                                                <b>Check-in:</b> {formatMonth(data.checkIn)} 2:00 PM
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <BsCalendarDate size={20} />
                                            <Typography variant="body1">
                                                <b>Check-out:</b> {formatMonth(data.checkOut)} 12:00 AM
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                            <GiDuration size={20} />
                                            <Typography variant="body1">
                                                <b>Day/s:</b> {data.days >= 1 ? data.days : 'Daytime'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Rooms */}
                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'info.main' }}>Rooms ({data.roomCounts})</Typography>
                                        {data.rooms.length !== 0 ? data.rooms.map((room) => (
                                            <Box key={room.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1, }}>
                                                <MdBed size={20} />
                                                <Typography variant="body1">
                                                    {room.name}
                                                </Typography>
                                            </Box>
                                        )) : 'No rooms reserved.'}
                                    </Box>

                                    {/* Cottages */}
                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'info.main' }}>Cottages ({data.cottageCounts})</Typography>
                                        {data.cottages.length !== 0 ? data.cottages.map((cottage) => (
                                            <Box key={cottage.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1, }}>
                                                <FaUmbrellaBeach size={20} />
                                                <Typography variant="body1">
                                                    {cottage.name}
                                                </Typography>
                                            </Box>
                                        )) : 'No cottages reserved.'}
                                    </Box>

                                    {/* Others */}
                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'info.main' }}>Others ({data.otherCounts})</Typography>
                                        {data.others.length !== 0 ? data.others.map((other) => (
                                            <Box key={other.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1, }}>
                                                <FaUmbrellaBeach size={20} />
                                                <Typography variant="body1">
                                                    {other.name}
                                                </Typography>
                                            </Box>
                                        )) : 'No others reserved.'}
                                    </Box>
                                </Box>

                                <Box>
                                    {/* Payment Information */}
                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Typography variant="h6" gutterBottom sx={{ color: 'info.main' }}>Payment Information</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <GCashIcon height={20} width={20} />
                                            <Typography variant="body1">
                                                <b>GCash Ref Number:</b> {data.gCashRefNumber || 'N/A'}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <FaMoneyBillAlt size={20} />
                                            <Typography variant="body1">
                                                <b>Total Amount:</b> ₱{formatPrice(data.total)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                            <FaMoneyCheck size={20} />
                                            <Typography variant="body1">
                                                <b>Amount Paid:</b> ₱{formatPrice(data.paid)}
                                            </Typography>
                                        </Box>
                                        {
                                            status !== CANCELLED ? <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                                                <FaBalanceScale size={20} />
                                                <Typography variant="body1">
                                                    <b>Remaining Balance:</b> ₱{formatPrice(data.balance)}
                                                </Typography>
                                            </Box>
                                                : undefined
                                        }
                                        <Typography variant="body1">
                                            <b>Refund:</b> {data.refund ? `₱${data.refund}` : 'N/A'}
                                        </Typography>
                                    </Box>

                                    <Box p={1} borderBottom='1px solid #ddd'>
                                        <Box display='flex' alignItems='center' gap={2}>
                                            <Typography variant="h6" gutterBottom sx={{ color: 'info.main' }}>Borrowed {data.borrowedItems.length || ''} Items</Typography>
                                            {
                                                (
                                                    status === IN_RESORT &&
                                                    data.borrowedItems.length !== 0 &&
                                                    isBorrowedOk
                                                ) ?
                                                    <ButtonIcon onClick={() => setOpenBorrowedModal(true)} children={<GrReturn />} title='return items' /> :
                                                    undefined}
                                        </Box>
                                        {
                                            (status === IN_RESORT || status === DEPARTED) ? <Box width='60%'>
                                                <Box>
                                                    {
                                                        data.borrowedItems.length !== 0 ?
                                                            data.borrowedItems.map(borrowedItem => (
                                                                <Typography
                                                                    display='flex'
                                                                    alignItems='center'
                                                                    gap={.5}
                                                                    gutterBottom
                                                                    key={borrowedItem.id}
                                                                    color={!!borrowedItem.paid ? 'gray' : undefined}
                                                                    title={!!borrowedItem.paid ? 'paid' : ''}
                                                                >{
                                                                        !!borrowedItem.paid ?
                                                                            <BiSolidCheckboxChecked size={25} /> :
                                                                            undefined}
                                                                    {borrowedItem.name} ({borrowedItem.borrowed_quantity})
                                                                </Typography>
                                                            )) :
                                                            <Typography variant="body2" mb={.4} color='GrayText'>No items borrowed.</Typography>
                                                    }
                                                </Box>
                                            </Box> : 'N/A'
                                        }
                                    </Box>

                                </Box>
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
                                    status === APPROVED
                                ) ? <ButtonWithLoading
                                    loading={loading && currentStatus === CANCELLED}
                                    disabled={loading}
                                    color='error'
                                    loadingText='Cancelling...'
                                    onClick={() => handleCancelled(CANCELLED)}
                                >
                                    Cancelled
                                </ButtonWithLoading> : undefined}
                                {
                                    status === APPROVED ?
                                        <ButtonWithLoading
                                            loading={loading && currentStatus === IN_RESORT}
                                            // disabled={loading || !isTodayAfter2PM(data.checkOut)}
                                            color='success'
                                            loadingText='In Resort...'
                                            onClick={() => handleUpdateStatus(IN_RESORT)}
                                        >
                                            In Resort
                                        </ButtonWithLoading> :
                                        status === IN_RESORT ?
                                            <ButtonWithLoading
                                                loading={loading && currentStatus === DEPARTED}
                                                disabled={loading}
                                                color='inherit'
                                                loadingText='Checking out...'
                                                onClick={() => handleUpdateStatus(DEPARTED)}
                                            >
                                                Check Out
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





