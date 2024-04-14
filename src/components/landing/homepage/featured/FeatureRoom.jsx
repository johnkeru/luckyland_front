import React from 'react'
import { Box, Typography } from '@mui/material';
import RoomLoading from '../../../room-management/RoomLoading';
import RoomsType from './cottages-rooms-types/RoomsType';

const FeatureRoom = ({ loading, data, inLanding }) => {
    return (
        <Box pb={3} pt={inLanding ? 3 : 7}>
            <Box width='fit-content' mx='auto' mb={5}>
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
                    Featured Rooms
                </Typography>
            </Box>

            <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
                {
                    loading ? <RoomLoading isRoomManagement /> :
                        data.rooms.map(room => <RoomsType key={room.id} room={room} roomCounts={data.room_counts} />)
                }
            </Box>
        </Box>
    )
}

export default FeatureRoom