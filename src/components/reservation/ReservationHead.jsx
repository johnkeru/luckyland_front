import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import TableSearchBar from '../../utility_components/table/TableSearchBar';
import ReservationStatusCounts from './ReservationStatusCounts';

const ReservationHead = ({ configMethods }) => {
    const nav = useNavigate();

    return (
        <Box p={3} >
            <Typography variant="h4" gutterBottom color='info.main'>Reservation Management</Typography>
            <Typography variant="body1" gutterBottom>
                Seamlessly manage reservations for the resort. Stay organized with booking schedules, efficiently allocate resources, and provide exceptional guest experiences.
            </Typography>
            <Box mt={2} display='flex' alignItems='center' justifyContent='space-between'>
                <ReservationStatusCounts counts={configMethods.counts} handleToggle={configMethods.handleToggle} />

                <Box display='flex' gap={2} alignItems='center'>
                    <TableSearchBar configMethods={configMethods} />
                    <Button onClick={() => nav('/create-reservation')} variant='contained'>Walk In Reservation</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ReservationHead