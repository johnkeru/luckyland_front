import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import * as React from 'react';
import { CiViewTable } from 'react-icons/ci';
import EnhancedTableHead from './EnhancedTableHead';
import TableFooter from './TableFooter';
import TableNav from './TableNav';


export default function EnhancedTable({ configHead, data, configMethods, loading, total, isAllow, title, childrenBody }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const handleRequestSort = (_event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        configMethods.handleToggle(`${property}=${isAsc ? 'desc' : 'asc'}&`)
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableNav Icon={CiViewTable} title={title} configMethods={configMethods} total={total} isAllow={isAllow} />

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            handleToggle={configMethods.handleToggle}
                            order={order}
                            orderBy={orderBy}
                            configHead={configHead}
                            onRequestSort={handleRequestSort}
                        />

                        {childrenBody}

                    </Table>
                </TableContainer>

                <TableFooter configMethods={configMethods} data={data} loading={loading} total={total} />
            </Paper>
        </Box>
    );
}
