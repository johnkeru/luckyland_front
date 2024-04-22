import { Chip, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { BiSolidUserDetail } from "react-icons/bi";
import { IoMdCheckmark } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';
import { MdOutlineClear } from 'react-icons/md';
import { RxActivityLog } from 'react-icons/rx';

import ButtonIcon from '../../utility_components/ButtonIcon';

import Add_Employee_Modal from './modal/Add_Employee_Modal';
import Add_RegularEmployee_Modal from './modal/Add_RegularEmployee_Modal';
import Details_Employee_Modal from './modal/Details_Employee_Modal';
import ViewLogs_Employee_Modal from './modal/ViewLogs_Employee_Modal';


import { empStatusColor } from '../../utility_functions/statusColor';
import RoleChip from './RoleChip';
import TDEmployee from './TDEmployee';
import TDEmployeeName from './TDEmployeeName';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const EmployeeTRCell = ({ row, index, configMethods }) => {
    const labelId = `enhanced-table-checkbox-${index}`;
    const [editData, setEditData] = useState({});
    const [selectedIdToEdit, setSelectedIdToEdit] = useState(-1);
    const [labelToExclude, setLabelToExclude] = useState([]);
    const [updating, setUpdating] = useState(false);

    const [rowActive, setRowActive] = useState('');

    const handleCancelEdit = () => {
        setSelectedIdToEdit(-1);
        setEditData({})
        setLabelToExclude([])
        setRowActive('');
    }

    const handleSubmitEdit = () => {
        configMethods.update(row.id, editData, setUpdating, handleCancelEdit);
    }

    return (
        <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: rowActive ? grey['200'] : undefined }}>
            <TableCell component="th" id={labelId}>{row.id}</TableCell>
            <TDEmployeeName emp={row} />
            <TDEmployee column={`${row.address.province}, ${row.address.barangay}, ${row.address.city}`} />
            {row?.phoneNumber ? <TDEmployee column={row.phoneNumber} /> : <TableCell></TableCell>}
            <TableCell><Chip label={row.status} variant="outlined" color={empStatusColor(row.status)} size='small' /></TableCell>
            <TableCell component="th" id={labelId}>{row?.roles && row.roles.length !== 0 ? row.roles.map((role, index) => <RoleChip size='small' sx={{ mr: .5 }} key={index} role={role.roleName} />) : undefined}</TableCell>
            <TableCell>
                {
                    (selectedIdToEdit === row.id && labelToExclude.length !== 0) ? <>
                        <ButtonIcon title="update" onClick={handleSubmitEdit} disabled={updating} loading={updating} sx={{ fontSize: '1.5rem' }}>
                            <IoMdCheckmark />
                        </ButtonIcon>
                        <ButtonIcon title="cancel" onClick={handleCancelEdit} disabled={updating} sx={{ fontSize: '1.5rem' }}>
                            <MdOutlineClear />
                        </ButtonIcon>
                    </> :
                        <>
                            <Details_Employee_Modal
                                button={<ButtonIcon title='details' >
                                    <BiSolidUserDetail />
                                </ButtonIcon>}
                                empDetails={row}
                            />

                            {row.type !== 'regular' ? <ViewLogs_Employee_Modal
                                button={<ButtonIcon title='activity logs' >
                                    <RxActivityLog />
                                </ButtonIcon>}
                                empDetails={row}
                            /> : undefined}
                            {
                                row.type !== 'regular' ? <Add_Employee_Modal
                                    isEmp
                                    handleUpdate={configMethods.update}
                                    button={<ButtonIcon title='edit' >
                                        <LiaEdit />
                                    </ButtonIcon>}
                                    user={row}
                                /> : <Add_RegularEmployee_Modal
                                    handleUpdate={configMethods.update}
                                    button={<ButtonIcon title='edit' >
                                        <LiaEdit />
                                    </ButtonIcon>}
                                    user={row}
                                    isReg
                                />
                            }
                        </>}
            </TableCell>
        </CustomTableRow>
    );
}

export default EmployeeTRCell