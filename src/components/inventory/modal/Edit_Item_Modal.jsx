import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputIcon from '../../../utility_components/InputIcon';
import TextArea from '../../../utility_components/TextArea';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from "../../../utility_components/modal/Modal";
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import AddCategoryOnItem from './AddCategoryOnItem';
import Image_Preview_Modal from "./Image_Preview_Modal";

export default function Edit_Item_Modal({ data, button, handleAllSubmitEdit, image, setImage }) {
    let categoryNameCopy = data.categories.map(cat => cat.name);
    const [categoryName, setCategoryName] = useState(categoryNameCopy || []);
    const [categoriesError, setCategoriesError] = useState('');
    const [categoryChange, setCategoryChange] = useState(false);

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
        formState: { errors, isDirty },
        setError,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [updating, setUpdating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(image);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        const image = acceptedFiles[0];
        setUploading(true);
        const url = await cloudinaryUrl(image);
        const secure_url = url.secure_url;
        setPreviewUrl(secure_url);
        setUploading(false);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const onSubmit = (localData) => {
        if (categoryName.length === 0) {
            setCategoriesError('Required');
            return;
        }

        const editData = {
            ...localData,
            image: previewUrl,
            item_id: data.item_id,
            categories: categoryName
        };
        setImage(previewUrl);
        handleAllSubmitEdit(editData, setError, setUpdating, handleClose);
    };

    const handleClose = () => {
        setPreviewUrl('');
        setCategoriesError('');
        reset();
        setOpen(false);
    }

    const handleClearImage = () => {
        setPreviewUrl('')
    }


    let isReady = !isDirty && !categoryChange;

    return (
        <Modal
            button={button}
            handleClose={() => setOpen(false)}
            handleOpen={handleOpen}
            open={open}
            title="Edit Item"
            loading={updating}
            maxWidth="md"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ display: 'flex', gap: 2 }} dividers>
                        <Grid width={'50%'}>
                            <InputIcon
                                sx={{ mb: 1.5 }}
                                errors={errors}
                                name='name'
                                label='Item name'
                                placeholder='Enter Item'
                                register={register}
                                defaultValue={data.name}
                            />

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
                            />
                            <TextArea defaultValue={data.description} height='60px' label='Description' placeholder='Enter Description' name='description' register={register} />

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

                        </Grid>
                        <Grid width={'50%'} display={'flex'} flexDirection={'column'}>
                            {previewUrl ? <Grid display={'flex'} gap={1} justifyContent='end' mb={1}>
                                <ButtonIconText
                                    Icon={<CiImageOff />}
                                    text='Clear'
                                    color="error"
                                    disabled={uploading}
                                    onClick={handleClearImage}
                                />
                                <ButtonIconText
                                    Icon={<MdUpload />}
                                    text='Upload'
                                    getInputProps={getInputProps}
                                    getRootProps={getRootProps}
                                    disabled={uploading}
                                />
                            </Grid> : undefined}
                            <Image_Preview_Modal
                                uploading={uploading}
                                isEdit
                                getInputProps={getInputProps}
                                getRootProps={getRootProps}
                                isDragActive={isDragActive}
                                image={previewUrl ? resizeCloudinaryImage(previewUrl, 400, 400) : undefined}
                            />
                        </Grid>
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


