import { Grid, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { IoMdCheckmark, IoMdTrash } from 'react-icons/io';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdModeEdit, MdOutlineClear, MdOutlineRemoveRedEye } from 'react-icons/md';
import ButtonIcon from '../../utility_components/ButtonIcon';
import Borrow_Inventory_Modal from '../../utility_components/modal/inventory_modals/Borrow_Inventory_Modal';
import Edit_Inventory_Modal from '../../utility_components/modal/inventory_modals/Edit_Inventory_Modal';
import Hide_Restore_Inventory_Modal from '../../utility_components/modal/inventory_modals/Hide_Restore_Inventory_Modal';
import View_Inventory_Modal from '../../utility_components/modal/inventory_modals/View_Inventory_Modal';
import formatDateTime from '../../utility_functions/formatTime';
import InventoryStatusChip from './InventoryStatusChip';
import TD_E_Image from './TD_E_Image';
import TD_SE from './TD_SE';
import TD_SE_Quantity from './TD_SE_Quantity';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const InventoryTRCell = ({ row, index, configMethods, isAllow }) => {
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

    const handleInlineSubmitEdit = () => {
        configMethods.update(row.id, editData, setUpdating, handleCancelEdit);
    }
    const handleInlineCancelEdit = () => {
        handleCancelEdit();
        setImage(row.image);
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
            <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={row.productName}
                objKey={'productName'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAllow}
            />
            <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={row.category}
                objKey={'category'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAllow}
            />
            <TD_SE_Quantity
                tdCancelEdit={tdCancelEdit}
                data={row}
                objKey={'currentQuantity'}
                labelToExclude={labelToExclude}
                handleEditingState={handleEditingState}
                setEditData={setEditData}
                isAllow={isAllow}
            />

            <TableCell><InventoryStatusChip status={row.status} /></TableCell>

            <TD_E_Image
                image={image}
                setImage={setImage}
                data={row}
                objKey={'image'}
                handleEditingState={handleEditingState}
                tdCancelEdit={tdCancelEdit}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAllow}
            />

            <TableCell>{formatDateTime(row.lastCheck)}</TableCell>

            <TableCell>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                    {
                        (selectedIdToEdit === row.id && labelToExclude.length !== 0) ? <>
                            <ButtonIcon title="update" color='success' onClick={handleInlineSubmitEdit} disabled={updating} loading={updating} sx={{ fontSize: '1.5rem' }}>
                                <IoMdCheckmark />
                            </ButtonIcon>
                            <ButtonIcon title="cancel" color='error' onClick={handleInlineCancelEdit} disabled={updating} sx={{ fontSize: '1.5rem' }}>
                                <MdOutlineClear />
                            </ButtonIcon>
                        </> :
                            <>
                                <View_Inventory_Modal
                                    button={<ButtonIcon title="view" sx={{ fontSize: '1.2rem', }}>
                                        <MdOutlineRemoveRedEye />
                                    </ButtonIcon>}
                                    data={row}
                                />

                                {
                                    isAllow ? <>
                                        {!row.deleted_at ? <Borrow_Inventory_Modal
                                            data={row}
                                            onClick={configMethods.borrow}
                                            button={<ButtonIcon color='warning' title='Borrow'>
                                                <FaArrowUp />
                                            </ButtonIcon>}
                                        /> : undefined}
                                        <Edit_Inventory_Modal
                                            handleAllSubmitEdit={handleAllSubmitEdit}
                                            image={image}
                                            setImage={setImage}
                                            updating={updating}
                                            inventoryData={row}
                                            button={<ButtonIcon color='info' title="edit">
                                                <MdModeEdit />
                                            </ButtonIcon>}
                                            data={row}
                                        />
                                        {!row.deleted_at ? <Hide_Restore_Inventory_Modal
                                            data={{ id: row.id, productName: row.productName }}
                                            onClick={configMethods.delete}
                                            button={<ButtonIcon color='error' title="delete">
                                                <IoMdTrash />
                                            </ButtonIcon>
                                            }
                                        /> : <Hide_Restore_Inventory_Modal
                                            restore
                                            data={{ id: row.id, productName: row.productName }}
                                            onClick={configMethods.delete}
                                            button={<ButtonIcon color='success' title="restore">
                                                <LuArchiveRestore />
                                            </ButtonIcon>
                                            }
                                        />}
                                    </> : undefined
                                }
                            </>}
                </Grid>
            </TableCell>
        </CustomTableRow>
    );
}

export default InventoryTRCell