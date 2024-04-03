import { Box, Button, DialogContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import BasicInputNumber from '../../../utility_components/BasicInputNumber';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';

const Return_Borrowed_Items_Modal = ({
    handleCloseOpenBorrowedModal,
    handleCloseAll,
    openBorrowedModal,
    configMethods,
    data
}) => {
    const [loading, setLoading] = useState(false);
    const [whichButton, setWhichButton] = useState();
    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>;

    const [localBorrowedItems, setLocalBorrowedItems] = useState(data.borrowedItems.map(b => ({ ...b, new_quantity: 0 })));

    const handlePartialReturn = (whichButtonClick) => {
        setWhichButton(whichButtonClick);
        const returnItems = localBorrowedItems.map(item => ({ item_id: item.item_id, return_quantity: parseInt(item.new_quantity) }))
        const returnData = Object.assign({ returnItems }, { customer_id: data.customerId });
        configMethods.returnPartial(returnData, setLoading, handleCloseOpenBorrowedModal);
    };
    const handleForceDepart = (whichButtonClick) => {
        setWhichButton(whichButtonClick);
        configMethods.updateStatus(data.id, { status: 'Depart' }, setLoading, handleCloseAll);
    }
    // return all borrowed to endpoint
    // const handleReturnAll = (whichButtonClick) => {
    //     setWhichButton(whichButtonClick);
    //     configMethods.returnAll(customerId, setLoading, handleCloseOpenBorrowedModal);
    // };

    const handleChange = (newQuantity, productName) => {
        setLocalBorrowedItems(prev => {
            return prev.map(item => {
                if (item.productName === productName) {
                    return { ...item, new_quantity: newQuantity };
                }
                return item;
            });
        });
    }

    const handleReturnAll = () => {
        setLocalBorrowedItems(
            data.borrowedItems.map(b => ({
                ...b,
                new_quantity: b.borrowed_quantity
            }))
        );
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

                        <Box display='flex' justifyContent='end'>
                            <ButtonIconText
                                Icon={<IoMdDoneAll />}
                                text='return all'
                                onClick={handleReturnAll}
                                variant='outlined'
                            />
                        </Box>
                        {localBorrowedItems.map((borrowedItem) => (
                            <Box key={borrowedItem.item_id} my={2} display='flex' alignItems='center' justifyContent='space-between' gap={2}>
                                <Typography variant='h5' >{borrowedItem.productName} : </Typography>
                                <Box display='flex' alignItems='center' gap={1}>
                                    <Typography variant='h5' >{borrowedItem.borrowed_quantity} / </Typography>
                                    <BasicInputNumber
                                        value={borrowedItem.new_quantity}
                                        sx={{ width: '60px' }}
                                        onChange={e => handleChange(e.target.value, borrowedItem.productName)}
                                    />
                                    {/* {
                                        borrowedItem.new_quantity === borrowedItem.borrowed_quantity ?
                                            undefined :
                                            <ButtonIcon
                                                title='fill'
                                                size='small'
                                                onClick={() => handleChange(borrowedItem.borrowed_quantity, borrowedItem.productName)}
                                                children={<FaCheck />}
                                            />
                                    } */}
                                </Box>
                            </Box>
                        ))}
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            loading={loading && whichButton === 'depart'}
                            disabled={loading}
                            color='error'
                            variant='outlined'
                            loadingText='Forcing Depart...'
                            onClick={() => handleForceDepart('depart')}
                        >
                            Force Depart
                        </ButtonWithLoading>

                        <ButtonWithLoading
                            loading={loading && whichButton === 'partial'}
                            disabled={loading}
                            color='info'
                            loadingText='Returning...'
                            onClick={() => handlePartialReturn('partial')}
                        >
                            Return
                        </ButtonWithLoading>

                        {/* <ButtonWithLoading
                            loading={loading && whichButton === 'all'}
                            disabled={loading}
                            color='info'
                            loadingText='Returning all...'
                            onClick={() => handleReturnAll('all')}
                        >
                            Return all
                        </ButtonWithLoading> */}
                    </CommonFooter>
                </>
            }
        />
    );
};

export default Return_Borrowed_Items_Modal;

