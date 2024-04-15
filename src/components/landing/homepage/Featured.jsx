import React from 'react'
import ReservationCottages from '../create-reservation/rooms-services/services/ReservationCottages'
import ReservationRooms from '../create-reservation/rooms-services/services/ReservationRooms'
import { Box, Typography } from '@mui/material'

const Featured = ({ }) => {
    return (
        <Box>
            <Box display="flex" flexDirection="column" mx="auto" py={5} >
                <Typography
                    variant="h3"
                    color='primary'
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        mb: 7 // Adding marginBottom to sx
                    }}
                >
                    FEATURED ROOMS
                </Typography>
                <ReservationRooms inLanding endpoint={'api/landing/rooms'} />
            </Box>

            <Box display="flex" flexDirection="column" mx="auto" py={5} >
                <Typography
                    variant="h3"
                    color='primary'
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        mb: 7 // Adding marginBottom to sx
                    }}
                >
                    FEATURED COTTAGES
                </Typography>
                <ReservationCottages inLanding endpoint={'api/landing/cottages'} />
            </Box>
        </Box>
    )
}

export default Featured