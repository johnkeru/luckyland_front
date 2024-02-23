import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, DialogContent, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import ButtonWithLoading from '../../ButtonWithLoading';
import InputHelper from '../../InputHelper';
import TextArea from '../../TextArea';
import CommonFooter from '../CommonFooter';
import Modal from "../Modal";
import Image_Preview_Modal from "./Image_Preview_Modal";
import ButtonIconText from '../../ButtonIconText';

export default function Add_Inventory_Modal({ button, handleAdd }) {
    const schema = yup.object().shape({
        productName: yup.string().required('required').min(2, 'Product Name must be at least 2 characters'),
        category: yup.string().required('Category is required'),
        currentQuantity: yup.number().required('Required').integer('Must be an integer').transform((value) => (isNaN(value) ? undefined : value)),
        maxQuantity: yup
            .number()
            .required('Required')
            .integer('Must be an integer')
            .min(yup.ref('currentQuantity'), 'Must be greater than or equal to Current Quantity')
            .transform((value) => (isNaN(value) ? undefined : value)),
        reOrderPoint: yup.number().required('Required').integer('Must be an integer').transform((value) => (isNaN(value) ? undefined : value)),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const w = watch();

    const isReadyToAdd = !!w.productName && !!w.category && !!w.currentQuantity && !!w.maxQuantity && !!w.reOrderPoint;

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
        const addData = Object.assign(data, { image: previewUrl });
        handleAdd(addData, setAdding, setError, handleClose)
    };

    const handleClose = () => {
        setPreviewUrl('');
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
            title="Add Inventory"
            loading={adding}
            maxWidth="lg"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ display: 'flex', gap: 2 }} dividers>
                        <Grid width={'50%'}>
                            <InputHelper sx={{ mb: 3 }} error={errors.productName} name='productName' label='Inventory name' placeholder='Enter Inventory' register={register} />
                            <InputHelper sx={{ mb: 3 }} error={errors.category} name='category' label='Category' placeholder='Enter Category' register={register} />

                            <Grid>
                                <Grid display='flex' gap={1}>
                                    <InputHelper sx={{ mb: 3 }} error={errors.currentQuantity} name='currentQuantity' number label='Current quantity' placeholder='Enter Current' register={register} />
                                    <InputHelper sx={{ mb: 3 }} error={errors.maxQuantity} name='maxQuantity' number label='Max quantity' placeholder='Enter Max' register={register} />
                                    <InputHelper sx={{ mb: 3 }} error={errors.reOrderPoint} name='reOrderPoint' number label='Re-order point' placeholder='Enter Re-order' register={register} />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid display='flex' gap={1}>
                                    <InputHelper sx={{ mb: 3 }} name='price' label='Price' placeholder='Enter Price' register={register} />
                                    <InputHelper sx={{ mb: 3 }} name='supplier' label='Supplier' placeholder='Enter Supplier' register={register} />
                                </Grid>
                            </Grid>
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
                            disabled={!isReadyToAdd}
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
