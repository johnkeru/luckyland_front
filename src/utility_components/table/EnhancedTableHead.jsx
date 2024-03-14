import { TableCell, TableHead, TableRow } from "@mui/material";
import TH_ChipFilter from "../../components/inventory/TH_ChipFilter";
import TH_Sortable from "../../components/inventory/TH_Sortable";
import TH_StatusFilter from "../../components/inventory/TH_StatusFilter";

export default function EnhancedTableHead({ configHead, handleToggle }) {

    return (
        <TableHead>
            <TableRow>
                {configHead.map((headCell) => (
                    headCell.sortable ?
                        <TH_Sortable
                            query={headCell.query}
                            key={headCell.label}
                            label={headCell.label}
                            handleToggle={handleToggle}
                        /> :
                        headCell.filter ?
                            <TH_StatusFilter
                                key={headCell.label}
                                handleToggle={handleToggle}
                                options={headCell.options}
                                label={headCell.label}
                                query={headCell.query}
                            /> :
                            headCell.chip_filter ?
                                <TH_ChipFilter
                                    key={headCell.label}
                                    options={headCell.options}
                                    handleToggle={handleToggle}
                                    label={headCell.label}
                                    query={headCell.query}
                                /> :
                                <TableCell key={headCell.label}>
                                    {headCell.label}
                                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}