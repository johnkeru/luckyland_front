import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import useBookingSummary from '../../../../hooks/useBookingSummary';

function RoomSelection() {
    const { guestInfo, setGuestInfo } = useBookingSummary();

    const handleAdultsChange = (e) => {
        setGuestInfo({
            ...guestInfo,
            adult: parseInt(e.target.value)
        });
    };

    const handleChildrenChange1 = (e) => {
        setGuestInfo({
            ...guestInfo,
            infant: parseInt(e.target.value)
        });
    };

    const handleChildrenChange2 = (e) => {
        setGuestInfo({
            ...guestInfo,
            children: parseInt(e.target.value)
        });
    };

    return (
        <Grid display='flex' gap={4}>
            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Adult(s):</Typography>
                <select id="adult" name="adult" value={guestInfo?.adult || '1'} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleAdultsChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>

            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Child(ren) 3 above:</Typography>
                <select id="children" name="children" value={guestInfo?.children} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleChildrenChange2}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>

            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Infant/s:</Typography>
                <select id="infant" name="infant" value={guestInfo?.infant} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleChildrenChange1}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>
        </Grid>
    );
}

export default RoomSelection;
