import { Box, Typography } from '@mui/material';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import TableSearchBar from '../../../utility_components/table/TableSearchBar';
import Add_Waste_Modal from './modal/Add_Waste_Modal';

const WasteHead = ({ configMethods }) => {

    return (
        <Box p={3} >
            <Typography variant="h4" gutterBottom color='info.main'>Waste Items</Typography>
            <Typography variant="body1" gutterBottom>
                Manage waste items efficiently within the system. Track waste collection, optimize disposal routes, and ensure proper handling to streamline waste management processes.
            </Typography>

            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2} mt={2}>
                <TableSearchBar configMethods={configMethods} />
                <Add_Waste_Modal
                    configMethods={configMethods}
                    button={<ButtonIconText
                        Icon={<FaPlus />}
                        text='Add Waste'
                        color="success"
                        size='md'
                    />}
                />
            </Box>
        </Box>
    )
}

export default WasteHead