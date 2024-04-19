import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import TableFooter from './TableFooter';

export default function EnhancedTable({
    size = 'small',
    configHead,
    data,
    configMethods,
    loading,
    total,
    childrenBody,
    childrenHead,
}) {
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {childrenHead}
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={size}
                    >
                        <EnhancedTableHead
                            handleToggle={configMethods.handleToggle}
                            configHead={configHead}
                        />

                        {childrenBody}

                    </Table>
                </TableContainer>

                <TableFooter configMethods={configMethods} data={data} loading={loading} total={total} />
            </Paper>
        </Box>
    );
}
