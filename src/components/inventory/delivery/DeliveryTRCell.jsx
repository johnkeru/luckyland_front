import { TableCell, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import useSearchStore from '../../../hooks/useSearchStore';
import TD_Blank from '../TDS/TD_Blank';
import TD_Column from '../TDS/TD_Column';
import TD_Conditional from '../TDS/TD_Conditional';
import TD_FormalDate from '../TDS/TD_FormalDate';
import TD_Searchable from '../TDS/TD_Searchable';
import TD_SearchableWImage from '../TDS/TD_SearchableWImage';


const DeliveryTRCell = ({ row, index, }) => {
    const { searchDeliver } = useSearchStore()
    const labelId = `enhanced-table-checkbox-${index}`;
    const [open, setOpen] = useState(false);

    const [isUp, setIsUp] = useState(true);

    const handleToggle = () => {
        setIsUp(!isUp);
        setOpen(!open)
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100], cursor: 'pointer' }} onClick={handleToggle}>
                <TD_Column border column={row.id} py={1.5} />
                <TD_Searchable searchValue={searchDeliver} border column={row.companyName} />
                <TD_Conditional border contionsValue={row.total_products} />
                <TD_Blank />
                <TD_Blank withChevron isUp={isUp} />
                <TD_FormalDate border column={row?.arrivalDate} />
                <TD_Searchable searchValue={searchDeliver} border column={row.manageBy} />
                <TD_Column column={`₱ ${row?.bill || 0}`} />
            </TableRow>

            {/* sub table */}
            {
                open ? row.products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell sx={{ border: '1px solid #ddd' }} component="th" id={labelId}></TableCell>
                        <TD_Blank />
                        <TD_SearchableWImage border searchValue={searchDeliver} column={product.productName} image={product.image} />
                        <TD_Searchable searchValue={searchDeliver} border column={product.category} />
                        <TD_Column border column={product.quantity} />
                        <TD_Blank />
                        <TD_Blank />
                        <TD_Blank />
                    </TableRow>
                )) : undefined
            }
        </>
    );
}

export default DeliveryTRCell