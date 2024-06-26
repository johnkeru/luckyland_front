import { TableCell, TableRow, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { RiDownload2Line } from 'react-icons/ri';
import ButtonWithLoading from '../../utility_components/ButtonWithLoading';
import TD_Column from '../inventory/TDS/TD_Column';

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Odd row color
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Even row color
    },
}));

const BackupTRCell = ({ row, configMethods }) => {
    const [loading, setLoading] = useState(false);
    const handleDownload = () => {
        configMethods.download(row.id, setLoading);
    }

    function bytesToMb(bytes) {
        const mb = bytes / (1024 * 1024);
        return mb.toFixed(2) + ' MB'; // Limiting to 2 decimal places
    }

    return (
        <>
            <CustomTableRow hover role="checkbox" tabIndex={-1} sx={{ bgcolor: grey[100] }}>
                <TD_Column column={row.id} />
                <TD_Column column={row.filename} />
                <TD_Column column={bytesToMb(row.size)} />
                <TD_Column column={row.status} />
                <TD_Column column={row.checksum} />

                <TableCell>
                    <ButtonWithLoading
                        loading={loading}
                        size='small'
                        color='info'
                        variant="outlined"
                        icon={<RiDownload2Line />}
                        onClick={handleDownload}
                    >
                        Download
                    </ButtonWithLoading>
                </TableCell>
            </CustomTableRow>
        </>
    );
}

export default BackupTRCell