import { Chip, Grid, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { IoMdCheckmark, IoMdTrash } from 'react-icons/io';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdModeEdit, MdOutlineClear } from 'react-icons/md';
import { RxActivityLog } from 'react-icons/rx';
import useUser from '../../hooks/useUser';
import ButtonIcon from '../../utility_components/ButtonIcon';
import Add_Employee_Modal from '../../utility_components/modal/employee_modals/Add_Employee_Modal';
import Details_Employee_Modal from '../../utility_components/modal/employee_modals/Details_Employee_Modal';
import ViewLogs_Employee_Modal from '../../utility_components/modal/employee_modals/ViewLogs_Employee_Modal';
import Hide_Restore_Inventory_Modal from '../../utility_components/modal/inventory_modals/Hide_Restore_Inventory_Modal';
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
    const { user } = useUser();
    const labelId = `enhanced-table-checkbox-${index}`;
    const [editData, setEditData] = useState({});
    const [selectedIdToEdit, setSelectedIdToEdit] = useState(-1);
    const [labelToExclude, setLabelToExclude] = useState([]);
    const [updating, setUpdating] = useState(false);

    const [image, setImage] = useState(row.image);

    const [rowActive, setRowActive] = useState('');

    const handleEditingState = (label) => {
        setSelectedIdToEdit(row.id);
        setLabelToExclude(prev => [...prev, label])
        setRowActive(label);
    }

    const handleCancelEdit = () => {
        setSelectedIdToEdit(-1);
        setEditData({})
        setLabelToExclude([])
        setRowActive('');
    }

    // for image cancel uploading image
    const tdCancelEdit = (label) => {
        labelToExclude.length === 1 ? setRowActive('') : undefined;
        setLabelToExclude(prev => prev.filter(excludedLabel => excludedLabel !== label));
    }

    const handleSubmitEdit = () => {
        configMethods.update(row.id, editData, setUpdating, handleCancelEdit);
    }

    const handleAllSubmitEdit = (allDataEdit, setError, setUpdating, handleClose) => {
        const handleCloseLocal = () => {
            handleClose(); // this will close the Edit Modal child.
            handleCancelEdit(); // this will close something within this component.
        }
        configMethods.update(row.id, allDataEdit, setUpdating, handleCloseLocal, setError);
    }

    return (
        <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: rowActive ? grey['200'] : undefined }}>
            <TableCell component="th" id={labelId}>{row.id}</TableCell>
            <TDEmployeeName emp={row} />
            <TDEmployee column={`${row.address.street}, ${row.address.state}, ${row.address.city}`} />
            <TDEmployee column={row.phone} />
            <TableCell><Chip label={row.status} variant="outlined" color={empStatusColor(row.status)} size='small' /></TableCell>
            <TableCell component="th" id={labelId}>{row.roles.map((role, index) => <RoleChip size='small' sx={{ mr: .5 }} key={index} role={role.roleName} />)}</TableCell>
            <TableCell>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                    {
                        (selectedIdToEdit === row.id && labelToExclude.length !== 0) ? <>
                            <ButtonIcon title="update" color='success' onClick={handleSubmitEdit} disabled={updating} loading={updating} sx={{ fontSize: '1.5rem' }}>
                                <IoMdCheckmark />
                            </ButtonIcon>
                            <ButtonIcon title="cancel" color='error' onClick={handleCancelEdit} disabled={updating} sx={{ fontSize: '1.5rem' }}>
                                <MdOutlineClear />
                            </ButtonIcon>
                        </> :
                            <>
                                <Details_Employee_Modal
                                    button={<ButtonIcon title='info' color='info'>
                                        <FaInfo />
                                    </ButtonIcon>}
                                    empDetails={row}
                                />
                                <ViewLogs_Employee_Modal
                                    button={<ButtonIcon title='activity logs' color='primary'>
                                        <RxActivityLog />
                                    </ButtonIcon>}
                                    empDetails={row}
                                />
                                <Add_Employee_Modal
                                    isEmp
                                    handleUpdate={configMethods.update}
                                    button={<ButtonIcon title='edit' color='warning'>
                                        <MdModeEdit />
                                    </ButtonIcon>}
                                    user={row}
                                />
                                {!row.deleted_at ? (
                                    <Hide_Restore_Inventory_Modal
                                        data={{ id: row.id, productName: row.firstName }}
                                        onClick={configMethods.delete}
                                        button={<ButtonIcon color='error' title="delete">
                                            <IoMdTrash />
                                        </ButtonIcon>}
                                    />
                                ) : (
                                    <Hide_Restore_Inventory_Modal
                                        restore
                                        data={{ id: row.id, productName: row.firstName }}
                                        onClick={configMethods.delete}
                                        button={<ButtonIcon color='success' title="restore">
                                            <LuArchiveRestore />
                                        </ButtonIcon>}
                                    />
                                )}
                            </>}
                </Grid>
            </TableCell>
        </CustomTableRow>
    );
}

export default EmployeeTRCell