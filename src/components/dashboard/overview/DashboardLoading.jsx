import { Box, Skeleton } from '@mui/material'
import React from 'react'

const DashboardLoading = ({ height = 220 }) => {
    return (
        <Box sx={{ width: '100%', height: height, position: 'relative' }}>
            <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
        </Box>
    )
}

export default DashboardLoading