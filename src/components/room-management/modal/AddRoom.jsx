import { Box, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import AddRoomForm from './AddRoomForm';
import UploadImages from './UploadImages';
import RoomTypeForm from './RoomTypeForm';
import useTypes from '../../../hooks/rooms/useTypes';

const AddRoom = ({ button, onSuccess, defaultValues, isCottage }) => {
    const modalTitle = defaultValues ? 'Editing ' + defaultValues?.name : `Add ${!isCottage ? 'Room' : 'Cottage'}`;
    const buttonText = defaultValues ? `Update ${!isCottage ? 'Room' : 'Cottage'}` : `Add ${!isCottage ? 'Room' : 'Cottage'}`;
    const buttonLoadingText = defaultValues ? `Updating ${!isCottage ? 'Room' : 'Cottage'}...` : `Adding ${!isCottage ? 'Room' : 'Cottage'}...`;

    // from room images
    const [images, setImages] = useState(defaultValues?.images || []);
    const [isImageDirty, setIsImageDirty] = useState(false);
    const [imageErrorMsg, setImageErrorMsg] = useState('');

    // for roomtype attributes
    const [attributes, setAttributes] = useState([]);
    const [isAttributeDirty, setIsAttributeDirty] = useState(false);
    const [attribute, setAttribute] = useState('');
    const [attrErrorMsg, setAttrErrorMsg] = useState('');

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        type: yup.string().required(`${!isCottage ? 'Room' : 'Cottage'} type is required`),
        active: yup.boolean().default(!defaultValues ? true : !!defaultValues?.active),

        selectingType: yup.string().default(defaultValues?.type),
        description: yup.string(),
        price: yup.number().required('Price is required').typeError('Price must be an integer').min(1, 'Price must be at least 1'),
        capacity: yup.number()
            .required('Capacity is required')
            .typeError('Capacity must be a number')
            .min(1, 'Capacity must be at least 1')
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const { register, handleSubmit, setValue, reset, watch, formState: { errors, isValid, isDirty } } = useForm({
        resolver: yupResolver(schema)
    });

    const resetAllFieldsAfter = () => {
        reset();
        setAttributes([]);
        setImages([])
    }

    const handleValidateOtherFields = () => { // check first the fields out of useForm fields
        if (attributes.length === 0) setAttrErrorMsg('Room attributes/s are required');
        else setAttrErrorMsg('');
        if (images.length === 0) setImageErrorMsg('Room image/s are required');
        else setImageErrorMsg('')
    }

    const onSubmit = (data) => {
        if (attributes.length === 0 || images.length === 0) // check first the fields out of useForm fields
            return;
        else {
            const newData = Object.assign(data, { images }, { attributes, origType: watch('selectingType') });
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
                            resetAllFieldsAfter();
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
                            onSuccess();
                            resetAllFieldsAfter();
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
                            resetAllFieldsAfter();
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
                            resetAllFieldsAfter();
                        }
                    });
                }
            }
        }
    };

    // roomType attributes
    const handleAddAttr = () => {
        setIsAttributeDirty(true);
        setAttrErrorMsg('')
        setAttributes(prev => {
            if (!prev.includes(attribute)) {
                return [...prev, { name: attribute }];
            } else {
                return prev;
            }
        });
        setAttribute('');
    }
    const handleRemoveAttr = (name) => {
        setIsAttributeDirty(true);
        setAttributes(prev => prev.filter(attribute => attribute.name !== name))
    }

    const { types } = useTypes();


    useEffect(() => {
        if (types.filter(typ => typ.type === watch('selectingType'))[0]) {
            const defaultRoomTypeData = types.filter(typ => typ.type === watch('selectingType'))[0];
            setAttributes(defaultRoomTypeData.attributes || []);
            setValue('capacity', defaultRoomTypeData.capacity || defaultRoomTypeData.minCapacity);
            setValue('price', defaultRoomTypeData.price);
            setValue('description', defaultRoomTypeData.description);
            setValue('type', defaultRoomTypeData.type);

        } else {
            setAttributes([]);
            setValue('capacity', null);
            setValue('price', null);
            setValue('description', null);
            setValue('type', null);
        }
    }, [watch('selectingType'), open]);


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
                        <DialogContent dividers>
                            <Box display='flex' gap={4}>
                                <Box width='50%'>
                                    <RoomTypeForm
                                        attrErrorMsg={attrErrorMsg}
                                        attribute={attribute}
                                        attributes={attributes}
                                        errors={errors}
                                        handleAddAttr={handleAddAttr}
                                        handleRemoveAttr={handleRemoveAttr}
                                        isCottage={isCottage}
                                        register={register}
                                        setAttribute={setAttribute}
                                        defaultValues={defaultValues}
                                    />
                                </Box>
                                <Box width='50%'>
                                    <UploadImages
                                        isCottage={isCottage}
                                        imageErrorMsg={imageErrorMsg}
                                        setImageErrorMsg={setImageErrorMsg}
                                        setImages={setImages}
                                        images={images}
                                        setIsImageDirty={setIsImageDirty}
                                    />
                                    <AddRoomForm
                                        isCottage={isCottage}
                                        defaultValues={defaultValues}
                                        errors={errors}
                                        register={register}
                                        setValue={setValue}
                                    />
                                </Box>
                            </Box>
                        </DialogContent>

                        <CommonFooter>
                            <ButtonWithLoading
                                loading={loading}
                                type='submit'
                                variant='contained'
                                color='success'
                                size='large'
                                onClick={handleValidateOtherFields}
                                loadingText={buttonLoadingText}
                                disabled={
                                    defaultValues ? !(isDirty || isAttributeDirty || isImageDirty) : false
                                }
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
