import { TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BasicInputNumber from '../../../utility_components/BasicInputNumber'

const BorrowedItemsRow = ({ isReturnAll, borrowedItem, requestData, setRequestData }) => {

    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const defaultQuantity = requestData.returnItems.find(item => item.item_id === borrowedItem.item_id)?.return_quantity || 0
        setQuantity(defaultQuantity);
    }, [isReturnAll])

    const handleQuantity = (e) => {
        const newQuantity = parseInt(e.target.value);

        // Check if the new quantity is greater than borrowedItem.borrowed_quantity or less than zero
        if (newQuantity > borrowedItem.borrowed_quantity) {
            setError(`Quantity cannot exceed ${borrowedItem.borrowed_quantity}`);
            return;
        } else if (newQuantity < 0) {
            setError("Quantity cannot be less than zero");
            return;
        }

        // Reset error if quantity is within valid range
        setError(null);

        setQuantity(newQuantity);

        // Find the index of the borrowed item in returnItems array
        const index = requestData.returnItems.findIndex(item => item.item_id === borrowedItem.item_id);

        // If the item is not found in returnItems, add it; otherwise, update its return_quantity
        if (index === -1) {
            setRequestData(prevData => ({
                ...prevData,
                returnItems: [
                    ...prevData.returnItems,
                    {
                        item_id: borrowedItem.item_id,
                        return_quantity: newQuantity,
                        paid: (borrowedItem.borrowed_quantity - newQuantity) * borrowedItem.price
                    }
                ]
            }));
        } else {
            setRequestData(prevData => ({
                ...prevData,
                returnItems: prevData.returnItems.map((item, idx) => {
                    if (idx === index) {
                        return {
                            ...item,
                            return_quantity: newQuantity,
                            paid: (borrowedItem.borrowed_quantity - newQuantity) * borrowedItem.price
                        };
                    }
                    return item;
                })
            }));
        }
    };

    return (
        <>
            <TableRow>
                <TableCell>{borrowedItem.name}</TableCell>
                <TableCell>₱ {borrowedItem.price}</TableCell>
                <TableCell align='center'>{borrowedItem.borrowed_quantity}</TableCell>
                <TableCell align='center'>
                    <BasicInputNumber
                        value={quantity}
                        sx={{ width: '75px' }}
                        onChange={handleQuantity}
                        error={error} // Pass the error to the BasicInputNumber component
                    />
                </TableCell>
                <TableCell align='center'>
                    ₱ {(borrowedItem.borrowed_quantity - quantity) * borrowedItem.price}
                </TableCell>
            </TableRow>
        </>
    )
}

export default BorrowedItemsRow
