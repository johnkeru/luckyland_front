import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TbCurrencyPeso } from 'react-icons/tb';
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import TextArea from '../../../utility_components/TextArea';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from "../../../utility_components/modal/Modal";
import AddCategoryOnItem from './AddCategoryOnItem';

export default function Edit_Item_Modal({ data, button, handleAllSubmitEdit }) {
    let categoryNameCopy = data.categories.map(cat => cat.name);
    const [categoryName, setCategoryName] = useState(categoryNameCopy || []);
    const [categoriesError, setCategoriesError] = useState('');
    const [categoryChange, setCategoryChange] = useState(false);

    // console.log(categoryNameCopy, categoryName)

    const schema = yup.object().shape({
        // name: yup.string().required('required').min(2, 'Item name must be at least 2 characters'),
        isBorrowable: yup.boolean(),
        currentQuantity: yup.number()
            .typeError('Must be an integer')
            .required('Required')
            .min(0, 'Invalid.'),
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
        formState: { errors, isDirty },
        setError,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [updating, setUpdating] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const onSubmit = (localData) => {
        if (categoryName.length === 0) {
            setCategoriesError('Required');
            return;
        }

        const editData = {
            ...localData,
            item_id: data.item_id,
            categories: categoryName
        };
        handleAllSubmitEdit(editData, setError, setUpdating, handleClose);
    };

    const handleClose = () => {
        setCategoriesError('');
        reset();
        setOpen(false);
    }

    let isReady = !isDirty && !categoryChange;

    const isAllowedToBorrowed = Boolean(data.categories.find(cat => cat.name === 'Resort'));

    return (
        <Modal
            button={button}
            handleClose={() => setOpen(false)}
            handleOpen={handleOpen}
            open={open}
            title={`Edit ${data.name}`}
            loading={updating}
            maxWidth="md"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        {/* <InputIcon
                                sx={{ mb: 1.5 }}
                                errors={errors}
                                name='name'
                                label='Item name'
                                placeholder='Enter Item'
                                register={register}
                                defaultValue={data.name}
                            /> */}

                        <AddCategoryOnItem
                            sx={{ mb: 1.5 }}
                            setCategoryName={setCategoryName}
                            categoryName={categoryName}
                            setCategoryChange={setCategoryChange}
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
                                defaultValue={data.currentQuantity}
                            />
                            <InputIcon
                                type='number'
                                label='Max quantity'
                                name='maxQuantity'
                                register={register}
                                errors={errors}
                                placeholder='Enter Max'
                                sx={{ mb: 1.5 }}
                                defaultValue={data.maxQuantity}
                            />
                            <InputIcon
                                type='number'
                                label='Re-order point'
                                name='reOrderPoint'
                                register={register}
                                errors={errors}
                                placeholder='Enter Re-order'
                                sx={{ mb: 1.5 }}
                                defaultValue={data.reOrderPoint}
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
                            defaultValue={data.price}
                            Icon={TbCurrencyPeso}
                        />
                        <TextArea defaultValue={data.description} height='60px' label='Description (Optional)' placeholder='Enter Description (Optional)' name='description' register={register} />

                        {isAllowedToBorrowed ? <>
                            <Typography gutterBottom>Is this item able to borrow?</Typography>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name="isBorrowable"
                                    defaultValue={Boolean(data.isBorrowable)}
                                    render={({ field }) => (
                                        <RadioGroup row {...field}>
                                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                        </> : undefined}

                    </DialogContent >

                    <CommonFooter>
                        <ButtonWithLoading
                            type="submit"
                            disabled={isReady}
                            loading={updating}
                            color='success'
                            loadingText='Updating Item...'
                            variant="contained" >
                            Update Item
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}



