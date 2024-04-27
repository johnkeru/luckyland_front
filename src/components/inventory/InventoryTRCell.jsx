import { Grid, TableCell, TableRow, styled } from '@mui/material';
import React, { useState } from 'react';
import { LiaEdit } from 'react-icons/lia';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import useSearchStore from '../../hooks/useSearchStore';
import ButtonIcon from '../../utility_components/ButtonIcon';
import combineCategories from '../../utility_functions/combineCategories';
import formatDateTime from '../../utility_functions/formatTime';
import ItemStatusChip from './ItemStatusChip';
import TD_Column from './TDS/TD_Column';
import TD_Searchable from './TDS/TD_Searchable';
import TD_Searchable_Quantity from './TDS/TD_Searchable_Quantity';
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
    const [updating, setUpdating] = useState(false);

    const handleAllSubmitEdit = (allDataEdit, setError, setUpdating, handleClose) => {
        const handleCloseLocal = () => {
            handleClose(); // this will close the Edit Modal child.
        }
        configMethods.update(row.id, allDataEdit, setUpdating, handleCloseLocal, setError);
    }
    const { search } = useSearchStore();

    return (
        <CustomTableRow hover role="checkbox" tabIndex={-1}>
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

            <TD_Searchable_Quantity data={row} />


            <TableCell><ItemStatusChip status={row.status} /></TableCell>

            <TableCell>{formatDateTime(row.lastCheck)}</TableCell>

            <TableCell>
                <Grid sx={{ display: 'flex', gap: 1 }}>
                    {!row?.deleted_at && row.isBorrowable ? <BorrowMenu
                        isAllow={isFrontDesk}
                        data={row}
                        configMethods={configMethods}
                    /> : undefined}

                    <View_Item_Modal
                        button={<ButtonIcon title="view" sx={{ fontSize: '1.2rem', }}>
                            <MdOutlineRemoveRedEye />
                        </ButtonIcon>}
                        data={row}
                    />

                    {!row?.deleted_at && isAllow ? <>
                        <Edit_Item_Modal
                            handleAllSubmitEdit={handleAllSubmitEdit}
                            updating={updating}
                            inventoryData={row}
                            button={<ButtonIcon title="edit">
                                <LiaEdit />
                            </ButtonIcon>}
                            data={row}
                        />
                    </> : undefined}


                    {isAllow ? <>
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
                        />
                        }
                    </>
                        : undefined}

                </Grid>
            </TableCell>
        </CustomTableRow>
    );
}

export default InventoryTRCell

