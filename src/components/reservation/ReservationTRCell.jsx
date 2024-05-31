import { Box, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { BsCalendarDate } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { FcViewDetails } from "react-icons/fc";
import { MdEmail, MdOutlineBedroomParent, MdOutlineCottage, MdOutlineOtherHouses } from "react-icons/md";
import useSearchStore from '../../hooks/useSearchStore';
import ButtonIcon from '../../utility_components/ButtonIcon';
import { formatDateRange } from '../../utility_functions/formatTime';
import TD_Chips from '../inventory/TDS/TD_Chips';
import TD_Searchable from '../inventory/TDS/TD_Searchable';
import TDSearchableWIcon from './TDSearchableWIcon';
import Reservation_Details_Modal from './modal/Reservation_Details_Modal';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const ReservationTRCell = ({ row, index, configMethods, isAllow }) => {

    const { searchReservation } = useSearchStore();

    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TD_Searchable id={labelId} column={row.hash} searchValue={searchReservation} />
                <TD_Searchable column={row.customerName} searchValue={searchReservation} />

                <TDSearchableWIcon
                    column={row.contactPhoneNumber}
                    icon={<FaPhone color='gray' />}
                    searchValue={searchReservation}
                    column2={row.contactEmail}
                    icon2={<MdEmail color='gray' />}
                />
                <TableCell>
                    <Box display='flex' alignItems='center' gap={1}>
                        <BsCalendarDate color='gray' />
                        {formatDateRange(row.checkIn, row.checkOut)}
                    </Box>
                </TableCell>

                <TableCell>
                    <Box display='flex' gap={2} alignItems='center'>
                        <MdOutlineBedroomParent color='gray' />
                        {row.roomCounts > 1 ? row.roomCounts + ' Rooms' : row.roomCounts + ' Room'}
                    </Box>
                </TableCell>

                <TableCell>
                    <Box display='flex' gap={2} alignItems='center'>
                        <MdOutlineCottage color='gray' />
                        {row.cottageCounts > 1 ? row.cottageCounts + ' Cottages' : row.cottageCounts + ' Cottage'}
                    </Box>
                </TableCell>


                <TableCell>
                    <Box display='flex' gap={2} alignItems='center'>
                        <MdOutlineOtherHouses color='gray' />
                        {row.otherCounts > 1 ? row.otherCounts + ' Others' : row.otherCounts + ' Other'}
                    </Box>
                </TableCell>

                <TD_Chips column={row.status} />
                <TableCell>
                    {isAllow ? <Reservation_Details_Modal
                        configMethods={configMethods}
                        data={row}
                        button={<ButtonIcon title="view">
                            <FcViewDetails />
                        </ButtonIcon>}
                    /> : undefined}
                </TableCell>
            </CustomTableRow>
        </>
    );
}

export default ReservationTRCell