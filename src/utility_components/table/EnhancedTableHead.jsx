import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import TH_StatusFilter from "../../components/inventory/TH_StatusFilter";

export default function EnhancedTableHead({ order, orderBy, onRequestSort, configHead, handleToggle }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {configHead.map((headCell) => (
                    headCell.sortable ?
                        <TableCell key={headCell.label} sx={{ py: 2 }}>
                            <TableSortLabel
                                active={orderBy === headCell.query}
                                direction={orderBy === headCell.query ? order : 'asc'}
                                onClick={createSortHandler(headCell.query)}
                            >
                                {headCell.label}
                                {orderBy === headCell.label ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell> :
                        headCell.filter ?
                            <TH_StatusFilter key={headCell.label} handleToggle={handleToggle} options={headCell.options} label={headCell.label} query={headCell.query} /> :
                            <TableCell key={headCell.label}>
                                {headCell.label}
                            </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}