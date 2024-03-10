import {
    Box,
    Grid,
    Tab, Tabs,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import TableSearchBar from './TableSearchBar';
import { FaTrash } from 'react-icons/fa';

const TABS = [
    {
        label: "Active",
        value: "none",
    },
    {
        label: "Trashed",
        value: "trash",
    },
];

const TableNav = ({ total, configMethods, title = "Inventory", isAllow, Icon }) => {
    const [tabMessage, setTabMessage] = useState("");
    const [value, setValue] = useState('none');


    const handleTabQuery = (tabValue) => {
        const message = tabValue === "trash" ? "Will be deleted within 30 days" : "";
        setTabMessage(message);
        setValue(tabValue)
        configMethods.handleTab(`trash=${tabValue === 'none' ? '' : tabValue}&`, message);
    }

    return (
        <Grid sx={{ px: 2, pt: 2 }}>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: 1 }}>
                <Typography>
                    See information about {tabMessage ? 'all ' : 'all active '}{title.toLowerCase()} ({total} total){tabMessage && ` - ${tabMessage}`}
                </Typography>

                {isAllow ?
                    configMethods.add() // add Element provided by the Parent.
                    : undefined}
            </Grid>

            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <Tabs value={value} onChange={(e, newValue) => handleTabQuery(newValue)} textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example">
                    {TABS.map(({ label, value }) => (
                        <Tab iconPosition='end' icon={value === 'trash' ? <FaTrash /> : <Icon />} key={value} value={value} label={label} />
                    ))}
                </Tabs>
                <TableSearchBar configMethods={configMethods} />
            </Grid>
        </Grid>


    )
}

export default TableNav;
