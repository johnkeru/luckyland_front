import {
    DialogContent,
    Grid
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import InputHelper from '../../../utility_components/InputHelper';
import TextArea from '../../../utility_components/TextArea';
import Image_Preview_Modal from "./Image_Preview_Modal";

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import ButtonIconText from "../../../utility_components/ButtonIconText";
import ButtonWithLoading from "../../../utility_components/ButtonWithLoading";
import CommonFooter from "../../../utility_components/modal/CommonFooter";
import Modal from "../../../utility_components/modal/Modal";

export default function Edit_Inventory_Modal({ data, button, handleAllSubmitEdit, image, setImage }) {

    const schema = yup.object().shape({
        productName: yup.string().required('required').min(2, 'Product Name must be at least 2 characters'),
        category: yup.string().required('Category is required'),
        price:
            yup.number()
                .integer('Must be an integer')
                .transform((value) => (isNaN(value) ? undefined : value)),
        currentQuantity:
            yup.number()
                .required('Required')
                .integer('Must be an integer')
                .transform((value) => (isNaN(value) ? undefined : value)),
        maxQuantity: yup
            .number()
            .required('Required')
            .integer('Must be an integer')
            .min(yup.ref('currentQuantity'), 'Must be greater than or equal to Current Quantity')
            .transform((value) => (isNaN(value) ? undefined : value)),
        reOrderPoint: yup.number().required('Required').integer('Must be an integer').min(1, 'Must be at least 1').transform((value) => (isNaN(value) ? undefined : value)),
    });
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [updating, setUpdating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(image);
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        setPreviewUrl(data?.image);
    }, [data?.image])

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

    const handleClose = () => setOpen(false);
    const handleClearImage = () => setPreviewUrl('')

    const productName = data.productName;
    const category = data.category;
    const currentQuantity = data.currentQuantity;
    const maxQuantity = data.maxQuantity;
    const reOrderPoint = data.reOrderPoint;
    const price = data.price || 0;
    const description = data.description || '';

    const onSubmit = (localData) => {
        const changedData = {};
        for (const key in localData) {
            if (localData[key] !== data[key] && localData[key]) {
                changedData[key] = localData[key]; // Store changed key and its new value
            }
        }
        const editData = {
            ...changedData,
            image: previewUrl,
            category_id: data.category_id,
            product_id: data.product_id
        };
        setImage(previewUrl);
        handleAllSubmitEdit(editData, setError, setUpdating, handleClose);
    };

    const w = watch();
    const isChanged = (w.productName && w.productName !== productName) ||
        (w.category && w.category !== category) ||
        (w.currentQuantity && w.currentQuantity !== currentQuantity) ||
        (w.maxQuantity && w.maxQuantity !== maxQuantity) ||
        (w.reOrderPoint && w.reOrderPoint !== reOrderPoint) ||
        (w.price && w.price !== price) ||
        (w.description && w.description !== description) ||
        previewUrl !== image;

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title="Edit Inventory"
            maxWidth="lg"
            loading={updating}
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ display: 'flex', gap: 2, }} dividers>
                        <Grid width={'50%'}>
                            <InputHelper sx={{ mb: 3 }} error={errors?.productName?.message} value={productName} name='productName' label='Inventory name' placeholder='Enter Inventory' register={register} />
                            <InputHelper sx={{ mb: 3 }} error={errors?.category?.message} value={category} name='category' label='Category' placeholder='Enter Category' register={register} />

                            <Grid>
                                <Grid display='flex' gap={1}>
                                    <InputHelper sx={{ mb: 3 }} error={errors?.currentQuantity?.message} value={currentQuantity} name='currentQuantity' number label='Current quantity' placeholder='Enter Current' register={register} />
                                    <InputHelper sx={{ mb: 3 }} error={errors?.maxQuantity?.message} value={maxQuantity} name='maxQuantity' number label='Max quantity' placeholder='Enter Max' register={register} />
                                    <InputHelper sx={{ mb: 3 }} error={errors?.reOrderPoint?.message} value={reOrderPoint} name='reOrderPoint' number label='Re-order point' placeholder='Enter Re-order' register={register} />
                                </Grid>
                            </Grid>
                            <InputHelper sx={{ mb: 3 }} error={errors?.price?.message} number value={price} name='price' label='Price' placeholder='Enter Price' register={register} />
                            <TextArea height='100px' value={description} label='Description:' placeholder='Enter Description' name='description' register={register} />
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
                                    text='New'
                                    getInputProps={getInputProps}
                                    getRootProps={getRootProps}
                                    disabled={uploading}
                                />
                            </Grid> : undefined}
                            <Image_Preview_Modal
                                uploading={uploading}
                                getInputProps={getInputProps}
                                getRootProps={getRootProps}
                                isDragActive={isDragActive}
                                image={previewUrl ? resizeCloudinaryImage(previewUrl, 400, 400) : undefined}
                            />
                        </Grid>
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading type="submit" disabled={!isChanged} loading={updating} loadingText="Updating..." >Update</ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}
