import React, { useState } from 'react';
import { statusColor } from '../../utility_functions/statusColor';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const ReservationStatusCounts = ({ counts, handleToggle }) => {
    const countsArray = Object.entries(counts);
    const [currentStatus, setCurrentStatus] = useState('all');

    const handleToggleLocal = (status) => {
        setCurrentStatus(status);
        handleToggle(`status=${status.toLowerCase()}&`)
    }

    return (
        <Box display='flex' alignItems='center' gap={2}>
            <Box
                onClick={() => handleToggleLocal('all')}
                sx={{
                    borderRadius: 2,
                    border: currentStatus === 'all' ? undefined : '1px solid lightgray',
                    bgcolor: currentStatus === 'all' ? 'gray' : undefined,
                    color: currentStatus === 'all' ? 'white' : undefined,
                    px: 1.5,
                    py: .5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                All
            </Box>
            {countsArray.map(([status, count]) => <Box
                onClick={() => handleToggleLocal(status)}
                sx={{
                    borderRadius: 2,
                    border: currentStatus === status ? undefined : '1px solid lightgray',
                    bgcolor: currentStatus === status ? statusColor(status) : undefined,
                    color: currentStatus === status ? 'white' : undefined,
                    px: 1.5,
                    py: .5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
                key={status}
            >
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography>{count}</Typography>
                </Box>
                {status}
            </Box>)}
        </Box>
    );
};

export default ReservationStatusCounts;
