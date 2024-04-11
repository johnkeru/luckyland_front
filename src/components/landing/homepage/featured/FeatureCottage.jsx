import React from 'react'
import { Box, Typography } from '@mui/material';
import RoomLoading from '../../../room-management/RoomLoading';
import CottagesType from './cottages-rooms-types/CottagesType';

const FeatureCottage = ({ loading, data, inLanding }) => {
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
          Featured Cottages
        </Typography>
      </Box>
      <Box>
        <Box display='flex' flexWrap='wrap' justifyContent='space-between' width='100%' gap={2}>
          {
            loading ? <RoomLoading isRoomManagement /> :
              data.cottages.map(cottage => <CottagesType key={cottage.id} cottage={cottage} cottageCounts={data.cottage_counts} />)
          }
        </Box>
      </Box>
    </Box >
  )
}

export default FeatureCottage