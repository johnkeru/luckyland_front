import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiBuilding2Fill } from "react-icons/ri";
import * as yup from 'yup';

import { FaPlus } from 'react-icons/fa';
import ButtonIconText from '../../../../utility_components/ButtonIconText';
import ButtonWithLoading from '../../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../../utility_components/InputIcon';
import ViewInfo from '../../../../utility_components/ViewInfo';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import { resizeInventoryPic } from '../../../../utility_functions/cloudinaryUrl';
import Add_Item_Modal from './Add_Item_Modal';
import Billing from './adding_delivery_utils/Billing';
import ItemCell from './adding_delivery_utils/ItemCell';
import SelectArrivalDate from './adding_delivery_utils/SelectArrivalDate';
import combineCategories from '../../../../utility_functions/combineCategories';

const Add_Delivery_Modal = ({ button, addDelivery, handleUpdate, defaultValue, isEdit = false }) => {

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [items, setItems] = useState([]);

    const [noItemError, setNoItemError] = useState('');

    function getFormattedDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
    }
    const [selectedItems, setSelectedItems] = useState(defaultValue?.items || []);

    const [arrivalDate, setArrivalDate] = useState(defaultValue?.arrivalDate || getFormattedDateTime(new Date()));

    const companyName = defaultValue?.companyName;
    const bill = defaultValue?.bill;

    const schema = yup.object().shape({
        companyName: yup.string().required('Company name is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({ resolver: yupResolver(schema) });

    const handleSelectedItem = (item, isAdd = false) => {
        setSelectedItems(prev => {
            if (!prev.find(p => p.id === item.value)) {
                if (!isAdd) {
                    return [Object.assign({ ...item.rest }, { quantity: 0 }), ...prev];
                } else {
                    return [Object.assign({ ...item }, { quantity: 0 }), ...prev];
                }
            } else {
                return prev;
            }
        });
        setSearch("");
    }
    const handleValidateQuantities = () => {
        if (selectedItems.length === 0) {
            setNoItemError('Please select at least one item for delivery or create a new one.');

        }
        setSelectedItems(prev => {
            return prev.map(item => {
                if (item.quantity === 0) {
                    return { ...item, error: "Quantity cannot be 0" };
                } else {
                    // Remove error key if quantity is greater than 0 and error exists
                    const { error, ...rest } = item;
                    return rest;
                }
            });
        });
    }

    const handleSearch = (value) => {
        // setSearch(value);
        setNoItemError('');
    }

    const handleClear = () => {
        if (!isEdit) setSelectedItems([]);
        reset();
        setSearch('');
        handleClose();
    }

    const onSubmit = (data) => {
        if (selectedItems.length === 0) {
            setNoItemError('Please select at least one item for delivery or create a new one.');
            return;
        }
        if (selectedItems.filter(p => p.quantity === 0).length === 0) {
            const mappedItems = selectedItems.map(item => {
                return { item_id: item.id, quantity: item.quantity };
            });
            const dataToAdd = Object.assign(data, {
                items: mappedItems,
                status: 'Arrived',
                arrivalDate
            });
            if (defaultValue) {
                handleUpdate(dataToAdd, setError, setUpdating, handleClear);
            } else {
                addDelivery(dataToAdd, setUpdating, setError, handleClear);
            }
        }
    }

    useEffect(() => {
        let timer;
        if (open) {
            const delay = 500;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                basicGetCall({
                    endpoint: `api/findItem?search=${search}`,
                    setLoading,
                    setResponse: setItems
                })
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [search, open]);

    return (
        <Modal
            size='md'
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            loading={loading}
            element='form'
            handleSubmit={handleSubmit(onSubmit)}
            title={
                <Box display='flex' gap={1} >
                    {defaultValue ? "Edit Delivery" : 'Add Delivery'}
                    <ViewInfo
                        content={
                            <Typography variant="body2" width='200px'>
                                This modal helps manage deliveries:
                                <br /><br />
                                <b>Enter the company name</b>.
                                <br />
                                <b>Search for existing items</b> to add to the delivery.
                                <br />
                                <b>Add a new item</b> if it's not in the inventory.
                                <br />
                                <b>Select if the delivery has arrived or is pending.</b> Pending status means a new delivery is expected but not yet added to the inventory.
                            </Typography>


                        }
                    />
                </Box>
            }
            children={
                <>
                    <DialogContent dividers>
                        <Box sx={{ height: '500px', width: '800px' }} onClick={showSearch ? () => setShowSearch(false) : undefined}>
                            <InputIcon
                                Icon={RiBuilding2Fill}
                                label='Company Name'
                                defaultValue={companyName}
                                placeholder='Enter Company Name'
                                register={register}
                                name="companyName"
                                errors={errors}
                                fullWidth={false}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

                                <Autocomplete
                                    size='small'
                                    sx={{ width: '84%' }}
                                    fullWidth
                                    onChange={(event, newValue) => {
                                        if (newValue)
                                            handleSelectedItem(newValue);
                                    }}
                                    options={loading ? [{ label: 'Loading...', value: null }] : items.data.map(item => ({
                                        rest: { ...item },
                                        value: item.id,
                                        label: `${item.name}`,
                                        label2: `${combineCategories(item.categories)}`,
                                        image: item?.image,
                                        currentQuantity: item.currentQuantity
                                    }))}
                                    onInputChange={(e, i) => !!i ? handleSearch(i) : undefined}
                                    getOptionLabel={option => option.label}
                                    isOptionEqualToValue={() => true}
                                    renderOption={(props, option) => (
                                        <Box {...props}>
                                            <Box width='100%' display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px solid #ddd'>
                                                <Box width='100%' display='flex' alignItems='center' gap={2}>
                                                    <img alt={option.label} loading="lazy" src={resizeInventoryPic(option.image, 50, 35, 'c_thumb')} />
                                                    <Typography>{option.label}</Typography>
                                                </Box>
                                                <Typography variant='body2' color='GrayText'>{option.label2}</Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Search or select a item" />}
                                />

                                <Add_Item_Modal
                                    handleSelectedItem={handleSelectedItem}
                                    button={
                                        <ButtonIconText
                                            Icon={<FaPlus />}
                                            text='New Item'
                                            color="success"
                                        />
                                    }
                                />
                            </Box>

                            <Box display='flex' alignItems='center' mt={3} gap={2}>
                                <SelectArrivalDate
                                    arrivalDate={arrivalDate}
                                    setArrivalDate={setArrivalDate}
                                />
                                <Billing defaultValue={bill} register={register} />
                            </Box>

                            <Typography my={1} variant='body2' color='GrayText'>Total selected: {selectedItems.length}</Typography>

                            <Box pb={1} >
                                <TableContainer>
                                    <Table size='small'>
                                        {
                                            selectedItems.length !== 0 ? <TableHead>
                                                <TableRow>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Item Name</TableCell>
                                                    <TableCell>Category</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead> : undefined
                                        }
                                        {selectedItems.length !== 0 ? <TableBody>
                                            {selectedItems.map((selectedItem, i) => (
                                                <ItemCell
                                                    setSelectedItems={setSelectedItems}
                                                    key={selectedItem.id}
                                                    errors={errors}
                                                    item={selectedItem}
                                                    register={register} />
                                            ))}
                                        </TableBody> : <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ py: 2, color: !!noItemError ? 'red' : 'GrayText', borderBottom: '0px' }}>{noItemError || 'No items yet.'}</TableCell>
                                                <TableCell sx={{ borderBottom: '0px' }}></TableCell>
                                                <TableCell sx={{ borderBottom: '0px' }}></TableCell>
                                                <TableCell sx={{ borderBottom: '0px' }}></TableCell>
                                                <TableCell sx={{ borderBottom: '0px' }}></TableCell>
                                            </TableRow>
                                        </TableBody>}
                                    </Table>
                                </TableContainer>

                            </Box>

                        </Box>
                    </DialogContent>
                    <CommonFooter>
                        <ButtonWithLoading
                            color='success'
                            type='submit'
                            loading={updating}
                            onClick={handleValidateQuantities}
                            loadingText='Submitting...'
                        >
                            Submit
                        </ButtonWithLoading>
                    </CommonFooter>
                </>
            }
        />
    );
};

export default Add_Delivery_Modal;



