import { Box, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { BsCalendarDate, BsThreeDotsVertical } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { MdEmail, MdOutlineBedroomParent } from "react-icons/md";
import useSearchStore from '../../hooks/useSearchStore';
import ButtonIcon from '../../utility_components/ButtonIcon';
import GCashIcon from '../../utility_components/icons/GCashIcon';
import { formatDateRange } from '../../utility_functions/formatTime';
import TD_Chips from '../inventory/TDS/TD_Chips';
import TD_Searchable from '../inventory/TDS/TD_Searchable';
import TDSearchableWIcon from './TDSearchableWIcon';
import GCashReferenceCode_Modal from './modal/GCashReferenceCode_Modal';
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
                <TDSearchableWIcon
                    column={row.roomCounts > 1 ? row.roomCounts + ' Rooms' : row.roomCounts + ' Room'}
                    icon={<MdOutlineBedroomParent color='gray' />}
                    searchValue={searchReservation}
                />
                <TD_Chips column={row.status} />
                <TableCell>
                    {isAllow ? <Reservation_Details_Modal
                        configMethods={configMethods}
                        data={row}
                        button={<ButtonIcon title="view">
                            <BsThreeDotsVertical />
                        </ButtonIcon>}
                    /> : undefined}

                    {
                        row?.gCashRefNumberURL ? <GCashReferenceCode_Modal
                            button={
                                <ButtonIcon title="check gcash ref">
                                    <GCashIcon />
                                </ButtonIcon>
                            }

                            row={row} /> : undefined
                    }
                </TableCell>
            </CustomTableRow>
        </>
    );
}

export default ReservationTRCell