import { TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { LiaEdit } from "react-icons/lia";
import { LuArchiveRestore } from 'react-icons/lu';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import TD_FormalDate from '../TDS/TD_FormalDate';
import TD_Image from '../TDS/TD_Image';
import TD_Searchable from '../TDS/TD_Searchable';
import useSearchStore from '../../../hooks/useSearchStore';
import TD_SE from '../TDS/TD_SE';
import Add_Waste_Modal from './modal/Add_Waste_Modal';
import { MdDeleteOutline, MdOutlineClear } from 'react-icons/md';
import { IoMdCheckmark } from "react-icons/io";
import { notifyError } from '../../../utility_functions/toaster';
import Hide_Restore_Inventory_Modal from '../modal/Hide_Restore_Inventory_Modal';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const WasteTRCell = ({ row, index, configMethods, isAllow }) => {
    const { searchWaste } = useSearchStore()

    const labelId = `enhanced-table-checkbox-${index}`;
    const [editData, setEditData] = useState(row);
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
        <>
            <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TableCell component="th" id={labelId} >{row.id}</TableCell>
                <TD_Searchable searchValue={searchWaste} column={row.productName} />
                <TD_Searchable searchValue={searchWaste} column={row.category} />
                <TD_SE
                    isNumeric
                    handleEditingState={handleEditingState}
                    searchValue={searchWaste}
                    column={row.quantity + ''}
                    isAllow={isAllow}
                    labelToExclude={labelToExclude}
                    objKey='quantity'
                    setEditData={setEditData}
                    tdCancelEdit={tdCancelEdit}
                />
                <TD_Image image={row?.image} />
                <TD_FormalDate column={row.date} />
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
                            <>
                                {/* {!row.deleted_at ? */}
                                <>
                                    <Add_Waste_Modal
                                        button={
                                            <ButtonIcon title="edit">
                                                <LiaEdit />
                                            </ButtonIcon>
                                        }
                                        isUpdate
                                        handleUpdate={handleAllSubmitEdit}
                                        row={row}
                                    />

                                    {/* <Hide_Restore_Inventory_Modal
                                            data={{ id: row.id, productName: row.productName }}
                                            onClick={configMethods.delete}
                                            button={<ButtonIcon title="delete">
                                                <MdDeleteOutline />
                                            </ButtonIcon>}
                                        /> */}
                                </>
                                {/* : <Hide_Restore_Inventory_Modal
                                        restore
                                        data={{ id: row.id, productName: row.productName }}
                                        onClick={configMethods.delete}
                                        button={<ButtonIcon title="restore">
                                            <LuArchiveRestore />
                                        </ButtonIcon>
                                        }
                                    />} */}
                            </>}
                </TableCell>
            </CustomTableRow>
        </>
    );
}

export default WasteTRCell