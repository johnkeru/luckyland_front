import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    Typography
} from "@material-tailwind/react";
import React, { cloneElement, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import InputHelper from '../../InputHelper';
import ImageBodyModal from "./ImageBodyModal";
import TextArea from '../../TextArea';
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
        setImage(image);
        setPreviewUrl(image);
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
            size="lg"
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title="Edit Inventory"
            loading={updating}
            children={
                <DialogBody >
                    <form className="flex gap-10 " onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-1/2">
                            <div className="flex items-center gap-2 w-full">
                                <InputHelper error={errors.productName} value={productName} name='productName' label='Inventory name:' placeholder='Enter Inventory' register={register} />
                                <InputHelper error={errors.category} value={category} name='category' label='Category:' placeholder='Enter Category' register={register} />
                            </div>
                            <div className="w-full">
                                <Typography variant="h5" className="mb-2">Quantity:</Typography>
                                <div className="flex gap-2 items-center">
                                    <InputHelper error={errors.currentQuantity} value={currentQuantity} name='currentQuantity' number label='Current:' className='w-[20px]' placeholder='Enter Current' register={register} />
                                    <InputHelper error={errors.maxQuantity} value={maxQuantity} name='maxQuantity' number label='Max:' className='w-[20px]' placeholder='Enter Max' register={register} />
                                    <InputHelper error={errors.reOrderPoint} value={reOrderPoint} name='reOrderPoint' number label='Re-order point:' className='w-[20px]' placeholder='Enter Re-order' register={register} />
                                </div>
                            </div>
                            <div className="w-full">
                                <Typography variant="h5" className="mb-2">Optional:</Typography>
                                <div className="flex items-center gap-3">
                                    <InputHelper value={price} name='price' label='Price:' placeholder='Enter Price' register={register} />
                                    <InputHelper value={supplier} name='supplier' label='Supplier:' placeholder='Enter Supplier' register={register} />
                                </div>
                            </div>
                            <TextArea value={description} label='Description:' placeholder='Enter Description' name='description' register={register} />
                        </div>
                        <div className="w-1/2 h-full flex-col justify-between items-stretch">
                            {previewUrl ? <div className="flex mb-2 gap-2">
                                <Button size="sm" color="red" onClick={handleClearImage} variant="outlined" className="px-2 py-1.5 flex items-center gap-1" disabled={uploading}>
                                    <CiImageOff className="w-5 h-5" />
                                    Clear
                                </Button>

                                <Button size="sm" color="blue" variant="outlined"  {...getRootProps()} className="px-2 py-1.5 flex items-center gap-1" disabled={uploading}>
                                    <MdUpload className="w-5 h-5" />
                                    <input {...getInputProps()} />
                                    Upload
                                </Button>
                            </div> : undefined}
                            <ImageBodyModal
                                uploading={uploading}
                                isEdit
                                getInputProps={getInputProps}
                                getRootProps={getRootProps}
                                isDragActive={isDragActive}
                                image={previewUrl ? resizeCloudinaryImage(previewUrl, 400, 400) : undefined}
                            />
                            <Button loading={updating} fullWidth className="mt-5 flex justify-center" type="submit" disabled={!isChanged}>Update</Button>
                        </div>
                    </form>
                </DialogBody>
            }
        />
    );
}
