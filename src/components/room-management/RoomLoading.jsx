import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';

function Media({ tiles }) {

    return (
        <Box >
            {Array.from(new Array(tiles)).map((_, index) => (
                <Box key={index} sx={{ width: '100vw', my: 2 }}>
                    <Skeleton variant="rectangular" height={350} />
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
