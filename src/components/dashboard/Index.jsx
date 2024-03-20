import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

const Index = () => {
    return (
        <Box>

            <Box>
                <Box textAlign='center' display='flex' >
                    <Box>
                        <Typography bgcolor={blue[400]} color='white' py={.5}>Inventory Stocks</Typography>
                        <Box display='flex' gap={2} p={2}>
                            <Box width='200px' textAlign='center'>
                                <Typography bgcolor={blue[200]} color='white' py={.5}>In Stock</Typography>
                                <Box mx={1} display='flex' justifyContent='center' alignItems='center' borderLeft='1px solid #c0c0c0' borderBottom='1px solid #c0c0c0' borderRight='1px solid #c0c0c0'>
                                    <Box p={1} pt={3} pb={2}>
                                        <Typography variant='h5' fontSize='2.5rem' fontWeight={600}>232</Typography>
                                        <Typography variant='body1'>Qty</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box width='200px' textAlign='center'>
                                <Typography bgcolor={blue[200]} color='white' py={.5}>Low Stock</Typography>
                                <Box mx={1} display='flex' justifyContent='center' alignItems='center' borderLeft='1px solid #c0c0c0' borderBottom='1px solid #c0c0c0' borderRight='1px solid #c0c0c0'>
                                    <Box p={1} pt={3} pb={2}>
                                        <Typography variant='h5' fontSize='2.5rem' fontWeight={600}>232</Typography>
                                        <Typography variant='body1'>Qty</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box width='200px' textAlign='center'>
                                <Typography bgcolor={blue[200]} color='white' py={.5}>Out Of Stock</Typography>
                                <Box mx={1} display='flex' justifyContent='center' alignItems='center' borderLeft='1px solid #c0c0c0' borderBottom='1px solid #c0c0c0' borderRight='1px solid #c0c0c0'>
                                    <Box p={1} pt={3} pb={2}>
                                        <Typography variant='h5' fontSize='2.5rem' fontWeight={600}>232</Typography>
                                        <Typography variant='body1'>Qty</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}

export default Index
