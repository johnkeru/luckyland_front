import {
    Grid,
    Tab, Tabs,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { PiArchiveDuotone } from "react-icons/pi";
import TableSearchBar from './TableSearchBar';

const TABS = [
    {
        label: "Active",
        value: "none",
    },
    {
        label: "Archived",
        value: "trash",
    },
];

const TableNav = ({ noTrash = false, total, configMethods, title = "Inventory", isAllow, Icon, isSearch }) => {
    const [value, setValue] = useState('none');

    const handleTabQuery = (tabValue) => {
        const message = tabValue === "trash" ? "Will be deleted within 30 days" : "";
        setValue(tabValue)
        configMethods.handleTab(`trash=${tabValue === 'none' ? '' : tabValue}&`, message);
    }

    return (
        <Grid sx={{ px: 2, pt: 2 }}>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', mb: 1 }}>

                {isAllow ?
                    configMethods.add ? configMethods.add() : undefined // add Element provided by the Parent.
                    : undefined}

                {
                    isAllow ? configMethods?.backup ? configMethods.backup() : undefined : undefined
                }
            </Grid>

            <Grid sx={{ display: 'flex', justifyContent: 'space-between', my: !noTrash ? 0 : 3, alignItems: 'center' }}>
                {
                    !noTrash ?
                        <Tabs value={value} onChange={(e, newValue) => handleTabQuery(newValue)} textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example">
                            {TABS.map(({ label, value }) => (
                                <Tab iconPosition='end' icon={value === 'trash' ? <PiArchiveDuotone /> : <Icon />} key={value} value={value} label={label} />
                            ))}
                        </Tabs> :
                        undefined
                }

                {configMethods?.handleHeadCounts ? configMethods.handleHeadCounts() : undefined}

                {configMethods?.filterHeads ? configMethods.filterHeads() : undefined}

                {isSearch ? <TableSearchBar configMethods={configMethods} /> : undefined}
            </Grid>

        </Grid>


    )
}

export default TableNav;
