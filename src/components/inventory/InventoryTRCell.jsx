import { Grid, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { IoMdArrowUp, IoMdCheckmark } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdDeleteOutline, MdOutlineClear, MdOutlineRemoveRedEye } from 'react-icons/md';
import ButtonIcon from '../../utility_components/ButtonIcon';
import Borrow_Inventory_Modal from './modal/Borrow_Inventory_Modal';
import Edit_Inventory_Modal from './modal/Edit_Inventory_Modal';
import Hide_Restore_Inventory_Modal from './modal/Hide_Restore_Inventory_Modal';
import View_Inventory_Modal from './modal/View_Inventory_Modal';
import formatDateTime from '../../utility_functions/formatTime';
import InventoryStatusChip from './InventoryStatusChip';
import TD_E_Image from './TDS/TD_E_Image';
import TD_SE from './TDS/TD_SE';
import TD_Column from './TDS/TD_Column';
import TD_SE_Quantity from './TDS/TD_SE_Quantity';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const InventoryTRCell = ({ row, configMethods, isAllow }) => {
    const [editData, setEditData] = useState(row);
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
        const updatedData = Object.assign(editData, { product_id: row.product_id, category_id: row.category_id });
        // Check if the object has currentQuantity but no maxQuantity
        if (updatedData.hasOwnProperty('currentQuantity') && !updatedData.hasOwnProperty('maxQuantity')) {
            // Add maxQuantity with the value of row.maxQuantity
            updatedData.maxQuantity = row.maxQuantity;
        }
        configMethods.update(row.id, updatedData, setUpdating, handleCancelEdit);
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
            <TD_Column column={row.id} />
            <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={row.productName}
                objKey={'productName'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAllow && !row.deleted_at}
            />
            <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={row.category}
                objKey={'category'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAllow && !row.deleted_at}
            />

            <TD_SE_Quantity
                tdCancelEdit={tdCancelEdit}
                data={row}
                objKey={'currentQuantity'}
                labelToExclude={labelToExclude}
                handleEditingState={handleEditingState}
                setEditData={setEditData}
                isAllow={false}
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
                isAllow={isAllow && !row.deleted_at}
            />

            <TableCell>{formatDateTime(row.lastCheck)}</TableCell>

            <TableCell>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                    {
                        (selectedIdToEdit === row.id && labelToExclude.length !== 0) ? <>
                            <ButtonIcon title="update" onClick={handleInlineSubmitEdit} disabled={updating} loading={updating} sx={{ fontSize: '1.5rem' }}>
                                <IoMdCheckmark />
                            </ButtonIcon>
                            <ButtonIcon title="cancel" onClick={handleInlineCancelEdit} disabled={updating} sx={{ fontSize: '1.5rem' }}>
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
                                        {!row?.deleted_at ? <>
                                            <Borrow_Inventory_Modal
                                                draggable={true}
                                                data={row}
                                                onClick={configMethods.borrow}
                                                button={<ButtonIcon title='Borrow'>
                                                    <IoMdArrowUp />
                                                </ButtonIcon>}
                                            />
                                            <Edit_Inventory_Modal
                                                handleAllSubmitEdit={handleAllSubmitEdit}
                                                image={image}
                                                setImage={setImage}
                                                updating={updating}
                                                inventoryData={row}
                                                button={<ButtonIcon title="edit">
                                                    <LiaEdit />
                                                </ButtonIcon>}
                                                data={row}
                                            />
                                        </> : undefined}
                                        {!row.deleted_at ? <Hide_Restore_Inventory_Modal
                                            data={{ id: row.id, productName: row.productName }}
                                            onClick={configMethods.delete}
                                            button={<ButtonIcon title="delete">
                                                <MdDeleteOutline />
                                            </ButtonIcon>
                                            }
                                        /> : <Hide_Restore_Inventory_Modal
                                            restore
                                            data={{ id: row.id, productName: row.productName }}
                                            onClick={configMethods.delete}
                                            button={<ButtonIcon title="restore">
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