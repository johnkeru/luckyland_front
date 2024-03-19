import { TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import useSearchStore from '../../hooks/useSearchStore';
import { formalFormatDate } from '../../utility_functions/formatTime';
import formatPrice from '../../utility_functions/formatPrice';
import TD_Chips from '../inventory/TDS/TD_Chips';
import TD_Searchable from '../inventory/TDS/TD_Searchable';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const RecordManagementTRCell = ({ row, index }) => {
    const { searchCustomerRecords } = useSearchStore()

    const labelId = `enhanced-table-checkbox-${index}`;

    return (
        <>
            <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TableCell component="th" id={labelId} >{row.id}</TableCell>
                <TD_Searchable searchValue={searchCustomerRecords} column={row.reservationHASH} />
                <TableCell>{formalFormatDate(row.checkIn)}</TableCell>
                <TableCell>{formalFormatDate(row.checkOut)}</TableCell>
                <TD_Chips column={row.status} />
                <TD_Searchable searchValue={searchCustomerRecords} column={'₱ ' + formatPrice(row.amountPaid) + ''} />
                <TD_Searchable searchValue={searchCustomerRecords} column={row.firstName + ' ' + row.lastName} />
                <TD_Searchable searchValue={searchCustomerRecords} column={row.email} />
                <TD_Searchable searchValue={searchCustomerRecords} column={row.phoneNumber} />
            </CustomTableRow>
        </>
    );
}

export default RecordManagementTRCell