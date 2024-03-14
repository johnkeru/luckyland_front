import { TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'
import TableLoading from '../../../utility_components/table/TableLoading'
import UnavailableTRCell from './UnavailableTRCell'

const UnavailableBody = ({ loading, configMethods, data, isAllow }) => {

    const emptyRows = loading ? 0 :
        data.current_page - 1 > 0 ? Math.max(0, (1 + data.current_page - 1) * data.per_page - data.total) : 0;


    return (
        <>
            {loading ? <TableLoading numCell={7} numRow={7} /> :
                <TableBody>
                    {
                        data.data.length === 0 ? <TableRow>
                            <TableCell sx={{ py: 2, border: 0 }}>
                                <Typography color='GrayText'>No data found.</Typography>
                            </TableCell>
                        </TableRow> :
                            data.data.map((row, index) =>
                                <UnavailableTRCell isAllow={isAllow} configMethods={configMethods} row={row} index={index} key={index} />)
                    }
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
        </>
    )
}

export default UnavailableBody