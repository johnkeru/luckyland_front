import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaBed, FaHome, FaUsers } from 'react-icons/fa'
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import DashboardLoading from '../DashboardLoading';
import GradientBox from '../GradientBox';

const TodayOverview = ({ titleColor }) => {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: '/api/dashboard/today-overview',
            setResponse: setData,
            setLoading
        });
    }, []);

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', ":hover": { boxShadow: 5 } }}>
            <Typography variant="h6" gutterBottom sx={{ color: titleColor, fontWeight: 'bold', mb: 1 }}>
                Today Overview
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, textAlign: 'center' }}>
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="#e4841c" color2="#ffb037">
                            <FaUsers />
                            <Typography variant='body2' >GUESTS</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.guests || 0}</Typography>
                        </GradientBox>
                }
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="#3a9e99" color2="#61d4cf">
                            <FaBed />
                            <Typography variant='body2' >AVAILABLE ROOMS</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.rooms || 0}</Typography>
                        </GradientBox>
                }
                {
                    loading ? <DashboardLoading height={100} /> :
                        <GradientBox color1="#dc5622" color2="#ff7d4d">
                            <FaHome />
                            <Typography variant='body2' >AVAILABLE COTTAGES</Typography>
                            <Typography variant='h5' fontWeight={600}>{data.cottages || 0}</Typography>
                        </GradientBox>
                }
            </Box>
        </Paper>
    )
}

export default TodayOverview