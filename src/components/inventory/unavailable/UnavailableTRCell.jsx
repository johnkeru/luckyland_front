import { TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { IoMdCheckmark } from "react-icons/io";
import { LiaEdit } from "react-icons/lia";
import { LuArchiveRestore } from 'react-icons/lu';
import { MdOutlineClear } from 'react-icons/md';
import { TbMoneybag } from "react-icons/tb";
import useSearchStore from '../../../hooks/useSearchStore';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import { notifyError } from '../../../utility_functions/toaster';
import TD_Image from '../TDS/TD_Image';
import TD_SE from '../TDS/TD_SE';
import TD_Searchable from '../TDS/TD_Searchable';
import Add_To_Another from './modal/Add_To_Another';
import Add_Unavailable_Modal from './modal/Add_Unavailable_Modal';
import TD_Column from '../TDS/TD_Column';
import combineCategories from '../../../utility_functions/combineCategories';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const UnavailableTRCell = ({ row, index, configMethods, isAllow }) => {
    const { searchUnavailable, } = useSearchStore();

    const labelId = `enhanced-table-checkbox-${index}`;
    const [editData, setEditData] = useState({});
    const [selectedIdToEdit, setSelectedIdToEdit] = useState(-1);
    const [labelToExclude, setLabelToExclude] = useState([]);
    const [updating, setUpdating] = useState(false);

    const handleEditingState = (label) => {
        setSelectedIdToEdit(row.id);
        setLabelToExclude(prev => [...prev, label])
    }

    const handleCancelEdit = () => {
        setSelectedIdToEdit(-1);
        setEditData({})
        setLabelToExclude([])
    }

    // for image cancel uploading image
    const tdCancelEdit = (label) => {
        setLabelToExclude(prev => prev.filter(excludedLabel => excludedLabel !== label));
    }

    const handleInlineSubmitEdit = () => {
        if (editData.quantity > row.quantity + row.currentQuantity) {
            notifyError({ message: "Quantity exceeds available stock." });
            return;
        }
        if (editData.quantity < 0) {
            notifyError({ message: 'Invalid quantity' });
            return;
        }
        configMethods.inlineUpdate(row.id, editData, setUpdating, handleCancelEdit);
    }

    const handleAllSubmitEdit = (allDataEdit, setError, setUpdating, handleClose) => {
        const handleCloseLocal = () => {
            handleClose(); // this will close the Edit Modal child.
            handleCancelEdit(); // this will close something within this component.
        }
        configMethods.update(row.id, allDataEdit, setUpdating, handleCloseLocal, setError);
    }

    const handleAddToAnother = (body, setLoading, setError, handleClose, inInventory) => {
        if (inInventory) {
            configMethods.addToOther(row.id, body, setLoading, setError, handleClose, true)
        } else {
            configMethods.addToOther(row.id, body, setLoading, setError, handleClose)
        }
    }

    return (
        <>
            <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TableCell component="th" id={labelId} >{row.id}</TableCell>
                <TD_Searchable searchValue={searchUnavailable} column={row.name} />
                <TD_SE
                    handleEditingState={handleEditingState}
                    searchValue={searchUnavailable}
                    column={row.reason}
                    // isAllow={isAllow}
                    labelToExclude={labelToExclude}
                    objKey='reason'
                    setEditData={setEditData}
                    tdCancelEdit={tdCancelEdit}
                />
                <TD_Column column={combineCategories(row.categories)} />

                <TD_SE
                    isNumeric
                    handleEditingState={handleEditingState}
                    searchValue={searchUnavailable}
                    column={row.quantity + ''}
                    labelToExclude={labelToExclude}
                    objKey='quantity'
                    setEditData={setEditData}
                    tdCancelEdit={tdCancelEdit}
                    isAllow={isAllow}
                />
                <TD_Image image={row?.image} />
                <TableCell>
                    {
                        (selectedIdToEdit === row.id && labelToExclude.length !== 0) ? <>
                            <ButtonIcon title="update" onClick={handleInlineSubmitEdit} disabled={updating} loading={updating} sx={{ fontSize: '1.5rem' }}>
                                <IoMdCheckmark />
                            </ButtonIcon>
                            <ButtonIcon title="cancel" onClick={handleCancelEdit} disabled={updating} sx={{ fontSize: '1.5rem' }}>
                                <MdOutlineClear />
                            </ButtonIcon>
                        </> :
                            isAllow ? <>
                                {/* {!row.deleted_at ? */}
                                <>
                                    {/* <Add_Unavailable_Modal
                                        button={
                                            <ButtonIcon title="edit">
                                                <LiaEdit />
                                            </ButtonIcon>
                                        }
                                        isUpdate
                                        handleUpdate={handleAllSubmitEdit}
                                        row={row}
                                    /> */}

                                    <Add_To_Another
                                        addToInventory
                                        handleOnSubmit={handleAddToAnother}
                                        row={row}
                                        button={<ButtonIcon title="add to inventory">
                                            <LuArchiveRestore />
                                        </ButtonIcon>}
                                    />

                                    <Add_To_Another
                                        handleOnSubmit={handleAddToAnother}
                                        row={row}
                                        button={<ButtonIcon title="add to waste">
                                            <TbMoneybag />
                                        </ButtonIcon>}
                                    />
                                </>

                            </> : undefined
                    }
                </TableCell>
            </CustomTableRow>
        </>
    );
}

export default UnavailableTRCell


//   : <Hide_Restore_Item_Modal
//     restore
//     data={{ id: row.id, name: row.name }}
//     onClick={configMethods.delete}
//     button={<ButtonIcon title="delete">
//         <MdDeleteOutline />
//     </ButtonIcon>
//     }
// />}