import React, { useState } from 'react';
import { Box, Button, DialogContent, TextField, Typography } from '@mui/material';
import Modal from '../../../utility_components/modal/Modal';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import BasicInputNumber from '../../../utility_components/BasicInputNumber';

const Return_Borrowed_Items_Modal = ({
    handleCloseOpenBorrowedModal,
    openBorrowedModal,
    borrowedItems,
    customerId,
    configMethods,
}) => {
    const [loading, setLoading] = useState(false);
    const [whichButton, setWhichButton] = useState();
    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>;

    const [localBorrowedItems, setLocalBorrowedItems] = useState(borrowedItems.map(b => ({ ...b, borrowed_quantity: 0 })));

    const handlePartialReturn = (whichButtonClick) => {
        setWhichButton(whichButtonClick);
        const returnItems = localBorrowedItems.map(item => ({ inventory_id: item.inventory_id, return_quantity: parseInt(item.borrowed_quantity) }))
        const returnData = Object.assign({ returnItems }, { customer_id: customerId });
        configMethods.returnPartial(returnData, setLoading, handleCloseOpenBorrowedModal);
    };

    const handleReturnAll = (whichButtonClick) => {
        setWhichButton(whichButtonClick);
        configMethods.returnAll(customerId, setLoading, handleCloseOpenBorrowedModal);
    };

    const handleChange = (newQuantity, productName) => {
        setLocalBorrowedItems(prev => {
            prev.map(item => {
                if (item.productName === productName) {
                    item.borrowed_quantity = newQuantity;
                }
            })
            return prev;
        });
    }

    return (
        <Modal
            button={hiddenButton}
            open={openBorrowedModal}
            handleClose={handleCloseOpenBorrowedModal}
            maxWidth="sm"
            loading={loading}
            title='Return Items'
            children={
                <>
                    <DialogContent dividers sx={{ width: '420px' }}>
                        <Typography gutterBottom>
                            Please ensure that the following items are returned before customer departure:
                        </Typography>
                        {borrowedItems.map((borrowedItem) => (
                            <Box key={borrowedItem.inventory_id} my={2} display='flex' alignItems='center' justifyContent='space-between' gap={2}>
                                <Typography variant='h5' >{borrowedItem.productName} : </Typography>
                                <Box display='flex' alignItems='center' gap={2}>
                                    <Typography variant='h5' >{borrowedItem.borrowed_quantity} / </Typography>
                                    <BasicInputNumber
                                        defaultValue={0}
                                        sx={{ width: '70px' }}
                                        onChange={e => handleChange(e.target.value, borrowedItem.productName)}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            loading={loading && whichButton === 'partial'}
                            disabled={loading}
                            color='secondary'
                            loadingText='Returning Partially...'
                            onClick={() => handlePartialReturn('partial')}
                        >
                            Return Partial
                        </ButtonWithLoading>

                        <ButtonWithLoading
                            loading={loading && whichButton === 'all'}
                            disabled={loading}
                            color='info'
                            loadingText='Returning all...'
                            onClick={() => handleReturnAll('all')}
                        >
                            Return all
                        </ButtonWithLoading>
                    </CommonFooter>
                </>
            }
        />
    );
};

export default Return_Borrowed_Items_Modal;

