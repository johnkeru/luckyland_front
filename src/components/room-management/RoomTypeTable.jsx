import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import formatNumber from '../../utility_functions/formatPrice';
import truncateText from '../../utility_functions/truncateText';

import ViewAllTypeAttributes from './modal/ViewAllTypeAttributes';
import EditRoomType from './modal/EditRoomType';

const RoomTable = ({ rooms, onSuccess }) => {
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Room Type</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Min Capacity</TableCell>
                        <TableCell>Max Capacity</TableCell>
                        <TableCell>Attributes</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room) => (
                        <TableRow key={room.id} sx={{ bgcolor: 'background.white' }}>
                            <TableCell>{room.type}</TableCell>
                            <TableCell>₱{formatNumber(room.price)}</TableCell>
                            <TableCell>{room.minCapacity}</TableCell>
                            <TableCell>{room.maxCapacity}</TableCell>
                            <TableCell>
                                <Box display='flex' alignItems='center'>
                                    {truncateText(room.attributes[0].name, 40, false)}
                                    <ViewAllTypeAttributes
                                        room={room}
                                        button={<Button size='small' color='info' sx={{ textTransform: 'lowercase' }}>
                                            view all attributes
                                        </Button>}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell>
                                {/* Add action button here */}
                                <EditRoomType
                                    onSuccess={onSuccess}
                                    button={<Button variant='contained' size='small'>
                                        Edit {room.type} rooms
                                    </Button>}
                                    room={room}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoomTable;
