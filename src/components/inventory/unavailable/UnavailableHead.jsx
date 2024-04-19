import { Box, Typography } from '@mui/material';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import TableSearchBar from '../../../utility_components/table/TableSearchBar';
import Add_Unavailable_Modal from './modal/Add_Unavailable_Modal';

const UnavailableHead = ({ configMethods }) => {

    return (
        <Box p={3} >
            <Typography variant="h4" gutterBottom color='info.main'>Unavailable Items</Typography>
            <Typography variant="body1" gutterBottom>
                Optimize your resource allocation and availability management with our comprehensive system. Track inventory, manage unavailability periods, and ensure smooth operations to meet customer demands.
            </Typography>


            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2} mt={2}>
                <TableSearchBar configMethods={configMethods} />
                <Add_Unavailable_Modal
                    configMethods={configMethods}
                    button={
                        <ButtonIconText
                            size='md'
                            Icon={<FaPlus />}
                            text='Add Unavailable'
                            color="success"
                        />
                    }
                />
            </Box>
        </Box>
    )
}

export default UnavailableHead