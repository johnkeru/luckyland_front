import { yupResolver } from '@hookform/resolvers/yup';
import { DialogContent, Grid, MenuItem } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { CiImageOff } from "react-icons/ci";
import { MdUpload } from 'react-icons/md';
import * as yup from 'yup';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import InputHelper from '../../../utility_components/InputHelper';
import SelectionInput from '../../../utility_components/SelectionInput';
import TextArea from '../../../utility_components/TextArea';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from "../../../utility_components/modal/Modal";
import cloudinaryUrl, { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import Image_Preview_Modal from "./Image_Preview_Modal";

export default function Add_Item_Modal({ button, handleAdd }) {
    const schema = yup.object().shape({
        name: yup.string().required('required').min(2, 'Item name must be at least 2 characters'),
        category: yup.string().required('Category is required'),
        for: yup.string().required('This field is required.'),
        currentQuantity:
            yup.number()
                .required('Required')
                .integer('Must be an integer')
                .min(1, 'Must be at least 1')
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
        formState: { errors },
        setError,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const w = watch();

    const isReadyToAdd = !!w.name && !!w.category && !!w.currentQuantity && !!w.maxQuantity && !!w.reOrderPoint && !!w.for;

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
            title="Add Item"
            loading={adding}
            maxWidth="lg"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ display: 'flex', gap: 2 }} dividers>
                        <Grid width={'50%'}>
                            <InputHelper sx={{ mb: 3 }} error={errors?.name?.message} name='name' label='Item name' placeholder='Enter Item' register={register} />
                            <InputHelper sx={{ mb: 3 }} error={errors?.category?.message} name='category' label='Category' placeholder='Enter Category' register={register} />

                            <Grid display='flex' gap={1}>
                                <InputHelper sx={{ mb: 3 }} error={errors?.currentQuantity?.message} name='currentQuantity' number label='Current quantity' placeholder='Enter Current' register={register} />
                                <InputHelper sx={{ mb: 3 }} error={errors?.maxQuantity?.message} name='maxQuantity' number label='Max quantity' placeholder='Enter Max' register={register} />
                                <InputHelper sx={{ mb: 3 }} error={errors?.reOrderPoint?.message} name='reOrderPoint' number label='Re-order point' placeholder='Enter Re-order' register={register} />
                            </Grid>

                            <SelectionInput
                                register={register}
                                name='for'
                                label={'For'}
                                error={errors?.for?.message}
                            >  <MenuItem value="Room">Room</MenuItem>
                                <MenuItem value="Add Ons">Add Ons</MenuItem>
                                <MenuItem value="Resort">Resort</MenuItem>
                            </SelectionInput>

                            <InputHelper sx={{ mb: 3 }} number name='price' label='Price' placeholder='Enter Price' register={register} />
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
