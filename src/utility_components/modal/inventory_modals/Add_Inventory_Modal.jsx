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
import { MdUpload } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
        <>
            {cloneElement(button, { onClick: handleOpen })}
            <Dialog
                size="lg"
                className="relative px-4 py-6"
                open={open}
                handler={!open ? handleOpen : undefined}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className="flex items-start justify-between pt-0">
                    <div className=" text-3xl whitespace-nowrap flex items-center gap-2">
                        Add Inventory
                    </div>
                    <IoClose className="w-7 h-7 text-red-500 cursor-pointer" title="close" onClick={!adding ? handleClose : undefined} />
                </DialogHeader>

                <DialogBody >
                    <form className="flex gap-10 " onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-1/2">
                            <div className="flex items-center gap-2 w-full">
                                <InputHelper error={errors.productName} name='productName' label='Inventory name:' placeholder='Enter Inventory' register={register} />
                                <InputHelper error={errors.category} name='category' label='Category:' placeholder='Enter Category' register={register} />
                            </div>
                            <div className="w-full">
                                <Typography variant="h5" className="mb-2">Quantity:</Typography>
                                <div className="flex gap-2 items-center">
                                    <InputHelper error={errors.currentQuantity} name='currentQuantity' number label='Current:' className='w-[20px]' placeholder='Enter Current' register={register} />
                                    <InputHelper error={errors.maxQuantity} name='maxQuantity' number label='Max:' className='w-[20px]' placeholder='Enter Max' register={register} />
                                    <InputHelper error={errors.reOrderPoint} name='reOrderPoint' number label='Re-order point:' className='w-[20px]' placeholder='Enter Re-order' register={register} />
                                </div>
                            </div>
                            <div className="w-full">
                                <Typography variant="h5" className="mb-2">Optional:</Typography>
                                <div className="flex items-center gap-3">
                                    <InputHelper name='price' label='Price:' placeholder='Enter Price' register={register} />
                                    <InputHelper name='supplier' label='Supplier:' placeholder='Enter Supplier' register={register} />
                                </div>
                            </div>
                            <TextArea label='Description:' placeholder='Enter Description' name='description' register={register} />
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
                            <Button loading={adding} fullWidth className="mt-5 flex justify-center" type="submit" disabled={!isReadyToAdd}>{adding ? 'Adding...' : 'Add'}</Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog >
        </>
    );
}
