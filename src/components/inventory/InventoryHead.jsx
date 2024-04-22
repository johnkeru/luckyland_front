import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuTable2 } from "react-icons/lu";
import { PiArchiveDuotone } from 'react-icons/pi';
import ButtonIconText from '../../utility_components/ButtonIconText';
import TableSearchBar from '../../utility_components/table/TableSearchBar';
import Add_Item_Modal from './modal/Add_Item_Modal';

const TABS = [
    {
        label: "Active",
        value: "none",
        Icon: <LuTable2 />,
    },
    {
        label: "Archived",
        value: "trash",
        Icon: <PiArchiveDuotone />,
    },
];

const InventoryHead = ({ configMethods, isAllow }) => {
    const [value, setValue] = useState('none');

    const handleTabQuery = (tabValue) => {
        setValue(tabValue)
        configMethods.handleTab(`trash=${tabValue === 'none' ? '' : tabValue}&`);
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom color='info.main'>Inventory Management</Typography>
            <Typography variant="body1" gutterBottom>
                View and manage your inventory effectively. Keep track of your products, monitor stock levels, and streamline your inventory operations.
            </Typography>

            <Box display='flex' alignItems='center' justifyContent='space-between' mt={2}>
                <Tabs value={value} onChange={(_, newValue) => handleTabQuery(newValue)} textColor="primary" indicatorColor="primary" aria-label="secondary tabs example">
                    {TABS.map(({ label, value, Icon }) => (
                        <Tab iconPosition='start' key={value} value={value} label={label} icon={Icon} />
                    ))}
                </Tabs>

                <Box display='flex' gap={2} alignItems='center'>
                    <TableSearchBar configMethods={configMethods} />
                    {isAllow ? <Add_Item_Modal handleAdd={configMethods.add} button={<ButtonIconText Icon={<FaPlus />} text='Add Item' color="success" size='medium' />} /> : undefined}
                </Box>
            </Box>
        </Box>
    );
}

export default InventoryHead;
