import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import useBookingSummary from '../../../../hooks/useBookingSummary';

function RoomSelection({ room }) {
    const { guestInfo, setGuestInfo } = useBookingSummary();

    const handleAdultsChange = (e) => {
        setGuestInfo({
            ...guestInfo,
            adult: parseInt(e.target.value)
        });
    };

    const handleSeniorChange = (e) => {
        setGuestInfo({
            ...guestInfo,
            seniors: parseInt(e.target.value)
        });
    };

    const handleChildrenChange = (e) => {
        setGuestInfo({
            ...guestInfo,
            children: parseInt(e.target.value)
        });
    };

    return (
        <Grid display='flex' gap={4}>
            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Guest/s:</Typography>
                <select id="adult" name="adult" value={guestInfo?.adult || '1'} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleAdultsChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>

                    {room.status === 'Family' ? <>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </> : undefined}
                </select>
            </Box>

            {/* <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Child(ren) 3 above:</Typography>
                <select id="children" name="children" value={guestInfo?.children} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleChildrenChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>

            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Senior/s:</Typography>
                <select id="seniors" name="seniors" value={guestInfo?.seniors} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleSeniorChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box> */}
        </Grid>
    );
}

export default RoomSelection;
