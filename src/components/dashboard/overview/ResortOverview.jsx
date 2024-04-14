import { Box, Typography, Paper } from '@mui/material';
import { cyan, orange } from '@mui/material/colors';
import React from 'react';
import PieBookingSummary from './reservation-charts/PieBookingSummary';
import BarMonthlyReservationOverview from './reservation-charts/BarMonthlyReservationOverview';
import LineReservation from './reservation-charts/LineReservation';
import { FaUsers, FaBed, FaHome, FaCalendarAlt, FaWalking, FaDesktop } from 'react-icons/fa';

const GradientBox = ({ children, color1, color2 }) => (
    <Box
        sx={{
            width: '100%',
            color: 'white',
            backgroundImage: `linear-gradient(135deg, ${color1}, ${color2})`,
            borderRadius: 1,
            padding: 1,
        }}
    >
        {children}
    </Box>
);

const ResortOverview = () => {

    const titleColor = cyan[700];

    return (
        <Box sx={{ p: 2, border: '2px solid #ddd', bgcolor: 'white' }}>
            <Typography gutterBottom sx={{ color: orange[800], fontSize: '26px', fontWeight: 'bold', mb: 2 }}>
                Reservation Overview
            </Typography>

            <Box display='flex' gap={1}>
                <Paper variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
                    <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                        Today Overview
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, textAlign: 'center' }}>
                        <GradientBox color1="#e4841c" color2="#ffb037">
                            <FaUsers />
                            <Typography variant='body2' >GUESTS</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                        <GradientBox color1="#3a9e99" color2="#61d4cf">
                            <FaBed />
                            <Typography variant='body2' >AVAILABLE ROOMS</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                        <GradientBox color1="#dc5622" color2="#ff7d4d">
                            <FaHome />
                            <Typography variant='body2' >AVAILABLE COTTAGES</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                    </Box>
                </Paper>
                <Paper variant='outlined' sx={{ p: 2, width: '100%', ":hover": { boxShadow: 4 } }}>
                    <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                        This Month
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, textAlign: 'center' }}>
                        <GradientBox color1="#e4841c" color2="#ffb037">
                            <FaCalendarAlt />
                            <Typography variant='body2' >UPCOMING</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                        <GradientBox color1="#2494cc" color2="#75c1ff">
                            <FaWalking />
                            <Typography variant='body2' >WALK-IN</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                        <GradientBox color1="green" color2="#7fff7f">
                            <FaDesktop />
                            <Typography variant='body2' >ONLINE</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                        <GradientBox color1="#642c81" color2="#a887d4">
                            <FaUsers />
                            <Typography variant='body2' >MONTH GUESTS</Typography>
                            <Typography variant='h5' fontWeight={600}>5</Typography>
                        </GradientBox>
                    </Box>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <BarMonthlyReservationOverview titleColor={titleColor} />
                <PieBookingSummary titleColor={titleColor} />
                <LineReservation titleColor={titleColor} />
            </Box>

        </Box>
    );
};

export default ResortOverview;
