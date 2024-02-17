import React from 'react'
import TableLoading from '../../utility_components/table/TableLoading'
import InventoryTRCell from './InventoryTRCell'
import { TableBody, TableCell, TableRow } from '@mui/material'

const InventoryBody = ({ loading, configMethods, data, isAllow }) => {

    const emptyRows = loading ? 0 :
        data.data.current_page - 1 > 0 ? Math.max(0, (1 + data.data.current_page - 1) * data.data.per_page - data.data.total) : 0;


    return (
        <>
            {loading ? <TableLoading /> :
                <TableBody>
                    {data.data.data.map((row, index) => <InventoryTRCell isAllow={isAllow} configMethods={configMethods} row={row} index={index} key={index} />)}
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

export default InventoryBody