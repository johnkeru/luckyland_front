import { Box, Typography } from '@mui/material';
import React from 'react';
import TableSearchBar from '../../utility_components/table/TableSearchBar';
import FilterByMonth from './filter/FilterByMonth';
import FilterByYear from './filter/FilterByYear';

const RecordManagementHead = ({ configMethods }) => {
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom color='info.main'>Record Management</Typography>
            <Typography variant="body1" gutterBottom>
                Efficiently manage records within the system. Track data, organize information, and ensure accurate documentation to streamline record-keeping processes.
            </Typography>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                mt={2}
                sx={{ flexDirection: { xs: 'column', md: 'row' } }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{ flexDirection: { xs: 'column', md: 'row' }, width: { xs: '100%', md: 'auto' } }}
                >
                    <FilterByYear configMethods={configMethods} />
                    <FilterByMonth configMethods={configMethods} />
                </Box>

                <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
                    <TableSearchBar configMethods={configMethods} />
                </Box>
            </Box>
        </Box>
    );
}

export default RecordManagementHead;
