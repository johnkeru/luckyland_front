import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import { CiViewTable } from 'react-icons/ci';
import EnhancedTableHead from './EnhancedTableHead';
import TableFooter from './TableFooter';
import TableNav from './TableNav';


export default function EnhancedTable({ size = 'small', isSearch = true, noTrash = false, configHead, data, configMethods, loading, total, isAllow, title, childrenBody, }) {

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableNav isSearch={isSearch} noTrash={noTrash} Icon={CiViewTable} title={title} configMethods={configMethods} total={total} isAllow={isAllow} />

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
