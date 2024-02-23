import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

function RoomSelection() {
    const [adults, setAdults] = useState(1);
    const [children1, setChildren1] = useState(0);
    const [children2, setChildren2] = useState(0);

    const handleAdultsChange = (e) => {
        setAdults(parseInt(e.target.value));
    };

    const handleChildrenChange1 = (e) => {
        setChildren1(parseInt(e.target.value));
    };

    const handleChildrenChange2 = (e) => {
        setChildren2(parseInt(e.target.value));
    };

    return (
        <Grid display='flex' gap={4}>
            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Adult(s):</Typography>
                <select id="adults" name="adults" value={adults} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleAdultsChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>

            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Child(ren) 2 yrs below:</Typography>
                <select id="children1" name="children1" value={children1} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleChildrenChange1}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>

            <Box>
                <Typography variant='body1' fontWeight={600} mb={5}>Child(ren) 3 above:</Typography>
                <select id="children2" name="children2" value={children2} style={{ width: 'fit-content', padding: '5px 15px' }} onChange={handleChildrenChange2}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </Box>
        </Grid>
    );
}

export default RoomSelection;
