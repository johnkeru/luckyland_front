import { Box, Typography } from '@mui/material'
import React from 'react'

const Test = () => {


    return (
        <Box position='relative' width='75%' m='auto'>
            <Box bgcolor='white' width='55%' height='320px' sx={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, border: '1px solid #c0c0c0', color: 'primary.main' }}>
                <Typography
                    variant='h5'
                    py={.5}
                    px={1}
                >Kids Pool</Typography>
                <img src='https://imgs.search.brave.com/5Nkgt02OTbZNPAzNrCswuBRQQh98obOAFO76Z6GYu8Y/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2EwLzVh/LzZmL2EwNWE2ZjZj/Mjc3YzQyODg5NGYy/MzZlYmJhMTdmODkx/LmpwZw' height='100%' width='100%' />
            </Box>
            <Box
                position='relative'
                zIndex={2}
                bgcolor='white'
                width='55%'
                top={-100}
                height='320px'
                ml={'auto'}
                sx={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, border: '1px solid #c0c0c0', color: 'primary.main' }}>
                <Typography
                    variant='h5'
                    py={.5}
                    px={1}
                >Teens Pool</Typography>
                <img src='https://media.gettyimages.com/id/598577296/photo/pool.jpg?s=612x612&w=0&k=20&c=QEjYCepyNWxlMdck-pkyy4jOJTmZoBboAUqz4Z4bQUM=' height='100%' width='100%' />
            </Box>
            <Box bgcolor='white' width='55%' position='relative' zIndex={3} top={-200} height='320px' sx={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, border: '1px solid #c0c0c0', color: 'primary.main' }}>
                <Typography
                    variant='h5'
                    py={.5}
                    px={1}
                >Adults Pool</Typography>
                <img src='https://t3.ftcdn.net/jpg/02/80/11/26/360_F_280112608_32mLVErazmuz6OLyrz2dK4MgBULBUCSO.jpg' height='100%' width='100%' />
            </Box>
        </Box>
    )
}

export default Test