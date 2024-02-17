import { Grid, TablePagination, Typography } from '@mui/material'
import React from 'react'

const TableFooter = ({ loading, data, configMethods, total }) => {

    const handleChangePage = (_event, newPage) => {
        configMethods.handleSelectPage(newPage + 1);
    };


    return (
        <Grid display='flex' alignItems='center' justifyContent='end' gap={1}>
            <Typography variant='body2' fontSize='14px'>Total: {total}</Typography>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={loading ? 0 : data.data.total}
                rowsPerPage={loading ? 0 : data.data.per_page}
                page={loading ? 0 : data.data.current_page - 1}
                onPageChange={handleChangePage}
            />
        </Grid>
    )
}

export default TableFooter