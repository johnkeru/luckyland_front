import { Box, Button, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import BorrowedItemsRow from './BorrowedItemsRow';

const Return_Borrowed_Items_Modal = ({
    handleCloseOpenBorrowedModal,
    openBorrowedModal,
    configMethods,
    data
}) => {
    const [loading, setLoading] = useState(false);
    const [whichButton, setWhichButton] = useState();

    const filteredBorrowedItems = data.borrowedItems.filter(bI => !bI.paid);

    const defaultReturnItems = filteredBorrowedItems.map(bI => ({ item_id: bI.item_id, paid: bI.borrowed_quantity * bI.price, return_quantity: 0 }))
    const [requestData, setRequestData] = useState({ customer_id: data.customerId, returnItems: defaultReturnItems });
    const [isReturnAll, setIsReturnAll] = useState(false);

    const totalPriceToPay = requestData.returnItems.reduce((total, item) => total + item.paid, 0);

    const handleReturnAll = (whichButtonClick) => {
        setIsReturnAll(true);
        const updatedReturnItems = filteredBorrowedItems.map(item => ({
            item_id: item.item_id,
            return_quantity: item.borrowed_quantity,
            paid: 0 // You can set the paid value as needed
        }));
        setRequestData(prevData => ({
            ...prevData,
            returnItems: updatedReturnItems
        }));

        setWhichButton(whichButtonClick);
        configMethods.returnAll(requestData, setLoading, handleCloseOpenBorrowedModal);
    };

    const handleSubmit = (whichButtonClick) => {
        setWhichButton(whichButtonClick);
        configMethods.returnPartial(requestData, setLoading, handleCloseOpenBorrowedModal);
    };

    return (
        <Modal
            button={<Button sx={{ display: 'none' }}>Close</Button>}
            open={openBorrowedModal}
            handleClose={handleCloseOpenBorrowedModal}
            maxWidth="md"
            loading={loading}
            title='Return Items'
            children={
                <>
                    <DialogContent dividers>
                        <Box width='750px'>
                            <Typography gutterBottom>
                                Prior to the customer's departure, kindly ensure that all items listed below are either returned or settled for payment. It's important to ensure that these items are accounted for to avoid any inconvenience or delays in the checkout process.
                            </Typography>

                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }}>Borrowed Item</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Borrowed Quantity</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Quantity to Return</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Replacement Cost</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        filteredBorrowedItems.map((borrowedItem) => (
                                            <BorrowedItemsRow
                                                key={borrowedItem.item_id}
                                                borrowedItem={borrowedItem}

                                                requestData={requestData}
                                                setRequestData={setRequestData}

                                                isReturnAll={isReturnAll}
                                            />
                                        ))
                                    }

                                    <TableRow>
                                        <TableCell sx={{ border: 'none', fontSize: 15, pt: 2, fontWeight: 600 }}>Total Replacement Cost:</TableCell>
                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                        <TableCell sx={{ border: 'none' }}></TableCell>
                                        <TableCell align='center' sx={{ pt: 2, fontSize: 16, border: 'none', fontWeight: 600 }}>₱ {totalPriceToPay}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            loading={loading && whichButton === 'all'}
                            disabled={loading}
                            color='primary'
                            loadingText='Returning...'
                            onClick={() => handleReturnAll('all')}
                        >
                            Return All
                        </ButtonWithLoading>

                        <ButtonWithLoading
                            loading={loading && whichButton === 'partial'}
                            disabled={loading}
                            color='info'
                            loadingText='Submitting...'
                            onClick={() => handleSubmit('partial')}
                        >
                            Submit
                        </ButtonWithLoading>
                    </CommonFooter>
                </>
            }
        />
    );
};

export default Return_Borrowed_Items_Modal;


/*


{
    "returnItems": [
        {
            "item_id": 1,
            "return_quantity": 323,
            "paid": 32
        }
    ],
    "customer_id": 2
}


*/