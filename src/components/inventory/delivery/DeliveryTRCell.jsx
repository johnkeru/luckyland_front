import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import useSearchStore from '../../../hooks/useSearchStore';
import TD_Blank from '../TDS/TD_Blank';
import TD_Column from '../TDS/TD_Column';
import TD_Conditional from '../TDS/TD_Conditional';
import TD_FormalDate from '../TDS/TD_FormalDate';
import TD_Searchable from '../TDS/TD_Searchable';
import TD_SearchableWImage from '../TDS/TD_SearchableWImage';
import combineCategories from '../../../utility_functions/combineCategories'

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.paper, // Even row color
    },
}));

const DeliveryTRCell = ({ row, index, }) => {
    const { searchDeliver } = useSearchStore()
    const [open, setOpen] = useState(false);

    const [isUp, setIsUp] = useState(true);

    const handleToggle = () => {
        setIsUp(!isUp);
        setOpen(!open)
    }

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100], cursor: 'pointer' }} onClick={handleToggle}>
                <TD_Blank withChevron isUp={isUp} />
                <TD_Searchable searchValue={searchDeliver} border column={row.companyName} />
                <TD_Conditional border contionsValue={row.total_items} />
                <TD_FormalDate border column={row?.arrivalDate} />
                <TD_Searchable searchValue={searchDeliver} border column={row.manageBy} />
                <TD_Column column={`₱ ${row?.bill || 0}`} />
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }}>Item Name</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item) => (
                                        <CustomTableRow key={item.id}>
                                            <TD_SearchableWImage searchValue={searchDeliver} column={item.name} image={item.image} />
                                            <TableCell>{combineCategories(item.categories)}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                        </CustomTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default DeliveryTRCell