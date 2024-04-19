import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaDesktop, FaUsers, FaWalking } from 'react-icons/fa';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import DashboardLoading from '../DashboardLoading';

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

const MonthOverview = ({ titleColor }) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard/month-overview',
            setResponse: setData,
            setLoading
        });
    }, []);


    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', ":hover": { boxShadow: 5 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                This Month
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, textAlign: 'center' }}>
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="#e4841c" color2="#ffb037">
                            <FaCalendarAlt />
                            <Typography variant='body2' >UPCOMING</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.upcoming || 0}</Typography>
                        </GradientBox>
                }
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="#2494cc" color2="#75c1ff">
                            <FaWalking />
                            <Typography variant='body2' >WALK-IN</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.walkin || 0}</Typography>
                        </GradientBox>
                }
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="green" color2="#7fff7f">
                            <FaDesktop />
                            <Typography variant='body2' >ONLINE</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.online || 0}</Typography>
                        </GradientBox>
                }
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="#642c81" color2="#a887d4">
                            <FaUsers />
                            <Typography variant='body2' >MONTH GUESTS</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.guests || 0}</Typography>
                        </GradientBox>
                }
            </Box>
        </Paper>
    )
}

export default MonthOverview