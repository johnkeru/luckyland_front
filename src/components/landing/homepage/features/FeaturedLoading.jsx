import { Box, Skeleton } from '@mui/material'
import React from 'react'

const FeaturedLoading = () => {
    return (
        <Box display='flex' gap={3}>
            <Skeleton variant="rectangular" width="100%" height={400} animation="wave" />
            <Box width="100%">
                <Skeleton variant="rectangular" width="100%" height={40} animation="wave" />
                <Skeleton variant="rectangular" width="100%" height={90} animation="wave" sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={20} animation="wave" sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={20} animation="wave" sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={20} animation="wave" sx={{ mt: 2 }} />
            </Box>
        </Box>
    )
}

export default FeaturedLoading
