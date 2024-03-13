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
import Add_Product_Modal from './Add_Product_Modal';
import Billing from './adding_delivery_utils/Billing';
import ProductCell from './adding_delivery_utils/ProductCell';
import SelectArrivalDate from './adding_delivery_utils/SelectArrivalDate';
import StatusToggle from './adding_delivery_utils/StatusToggle';

const Add_Delivery_Modal = ({ button, addDelivery, handleUpdate, defaultValue, isEdit = false }) => {

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([]);

    const [noProductError, setNoProductError] = useState('');

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
    const [selectedProducts, setSelectedProducts] = useState(defaultValue?.products || []);

    const [arrivalDate, setArrivalDate] = useState(defaultValue?.arrivalDate || getFormattedDateTime(new Date()));
    const [status, setStatus] = useState(defaultValue?.status || 'Arrived'); // Default value is 'Arrived'

    const companyName = defaultValue?.companyName;
    const bill = defaultValue?.bill;

    const handleChange = (event) => setStatus(event.target.value);

    const schema = yup.object().shape({
        companyName: yup.string().required('Company name is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({ resolver: yupResolver(schema) });

    const handleSelectedProduct = (product) => {
        setSelectedProducts(prev => {
            if (!prev.find(p => p.id === product.value)) {
                return [Object.assign({ ...product.rest }, { quantity: 0 }), ...prev];
            } else {
                return prev;
            }
        });
        setSearch("");
    }

    const handleValidateQuantities = () => {
        if (selectedProducts.length === 0) {
            setNoProductError('Please select at least one product for delivery or create a new one.');

        }
        setSelectedProducts(prev => {
            return prev.map(product => {
                if (product.quantity === 0) {
                    return { ...product, error: "Quantity cannot be 0" };
                } else {
                    // Remove error key if quantity is greater than 0 and error exists
                    const { error, ...rest } = product;
                    return rest;
                }
            });
        });
    }

    const handleSearch = (value) => {
        // setSearch(value);
        setNoProductError('');
    }

    const handleClear = () => {
        setSelectedProducts([]);
        reset();
        setSearch('');
        setStatus('Arrived')
        handleClose();
    }

    const onSubmit = (data) => {
        if (selectedProducts.length === 0) {
            setNoProductError('Please select at least one product for delivery or create a new one.');
            return;
        }
        if (selectedProducts.filter(p => p.quantity === 0).length === 0) {
            const mappedProducts = selectedProducts.map(product => {
                return { product_id: product.id, quantity: product.quantity };
            });
            const dataToAdd = Object.assign(data, {
                products: mappedProducts,
                status,
                arrivalDate: status === 'Pending' ? null : arrivalDate
            });
            if (defaultValue) {
                handleUpdate(dataToAdd, setError, setLoading, handleClear);
            } else {
                addDelivery(dataToAdd, setLoading, setError, handleClear);
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
                    endpoint: `api/findInventory?search=${search}`,
                    setLoading,
                    setResponse: setProducts
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
                                <b>Search for existing products</b> to add to the delivery.
                                <br />
                                <b>Add a new product</b> if it's not in the inventory.
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
                                    sx={{ width: '80%' }}
                                    fullWidth
                                    onChange={(event, newValue) => {
                                        if (newValue)
                                            handleSelectedProduct(newValue);
                                    }}
                                    options={loading ? [{ label: 'Loading...', value: null }] : products.data.map(product => ({
                                        rest: { ...product },
                                        value: product.id,
                                        label: `${product.productName}`,
                                        label2: `${product.category}`,
                                        image: product?.image,
                                        currentQuantity: product.currentQuantity
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
                                    renderInput={(params) => <TextField {...params} label="Search or select a product" />}
                                />

                                <Add_Product_Modal
                                    handleSelectedProduct={handleSelectedProduct}
                                    button={
                                        <ButtonIconText
                                            Icon={<FaPlus />}
                                            text='New Product'
                                            color="success"
                                        />
                                    }
                                />
                            </Box>

                            <Box display='flex' alignItems='center' mt={3}>
                                <StatusToggle handleChange={handleChange} status={status} isEdit={isEdit} />
                                {
                                    status.toLowerCase() === 'arrived' ?
                                        <SelectArrivalDate
                                            arrivalDate={arrivalDate}
                                            setArrivalDate={setArrivalDate}
                                        />
                                        : undefined
                                }
                                <Billing defaultValue={bill} register={register} />
                            </Box>

                            <Typography my={1} variant='body2' color='GrayText'>Total selected: {selectedProducts.length}</Typography>

                            <Box pb={1} >
                                <TableContainer>
                                    <Table size='small'>
                                        {
                                            selectedProducts.length !== 0 ? <TableHead>
                                                <TableRow>
                                                    <TableCell>Image</TableCell>
                                                    <TableCell>Product Name</TableCell>
                                                    <TableCell>Category</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead> : undefined
                                        }
                                        {selectedProducts.length !== 0 ? <TableBody>
                                            {selectedProducts.map((selectedProduct, i) => (
                                                <ProductCell setSelectedProducts={setSelectedProducts} index={i} key={selectedProduct.id} errors={errors} product={selectedProduct} register={register} />
                                            ))}
                                        </TableBody> : <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ py: 2, color: !!noProductError ? 'red' : 'GrayText', borderBottom: '0px' }}>{noProductError || 'No products yet.'}</TableCell>
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
                            loading={loading}
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



