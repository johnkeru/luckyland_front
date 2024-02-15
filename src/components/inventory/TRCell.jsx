import { Grid, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import View_Inventory_Modal from '../../utility_components/modal/inventory_modals/View_Inventory_Modal';
import ButtonIcon from '../../utility_components/ButtonIcon';
import { MdModeEdit, MdOutlineRemoveRedEye } from 'react-icons/md';
import { isAdmin, isInventory } from '../../utility_functions/roles';
import Borrow_Inventory_Modal from '../../utility_components/modal/inventory_modals/Borrow_Inventory_Modal';
import { FaArrowUp } from 'react-icons/fa';
import Edit_Inventory_Modal from '../../utility_components/modal/inventory_modals/Edit_Inventory_Modal';
import Hide_Restore_Inventory_Modal from '../../utility_components/modal/inventory_modals/Hide_Restore_Inventory_Modal';
import { IoMdTrash } from 'react-icons/io';
import { LuArchiveRestore } from 'react-icons/lu';
import useUser from '../../hooks/useUser';
import { NO_IMAGE, resizeInventoryPic } from '../../utility_functions/cloudinaryUrl';
import formatDateTime from '../../utility_functions/formatTime';
import InventoryStatusChip from './InventoryStatusChip';

const TRCell = ({ row, index, configMethods }) => {
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
        <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell component="th" id={labelId}>{row.id}</TableCell>
            <TableCell>{row.productName}</TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell>{row.currentQuantity} / {row.maxQuantity}</TableCell>
            <TableCell><InventoryStatusChip status={row.status} /></TableCell>
            <TableCell> <img src={row.image ? resizeInventoryPic(row.image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')} /></TableCell>
            <TableCell>{formatDateTime(row.lastCheck)}</TableCell>
            <TableCell>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                    <View_Inventory_Modal
                        button={<ButtonIcon title="view" sx={{ fontSize: '1.2rem', }}>
                            <MdOutlineRemoveRedEye />
                        </ButtonIcon>}
                        data={row}
                    />

                    {
                        isAdmin(user.roles) || isInventory(user.roles) ? <>
                            <Borrow_Inventory_Modal
                                data={row}
                                onClick={configMethods.borrow}
                                button={<ButtonIcon color='warning' title='Borrow'>
                                    <FaArrowUp />
                                </ButtonIcon>}
                            />
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

                </Grid>
            </TableCell>
        </TableRow>
    );
}

export default TRCell