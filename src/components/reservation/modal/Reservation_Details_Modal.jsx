import { Box, Button, DialogContent, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { LuUserCircle } from "react-icons/lu";
import { MdEmail, MdOutlineBedroomParent } from "react-icons/md";
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import { statusColor } from '../../../utility_functions/statusColor';
import { formatDateRange } from '../../../utility_functions/formatTime';
import { BsCalendar2Date } from "react-icons/bs";
import { PiHashStraightBold } from "react-icons/pi";
import { FaPesoSign } from "react-icons/fa6";

const Reservation_Details_Modal = ({ data, button, onClick }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loading, setLoading] = useState(false);

    return (
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
                                <Box display='flex' ml={1} mb={.5} gap={1} alignItems='center'>
                                    <BsCalendar2Date color='gray' />
                                    <Typography variant='body1'>{formatDateRange(data.checkIn, data.checkOut)}</Typography>
                                </Box>
                                <Box display='flex' ml={1} gap={1} alignItems='center'>
                                    <PiHashStraightBold color='gray' />
                                    <Typography variant='body1'>{data.id}</Typography>
                                </Box>

                                {/* mid */}
                                <Box display='flex' gap={2} my={1} color='white'>
                                    <Box display='flex' bgcolor={blue[600]} borderRadius={2} width='100%'>
                                        <Box px={1} py={3} width='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Box textAlign='center'>
                                                <Typography variant='h5' mb={1}>{data.adult}</Typography>
                                                <Typography>Adult/s</Typography>
                                            </Box>
                                        </Box>
                                        <Box px={1} py={3} width='100%' display='flex' alignItems='center' justifyContent='center' borderRight='1px solid #ddd' borderLeft='1px solid #ddd'>
                                            <Box textAlign='center'>
                                                <Typography variant='h5' mb={1}>{data.children}</Typography>
                                                <Typography>Child/ren</Typography>
                                            </Box>
                                        </Box>
                                        <Box px={1} py={3} width='100%' display='flex' alignItems='center' justifyContent='center'>
                                            <Box textAlign='center'>
                                                <Typography variant='h5' mb={1}>{data.seniors}</Typography>
                                                <Typography>Senior/s</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box bgcolor={blue[600]} width='40%' display='flex' alignItems='center' justifyContent='center' borderRadius={2}>
                                        <Box textAlign='center'>
                                            <Typography variant='h6' mb={1}>{data.room}</Typography>
                                            <MdOutlineBedroomParent fontSize='1.5rem' />
                                        </Box>
                                    </Box>
                                </Box>
                                {/* mid */}

                                <Box display='flex' ml={1} gap={1} alignItems='center'>
                                    Amount Paid:
                                    <Box display='flex' alignItems='center'>
                                        <FaPesoSign color='gray' />
                                        <Typography variant='body1'>{data.amountPaid}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {data.gCashRefNumber ? <Typography fontSize='1.5rem'>
                                GCASH Reference #: {data.gCashRefNumber}
                            </Typography> : undefined}

                        </Box>
                    </DialogContent>

                    <CommonFooter>

                        <Button
                            color="error"
                            variant='text'
                            onClick={handleClose}
                        >
                            Close
                        </Button>

                        {
                            data.status === 'Pending' ?
                                <ButtonWithLoading
                                    color='info'
                                    type="submit"
                                    loadingText='Approving...'
                                >
                                    Approved
                                </ButtonWithLoading> :
                                <ButtonWithLoading
                                    color='inherit'
                                    type="submit"
                                    loadingText='Departing...'
                                >
                                    Depart
                                </ButtonWithLoading>
                        }
                    </CommonFooter>
                </>
            }
        />
    )
}

export default Reservation_Details_Modal