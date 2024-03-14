import { TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { LiaEdit } from "react-icons/lia";
import { LuArchiveRestore } from 'react-icons/lu';
import { MdDeleteOutline } from "react-icons/md";
import useSearchStore from '../../../hooks/useSearchStore';
import ButtonIcon from '../../../utility_components/ButtonIcon';
import TD_Blank from '../TDS/TD_Blank';
import TD_Chips from '../TDS/TD_Chips';
import TD_Column from '../TDS/TD_Column';
import TD_Conditional from '../TDS/TD_Conditional';
import TD_FormalDate from '../TDS/TD_FormalDate';
import TD_Searchable from '../TDS/TD_Searchable';
import TD_SearchableWImage from '../TDS/TD_SearchableWImage';
import Hide_Restore_Inventory_Modal from '../modal/Hide_Restore_Inventory_Modal';
import Add_Delivery_Modal from './modals/Add_Delivery_Modal';

const DeliveryTRCell = ({ row, index, configMethods }) => {
    const { searchDeliver } = useSearchStore()
    const labelId = `enhanced-table-checkbox-${index}`;

    const handleAllSubmitEdit = (allDataEdit, setError, setUpdating, handleClose) => {
        configMethods.update(row.id, allDataEdit, setUpdating, handleClose, setError);
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TD_Column border column={row.id} />
                <TD_Searchable searchValue={searchDeliver} border column={row.companyName} />
                <TD_Conditional border contionsValue={row.total_products} />
                <TD_Blank />
                <TD_Chips column={row.status} border />
                <TD_Blank />
                <TD_FormalDate border column={row?.arrivalDate} />
                <TD_Searchable searchValue={searchDeliver} border column={row.manageBy} />
                <TD_Conditional border contionsValue={row?.bill} leftValue={`₱${row?.bill}`} rightValue={null} />

                <TableCell sx={{ border: '1px solid #ddd' }}>
                    {!row.deleted_at ?
                        <>
                            <Add_Delivery_Modal
                                isEdit
                                defaultValue={row}
                                handleUpdate={handleAllSubmitEdit}
                                button={
                                    <ButtonIcon title="edit">
                                        <LiaEdit />
                                    </ButtonIcon>
                                }
                            />
                            <Hide_Restore_Inventory_Modal
                                data={{ id: row.id, productName: row.productName }}
                                onClick={configMethods.delete}
                                button={<ButtonIcon title="delete">
                                    <MdDeleteOutline />
                                </ButtonIcon>}
                            />
                        </> : <Hide_Restore_Inventory_Modal
                            restore
                            data={{ id: row.id, productName: row.companyName }}
                            onClick={configMethods.delete}
                            button={<ButtonIcon title="restore">
                                <LuArchiveRestore />
                            </ButtonIcon>
                            }
                        />}
                </TableCell>
            </TableRow>

            {/* sub table */}
            {
                row.products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell sx={{ border: '1px solid #ddd' }} component="th" id={labelId}></TableCell>
                        <TD_Blank />
                        <TD_SearchableWImage border searchValue={searchDeliver} column={product.productName} image={product.image} />
                        <TD_Searchable searchValue={searchDeliver} border column={product.category} />
                        <TD_Blank />
                        <TD_Column border column={product.quantity} />
                        <TD_Blank />
                        <TD_Blank />
                        <TD_Blank />
                        <TD_Blank />
                    </TableRow>
                ))
            }
        </>
    );
}

export default DeliveryTRCell