import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import TableSearchBar from '../../utility_components/table/TableSearchBar';
import ReservationStatusCounts from './ReservationStatusCounts';

const ReservationHead = ({ configMethods, isAllow }) => {
    const nav = useNavigate();

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom color='info.main'>Reservation Management</Typography>
            <Typography variant="body1" gutterBottom>
                Seamlessly manage reservations for the resort. Stay organized with booking schedules, efficiently allocate resources, and provide exceptional guest experiences.
            </Typography>
            <Box
                mt={2}
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'stretch', md: 'center' }}
                justifyContent="space-between"
                gap={{ xs: 2, md: 0 }}
            >
                <ReservationStatusCounts counts={configMethods.counts} handleToggle={configMethods.handleToggle} />

                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} alignItems={{ xs: 'stretch', md: 'center' }}>
                    <TableSearchBar configMethods={configMethods} />
                    {isAllow && (
                        <Button
                            onClick={() => nav('/create-reservation')}
                            variant="contained"
                            sx={{ width: { xs: '100%', md: 'auto' } }}
                        >
                            Walk In Reservation
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default ReservationHead;
