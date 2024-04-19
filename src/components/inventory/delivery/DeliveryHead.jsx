import { Box, Typography } from '@mui/material';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import TableSearchBar from '../../../utility_components/table/TableSearchBar';
import Add_Delivery_Modal from './modals/Add_Delivery_Modal';

const DeliveryHead = ({ configMethods }) => {

    return (
        <Box p={3} >
            <Typography variant="h4" gutterBottom color='info.main'>Delivery Management</Typography>
            <Typography variant="body1" gutterBottom>
                Streamline your delivery operations with our comprehensive management system. Track orders, optimize routes, and ensure timely deliveries to delight your customers.
            </Typography>

            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2} mt={2}>
                <TableSearchBar configMethods={configMethods} />
                <Add_Delivery_Modal
                    configMethods={configMethods}
                    button={
                        <ButtonIconText
                            size='md'
                            Icon={<FaPlus />}
                            text='Add Delivery'
                            color="success"
                        />
                    }
                />
            </Box>
        </Box>
    )
}

export default DeliveryHead