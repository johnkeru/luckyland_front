import { TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import useSearchStore from '../../hooks/useSearchStore';
import { formalFormatDate } from '../../utility_functions/formatTime';
import formatPrice from '../../utility_functions/formatPrice';
import TD_Chips from '../inventory/TDS/TD_Chips';
import TD_Searchable from '../inventory/TDS/TD_Searchable';
import TDSearchableWIcon from '../reservation/TDSearchableWIcon';
import { FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const RecordManagementTRCell = ({ row, index }) => {
    const { searchRecordManagement } = useSearchStore()

    const labelId = `enhanced-table-checkbox-${index}`;

    return (
        <>
            <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TableCell component="th" id={labelId} >{row.id}</TableCell>
                <TD_Searchable searchValue={searchRecordManagement} column={row?.reservationHASH ? row.reservationHASH : ''} />
                <TableCell>{row?.checkIn ? formalFormatDate(row.checkIn) : undefined}</TableCell>
                <TableCell>{row?.checkOut ? formalFormatDate(row.checkOut) : undefined}</TableCell>
                <TD_Chips column={row.status} />
                <TD_Searchable searchValue={searchRecordManagement} column={'₱' + (row?.amountPaid ? formatPrice(row.amountPaid) : '0' + '')} />
                <TD_Searchable searchValue={searchRecordManagement} column={row.firstName + ' ' + row.lastName} />
                <TDSearchableWIcon
                    column={row.phoneNumber}
                    icon={<FaPhone color='gray' />}
                    searchValue={searchRecordManagement}
                    column2={row.email}
                    icon2={<MdEmail color='gray' />}
                />
            </CustomTableRow>
        </>
    );
}

export default RecordManagementTRCell