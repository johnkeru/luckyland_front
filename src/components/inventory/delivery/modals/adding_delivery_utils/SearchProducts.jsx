import { Box, Typography } from "@mui/material";
import React from 'react';

import { grey } from "@mui/material/colors";
import { NO_IMAGE, resizeInventoryPic } from "../../../../../utility_functions/cloudinaryUrl";

const SearchProducts = ({ loading, products, handleSelectedProduct }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 45,
                left: 0,
                width: '100%',
                height: '100%',
                m: 'auto',
                zIndex: 2
            }}
        >
            <Box sx={{
                bgcolor: 'white',
                boxShadow: 2,
                p: 1,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
            }}>
                {
                    loading ? <Typography color='GrayText'>Loading...</Typography> :
                        products.data.length === 0 ? <Typography color='GrayText'>No products found.</Typography> :
                            products.data.map(product => (
                                <Box key={product.id}
                                    onClick={() => handleSelectedProduct(product)}
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'white', alignItems: 'center', ":hover": { bgcolor: grey[100] } }}
                                >
                                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <img src={product?.image ? resizeInventoryPic(product?.image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')} style={{ marginRight: '10px' }} />
                                        <span>{product.productName}</span>
                                    </Typography>
                                    <Typography variant='body2' color='GrayText'>{product.category}</Typography>
                                </Box>
                            ))
                }
            </Box>
        </Box>
    )
}

export default SearchProducts