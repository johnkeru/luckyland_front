import { DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import AddRoomForm from './AddRoomForm';
import UploadImages from './UploadImages';

const AddRoom = ({ button, onSuccess, defaultValues, isCottage }) => {
    const modalTitle = defaultValues ? 'Editing ' + defaultValues?.name : `Add ${!isCottage ? 'Room' : 'Cottage'}`;
    const buttonText = defaultValues ? `Update ${!isCottage ? 'Room' : 'Cottage'}` : `Add ${!isCottage ? 'Room' : 'Cottage'}`;
    const buttonLoadingText = defaultValues ? `Updating ${!isCottage ? 'Room' : 'Cottage'}...` : `Adding ${!isCottage ? 'Room' : 'Cottage'}...`;

    const [images, setImages] = useState(defaultValues?.images || []);
    const [imageErrorMsg, setImageErrorMsg] = useState('');

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        type: yup.string().required(`${!isCottage ? 'Room' : 'Cottage'} type is required`),
        active: yup.boolean().default(!defaultValues ? true : !!defaultValues?.active),
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const { register, handleSubmit, setValue, reset, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const newData = Object.assign(data, { images });
        if (images.length !== 0) {
            if (!isCottage) {
                if (defaultValues) {
                    commonValidationCall({
                        endpoint: 'api/rooms/update-room/' + defaultValues.id,
                        body: newData,
                        method: 'put',
                        setLoading,
                        hasToaster: true,
                        handleClose: () => {
                            onSuccess();
                            handleClose();
                        },
                    });
                } else {
                    commonValidationCall({
                        endpoint: 'api/rooms/add-room',
                        body: newData,
                        method: 'post',
                        setLoading,
                        hasToaster: true,
                        handleClose,
                        onSuccess: () => {
                            setImages([]);
                            reset();
                            onSuccess();
                        }
                    });
                }
            } else {
                if (defaultValues) {
                    commonValidationCall({
                        endpoint: 'api/cottages/update-cottage/' + defaultValues.id,
                        body: newData,
                        method: 'put',
                        setLoading,
                        hasToaster: true,
                        handleClose: () => {
                            onSuccess();
                            handleClose();
                        },
                    });
                } else {
                    commonValidationCall({
                        endpoint: 'api/cottages/add-cottage',
                        body: newData,
                        method: 'post',
                        setLoading,
                        hasToaster: true,
                        handleClose,
                        onSuccess: () => {
                            setImages([]);
                            reset();
                            onSuccess();
                        }
                    });
                }
            }
        }
    };

    const onClickValidate = () => {
        images.length === 0 ? setImageErrorMsg('Room image/s are required') : undefined;
    }

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title={modalTitle}
            loading={loading}
            maxWidth="lg"
            children={
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent dividers sx={{ width: '900px' }}>
                            <UploadImages
                                isCottage={isCottage}
                                imageErrorMsg={imageErrorMsg}
                                setImageErrorMsg={setImageErrorMsg}
                                setImages={setImages}
                                images={images}
                            />
                            <AddRoomForm
                                isCottage={isCottage}
                                defaultValues={defaultValues}
                                errors={errors}
                                register={register}
                                setValue={setValue}
                            />
                        </DialogContent>

                        <CommonFooter>
                            <ButtonWithLoading
                                loading={loading}
                                type='submit'
                                disabled={!defaultValues ? !isValid : !isDirty}
                                variant='contained'
                                color='success'
                                size='large'
                                loadingText={buttonLoadingText}
                                onClick={onClickValidate}
                            >
                                {buttonText}
                            </ButtonWithLoading>
                        </CommonFooter>
                    </form>
                </>
            }
        />
    )
}

export default AddRoom
