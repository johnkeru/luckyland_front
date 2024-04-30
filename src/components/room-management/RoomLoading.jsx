import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';

function Media({ tiles }) {

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='space-between' gap={2}>
            {Array.from(new Array(tiles)).map((_, index) => (
                <Box key={index} sx={{ width: { xs: 500, sm: 370, md: 300, lg: 350 }, marginRight: 0.5 }}>
                    <Skeleton variant="rectangular" height={250} />
                </Box>
            ))}
        </Box>
    );
}

export default function RoomLoading({ tiles = 8 }) {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Media tiles={tiles} />
        </Box>
    );
}
