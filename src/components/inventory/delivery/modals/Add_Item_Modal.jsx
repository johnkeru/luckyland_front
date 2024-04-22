import { DialogContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

import ButtonIconText from '../../../../utility_components/ButtonIconText';
import ButtonWithLoading from '../../../../utility_components/ButtonWithLoading';
import InputIcon from "../../../../utility_components/InputIcon";
import TextArea from '../../../../utility_components/TextArea';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';
import commonValidationCall from "../../../../utility_functions/axiosCalls/commonValidationCall";
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../../utility_functions/cloudinaryUrl";
import AddCategoryOnItem from "../../modal/AddCategoryOnItem";
import Image_Preview_Modal from '../../modal/Image_Preview_Modal';
import { TbCurrencyPeso } from "react-icons/tb";

export default function Add_Item_Modal({ button, handleSelectedItem }) {
    const [categoryName, setCategoryName] = useState([]);
    const [categoriesError, setCategoriesError] = useState('');

    const schema = yup.object().shape({
        name: yup.string().required('required').min(2, 'Item name must be at least 2 characters'),
        isBorrowable: yup.boolean(),
        price: yup.number()
            .typeError('Must be an integer')
            .required('Required')
            .min(1, 'Must be at least 1'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [adding, setAdding] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
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

    const onSubmit = (data) => {
        if (categoryName.length === 0) {
            setCategoriesError('Required');
            return;
        }
        const addData = Object.assign(data, { image: previewUrl, reOrderPoint: 15, categories: categoryName });
        commonValidationCall({
            method: 'post',
            endpoint: 'api/inventories/add-item',
            body: addData,
            hasToaster: true,
            setLoading: setAdding,
            handleClose,
            setError,
            setDataDirectly: (item) => {
                console.log(item);
                handleSelectedItem({
                    id: item.id,
                    name: addData.name,
                    image: addData.image,
                    categories: addData.categories.map(cat => ({ name: cat }))
                }, true);
            }
        });
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

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title="New Item"
            loading={adding}
            maxWidth="md"
            children={
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevent default form submission behavior
                        e.stopPropagation(); // Stop event propagation to parent form
                        handleSubmit(onSubmit)(e); // Call sub-form's submit handler
                    }}
                >
                    <DialogContent sx={{ display: 'flex', gap: 2 }} dividers>
                        <Grid width={'50%'}>
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

                            <InputIcon
                                sx={{ mb: 1.5 }}
                                errors={errors}
                                name='price'
                                label='Price'
                                placeholder='Enter Price'
                                register={register}
                                Icon={TbCurrencyPeso}
                            />
                            <TextArea height='60px' label='Description' placeholder='Enter Description' name='description' register={register} />

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
                            disabled={(!(isValid && categoryName.length !== 0)) || adding}
                            loading={adding}
                            color='success'
                            loadingText='Adding...'
                            variant="contained" >
                            Add
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}
