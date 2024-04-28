import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import formatNumber from '../../utility_functions/formatPrice';
import truncateText from '../../utility_functions/truncateText';

import AddAndEditRoomType from './modal/AddAndEditRoomType';
import ViewAllTypeAttributes from './modal/ViewAllTypeAttributes';

const RoomTable = ({ onSuccess, roomTypes, isCottage, isAllow }) => {
    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Room Type</TableCell>
                        <TableCell>Rooms</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Capacity</TableCell>
                        <TableCell>Attributes</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roomTypes.map((roomType) => (
                        <TableRow key={roomType.id} sx={{ bgcolor: 'background.white', }}>
                            <TableCell>{roomType.type}</TableCell>
                            <TableCell>{!isCottage ? roomType.rooms_count : roomType.cottages_count}</TableCell>
                            <TableCell>₱{formatNumber(roomType.price)}</TableCell>
                            <TableCell>{isCottage ? roomType.capacity : roomType.minCapacity}</TableCell>
                            <TableCell align='center'>
                                <Box display='flex' alignItems='center'>
                                    {truncateText(roomType.attributes[0].name, 40, false)}
                                    {
                                        roomType.attributes.length > 1 ? <ViewAllTypeAttributes
                                            roomType={roomType}
                                            button={<Button size='small' color='info' sx={{ textTransform: 'lowercase' }}>
                                                view all attributes
                                            </Button>}
                                        /> : undefined
                                    }
                                </Box>
                            </TableCell>
                            <TableCell>
                                {/* Add action button here */}
                                {isAllow ? <AddAndEditRoomType
                                    isCottage={isCottage}
                                    onSuccess={onSuccess}
                                    button={<Button variant='outlined' color='info' size='small'>
                                        Edit
                                    </Button>}
                                    roomType={roomType}
                                /> : 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoomTable;
