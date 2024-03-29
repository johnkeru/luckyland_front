import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import React from 'react';

import { IoClose } from "react-icons/io5";
import { NO_IMAGE, resizeInventoryPic } from "../../../../../utility_functions/cloudinaryUrl";

const ItemCell = ({ item, setSelectedItems }) => {

    const handleRemove = (id) => {
        setSelectedItems(prev => {
            return prev.filter(item => item.id !== id);
        });
    };

    return (
        <TableRow>
            <TableCell>
                <img
                    src={item?.image ? resizeInventoryPic(item?.image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')}
                    style={{ marginRight: '10px' }}
                />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>
                <TextField
                    size='small'
                    type='number'
                    value={item?.quantity || 0} // Assuming item is the current item being rendered
                    onChange={e => {
                        const newQuantity = parseInt(e.target.value);
                        setSelectedItems(prev => {
                            return prev.map(p => {
                                if (p.id === item.id) {
                                    return { ...p, quantity: newQuantity };
                                } else {
                                    return p;
                                }
                            });
                        });
                    }}
                    error={!!item?.error} // Sets error state based on item.error
                    sx={{ border: !!item?.error ? '2px solid red' : undefined, zIndex: -0, borderRadius: 2, width: '80px' }} // Changes border color to red if there's an error
                />
            </TableCell>
            <TableCell>
                <IconButton size='small' color='error' title='remove' onClick={() => handleRemove(item.id)}>
                    <IoClose />
                </IconButton>
            </TableCell>

        </TableRow>
    );
}


export default ItemCell
