import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';

import cloudinaryUrl, { resizeCloudinaryImage } from "../../../../utility_functions/cloudinaryUrl";
import ButtonIconText from '../../../../utility_components/ButtonIconText';
import ButtonWithLoading from '../../../../utility_components/ButtonWithLoading';
import InputHelper from '../../../../utility_components/InputHelper';
import TextArea from '../../../../utility_components/TextArea';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from '../../../../utility_components/modal/Modal';
import Image_Preview_Modal from '../../modal/Image_Preview_Modal';
import axiosCall from '../../../../utility_functions/axiosCall';

export default function Add_Product_Modal({ button, handleSelectedProduct }) {
    const schema = yup.object().shape({
        productName: yup.string().required('Product name is required').min(2, 'Product Name must be at least 2 characters'),
        category: yup.string().required('Category is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const w = watch();

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
        const addData = Object.assign(data, { image: previewUrl, reOrderPoint: 15 });
        axiosCall({
            method: 'post',
            endpoint: 'api/inventories/add',
            body: addData,
            hasToaster: true,
            setLoading: setAdding,
            handleClose,
            setError,
            setDataDirectly: handleSelectedProduct
        });
    };

    const handleClose = () => {
        setPreviewUrl('');
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
            title="Add Product"
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
                            <InputHelper sx={{ mb: 2 }} error={errors?.productName?.message} name='productName' label='Product name' placeholder='Enter Product' register={register} />
                            <InputHelper sx={{ mb: 2 }} error={errors?.category?.message} name='category' label='Category' placeholder='Enter Category' register={register} />
                            <InputHelper sx={{ mb: 2 }} number name='price' label='Price' placeholder='Enter Price' register={register} />
                            <TextArea height='60px' label='Description' placeholder='Enter Description' name='description' register={register} />
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
                            disabled={adding}
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
