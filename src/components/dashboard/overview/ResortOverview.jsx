import { Box, Typography } from '@mui/material';
import { cyan, grey, orange } from '@mui/material/colors';
import React from 'react';
import BarMonthlyReservation from './reservation-charts/BarMonthlyReservation';
import LineReservation from './reservation-charts/LineReservation';
import MonthOverview from './reservation-charts/MonthOverview';
import PieReservation from './reservation-charts/PieReservation';
import TodayOverview from './reservation-charts/TodayOverview';


const ResortOverview = () => {

    const titleColor = cyan[700];

    return (
        <Box sx={{ p: 2, border: '2px solid #ddd', bgcolor: grey[50] }}>
            <Typography gutterBottom sx={{ color: orange[800], fontSize: '26px', fontWeight: 'bold', mb: 2 }}>
                Reservation Overview
            </Typography>

            <Box display='flex' gap={1}>
                <TodayOverview titleColor={titleColor} />
                <MonthOverview titleColor={titleColor} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <BarMonthlyReservation titleColor={titleColor} />
                <PieReservation titleColor={titleColor} />
                <LineReservation titleColor={titleColor} />
            </Box>

        </Box>
    );
};

export default ResortOverview;
