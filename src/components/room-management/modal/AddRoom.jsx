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

const AddRoom = ({ button, onSuccess, defaultValues }) => {
    const [images, setImages] = useState(defaultValues?.images || []);
    const [imageErrorMsg, setImageErrorMsg] = useState('');

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        type: yup.string().required('Room type is required'),
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
            title={defaultValues ? 'Editing ' + defaultValues?.name : "Add Room"}
            loading={loading}
            maxWidth="lg"
            children={
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent dividers sx={{ width: '900px' }}>
                            <UploadImages
                                imageErrorMsg={imageErrorMsg}
                                setImageErrorMsg={setImageErrorMsg}
                                setImages={setImages}
                                images={images}
                            />
                            <AddRoomForm
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
                                disabled={defaultValues ? false : !isValid}
                                variant='contained'
                                color='success'
                                size='large'
                                loadingText={defaultValues ? 'Updating New Room...' : 'Adding Room...'}
                                onClick={onClickValidate}
                            >
                                {defaultValues ? 'Update Room' : 'Add Room'}
                            </ButtonWithLoading>
                        </CommonFooter>
                    </form>
                </>
            }
        />
    )
}

export default AddRoom
