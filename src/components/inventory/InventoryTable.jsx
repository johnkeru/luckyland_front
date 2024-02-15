import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import TRCell from './TRCell';


function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, configHead } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead >
            <TableRow>
                {configHead.map((headCell) => (
                    headCell.sortable ? <TableCell key={headCell.label} sx={{ py: 2 }}>
                        <TableSortLabel
                            active={orderBy === headCell.query}
                            direction={orderBy === headCell.query ? order : 'asc'}
                            onClick={createSortHandler(headCell.query)}
                        >
                            {headCell.label}
                            {orderBy === headCell.label ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell> : <TableCell key={headCell.label}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function InventoryTable({ configHead, data, configMethods, loading }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        configMethods.handleToggle(`${property}=${isAsc ? 'desc' : 'asc'}&`)
    };


    const handleChangePage = (event, newPage) => {
        configMethods.handleSelectPage(newPage + 1);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = loading ? 0 :
        data.data.current_page - 1 > 0 ? Math.max(0, (1 + data.data.current_page - 1) * data.data.per_page - data.data.total) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, }}>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Inventory {loading ? 0 : data.total_inventories} total.
                    </Typography>

                </Toolbar>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            configHead={configHead}
                            onRequestSort={handleRequestSort}
                        />
                        {loading ? <TableBody>
                            <TableRow>
                                <TableCell>Loading ...</TableCell>
                            </TableRow>
                        </TableBody> :
                            <TableBody>
                                {data.data.data.map((row, index) => <TRCell configMethods={configMethods} row={row} index={index} key={index} />)}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={loading ? 0 : data.data.total}
                    rowsPerPage={loading ? 0 : data.data.per_page}
                    page={loading ? 0 : data.data.current_page - 1}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </Box>
    );
}

// configHead, data, configMethods, loading


