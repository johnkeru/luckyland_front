import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { DialogContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { TbCurrencyPeso } from 'react-icons/tb';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import TextArea from '../../../utility_components/TextArea';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from "../../../utility_components/modal/Modal";
import AddCategoryOnItem from './AddCategoryOnItem';

export default function Add_Item_Modal({ button, handleAdd }) {
    const [categoryName, setCategoryName] = useState([]);
    const [categoriesError, setCategoriesError] = useState('');

    const schema = yup.object().shape({
        name: yup.string().required('required').min(2, 'Item name must be at least 2 characters'),
        isBorrowable: yup.boolean(),
        currentQuantity: yup.number()
            .typeError('Must be an integer')
            .required('Required')
            .min(1, 'Must be at least 1'),
        maxQuantity: yup
            .number()
            .typeError('Must be an integer')
            .required('Required')
            .min(yup.ref('currentQuantity'), 'Must be greater than or equal to Current Quantity'),
        reOrderPoint: yup.number()
            .typeError('Must be an integer')
            .required('Required')
            .min(1, 'Must be at least 1'),
        price: yup.number()
            .typeError('Must be an integer')
            .required('Required')
            .min(1, 'Must be at least 1'),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid, },
        setError,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [adding, setAdding] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const onSubmit = (data) => {
        if (categoryName.length === 0) {
            setCategoriesError('Required');
            return;
        }
        const addData = Object.assign(data, { categories: categoryName });
        handleAdd(addData, setAdding, setError, handleClose)
    };

    const handleClose = () => {
        setCategoriesError('');
        reset();
        setOpen(false);
    }

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title="Add Item"
            loading={adding}
            maxWidth="md"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <InputIcon
                            sx={{ mb: 1.5 }}
                            errors={errors}
                            name='name'
                            label='Item name'
                            placeholder='Enter Item'
                            register={register}
                        />

                        <AddCategoryOnItem
                            sx={{ mb: 1.5 }}
                            setCategoryName={setCategoryName}
                            categoryName={categoryName}
                            error={categoriesError}
                        />

                        <Grid display='flex' gap={1}>
                            <InputIcon
                                type='number'
                                label='Current quantity'
                                name='currentQuantity'
                                register={register}
                                errors={errors}
                                placeholder='Enter Current'
                                sx={{ mb: 1.5 }}
                            />
                            <InputIcon
                                type='number'
                                label='Max quantity'
                                name='maxQuantity'
                                register={register}
                                errors={errors}
                                placeholder='Enter Max'
                                sx={{ mb: 1.5 }}
                            />
                            <InputIcon
                                type='number'
                                label='Re-order point'
                                name='reOrderPoint'
                                register={register}
                                errors={errors}
                                placeholder='Enter Re-order'
                                sx={{ mb: 1.5 }}
                            />
                        </Grid>
                        <InputIcon
                            type='number'
                            label='Price'
                            name='price'
                            register={register}
                            errors={errors}
                            placeholder='Enter Price'
                            sx={{ mb: 1.5 }}
                            Icon={TbCurrencyPeso}
                        />
                        <TextArea height='60px' label='Description (Optional)' placeholder='Enter Description (Optional)' name='description' register={register} />

                        <Typography gutterBottom>Is this item able to borrow?</Typography>
                        <FormControl fullWidth>
                            <Controller
                                control={control}
                                name="isBorrowable"
                                defaultValue={false}
                                render={({ field }) => (
                                    <RadioGroup row {...field}>
                                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                        <FormControlLabel value={false} control={<Radio />} label="No" />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </DialogContent >

                    <CommonFooter>
                        <ButtonWithLoading
                            type="submit"
                            disabled={!(isValid && categoryName.length !== 0)}
                            loading={adding}
                            color='success'
                            loadingText='Adding Item...'
                            variant="contained" >
                            Add Item
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}

