import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

const TableLoading = ({ numRow = 8, numCell = 8 }) => {
    const rows = Array.from({ length: numRow }, (_, index) => index + 1);
    const cells = Array.from({ length: numCell }, (_, index) => index + 1);
    const getRandomDuration = () => {
        // Generate a random duration between 0.5s and 1.5s
        return `${Math.random() * (1.5 - 0.5) + 0.5}s`;
    };
    return (
        <TableBody>
            {rows.map((v) => (
                <TableRow className="fade-in" key={v}>
                    {
                        cells.map(num => (
                            <TableCell
                                key={num}
                                className='loading-cell'
                                sx={{ animationDuration: getRandomDuration(), flex: '1 1 auto', height: '1.5rem', mx: '0.5rem', py: 3.2, border: '2px solid white', }} />
                        ))
                    }
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableLoading;
