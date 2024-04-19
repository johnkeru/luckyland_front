import { Grid, TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdDeleteOutline, MdOutlineClear, MdOutlineRemoveRedEye } from 'react-icons/md';
import useSearchStore from '../../hooks/useSearchStore';
import ButtonIcon from '../../utility_components/ButtonIcon';
import combineCategories from '../../utility_functions/combineCategories';
import formatDateTime from '../../utility_functions/formatTime';
import ItemStatusChip from './ItemStatusChip';
import TD_Column from './TDS/TD_Column';
import TD_E_Image from './TDS/TD_E_Image';
import TD_SE_Quantity from './TDS/TD_SE_Quantity';
import TD_Searchable from './TDS/TD_Searchable';
import BorrowMenu from './menu/BorrowMenu';
import Edit_Item_Modal from './modal/Edit_Item_Modal';
import Hide_Restore_Item_Modal from './modal/Hide_Restore_Item_Modal';
import View_Item_Modal from './modal/View_Item_Modal';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const InventoryTRCell = ({ row, configMethods, isAllow, isFrontDesk }) => {
    const [editData, setEditData] = useState({ image: row?.image, name: row.name });
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
        configMethods.inlineUpdate(row.id, editData, setUpdating, handleCancelEdit);
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
    const { search } = useSearchStore();

    return (
        <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: rowActive ? grey['200'] : undefined }}>
            <TD_Column column={row.id} />

            {/* dont edit the item name */}
            {/* <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={row.name}
                objKey={'name'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAllow && !row.deleted_at}
                searchValue={search}
            /> */}
            <TD_Searchable column={row.name} searchValue={search} />

            <TD_Searchable column={combineCategories(row.categories)} searchValue={search} />

            <TD_SE_Quantity
                tdCancelEdit={tdCancelEdit}
                data={row}
                objKey={'currentQuantity'}
                labelToExclude={labelToExclude}
                handleEditingState={handleEditingState}
                setEditData={setEditData}
                isAllow={false}
            />


            <TableCell><ItemStatusChip status={row.status} /></TableCell>

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
                                {isFrontDesk && !row?.deleted_at && row.isBorrowable ? <BorrowMenu
                                    data={row}
                                    configMethods={configMethods}
                                /> : undefined}

                                <View_Item_Modal
                                    button={<ButtonIcon title="view" sx={{ fontSize: '1.2rem', }}>
                                        <MdOutlineRemoveRedEye />
                                    </ButtonIcon>}
                                    data={row}
                                />

                                {
                                    isAllow ? <>
                                        {!row?.deleted_at ? <>
                                            <Edit_Item_Modal
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
                                        {!row.deleted_at ? <Hide_Restore_Item_Modal
                                            data={{ id: row.id, name: row.name }}
                                            onClick={configMethods.delete}
                                            button={<ButtonIcon title="delete">
                                                <MdDeleteOutline />
                                            </ButtonIcon>
                                            }
                                        /> : <Hide_Restore_Item_Modal
                                            restore
                                            data={{ id: row.id, name: row.name }}
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

