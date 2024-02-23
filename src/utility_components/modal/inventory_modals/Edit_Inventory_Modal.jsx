import {
    DialogContent,
    Grid
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import InputHelper from '../../InputHelper';
import TextArea from '../../TextArea';
import Image_Preview_Modal from "./Image_Preview_Modal";

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import ButtonIconText from "../../ButtonIconText";
import ButtonWithLoading from "../../ButtonWithLoading";
import CommonFooter from "../CommonFooter";
import Modal from "../Modal";

export default function Edit_Inventory_Modal({ data, button, handleAllSubmitEdit, image, setImage }) {

    const productName = data.productName;
    const category = data.category;
    const currentQuantity = data.currentQuantity;
    const maxQuantity = data.maxQuantity;
    const reOrderPoint = data.reOrderPoint;
    const price = data.price || 0;
    const description = data.description || '';
    const supplier = data.supplier || '';

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
        setError,
        formState: { errors },
        watch,
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

    const onSubmit = (data) => {
        const editData = Object.assign(data, { image: previewUrl });
        setImage(previewUrl)
        handleAllSubmitEdit(editData, setError, setUpdating, handleClose)
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleClearImage = () => {
        setPreviewUrl('')
    }

    const w = watch();
    const isChanged = (w.productName && w.productName !== productName) ||
        (w.category && w.category !== category) ||
        (w.currentQuantity && w.currentQuantity !== currentQuantity) ||
        (w.maxQuantity && w.maxQuantity !== maxQuantity) ||
        (w.reOrderPoint && w.reOrderPoint !== reOrderPoint) ||
        (w.price && w.price !== price) ||
        (w.supplier && w.supplier !== supplier) ||
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
                            <InputHelper sx={{ mb: 3 }} error={errors.productName} value={productName} name='productName' label='Inventory name' placeholder='Enter Inventory' register={register} />
                            <InputHelper sx={{ mb: 3 }} error={errors.category} value={category} name='category' label='Category' placeholder='Enter Category' register={register} />

                            <Grid>
                                <Grid display='flex' gap={1}>
                                    <InputHelper sx={{ mb: 3 }} error={errors.currentQuantity} value={currentQuantity} name='currentQuantity' number label='Current quantity' placeholder='Enter Current' register={register} />
                                    <InputHelper sx={{ mb: 3 }} error={errors.maxQuantity} value={maxQuantity} name='maxQuantity' number label='Max quantity' placeholder='Enter Max' register={register} />
                                    <InputHelper sx={{ mb: 3 }} error={errors.reOrderPoint} value={reOrderPoint} name='reOrderPoint' number label='Re-order point' placeholder='Enter Re-order' register={register} />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Grid display='flex' gap={1}>
                                    <InputHelper sx={{ mb: 3 }} value={price} name='price' label='Price' placeholder='Enter Price' register={register} />
                                    <InputHelper sx={{ mb: 3 }} value={supplier} name='supplier' label='Supplier' placeholder='Enter Supplier' register={register} />
                                </Grid>
                            </Grid>
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
