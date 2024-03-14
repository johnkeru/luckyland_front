import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import React from 'react';

import { IoClose } from "react-icons/io5";
import { NO_IMAGE, resizeInventoryPic } from "../../../../../utility_functions/cloudinaryUrl";

const ProductCell = ({ product, setSelectedProducts }) => {

    const handleRemove = (id) => {
        setSelectedProducts(prev => {
            return prev.filter(product => product.id !== id);
        });
    };

    return (
        <TableRow>
            <TableCell>
                <img
                    src={product?.image ? resizeInventoryPic(product?.image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')}
                    style={{ marginRight: '10px' }}
                />
            </TableCell>
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
                <TextField
                    size='small'
                    type='number'
                    value={product.quantity} // Assuming product is the current product being rendered
                    onChange={e => {
                        const newQuantity = parseInt(e.target.value);
                        setSelectedProducts(prev => {
                            return prev.map(p => {
                                if (p.id === product.id) {
                                    return { ...p, quantity: newQuantity };
                                } else {
                                    return p;
                                }
                            });
                        });
                    }}
                    error={!!product?.error} // Sets error state based on product.error
                    sx={{ border: !!product?.error ? '2px solid red' : undefined, zIndex: -0, borderRadius: 2, width: '80px' }} // Changes border color to red if there's an error
                />
            </TableCell>
            <TableCell>
                <IconButton size='small' color='error' title='remove' onClick={() => handleRemove(product.id)}>
                    <IoClose />
                </IconButton>
            </TableCell>

        </TableRow>
    );
}


export default ProductCell
