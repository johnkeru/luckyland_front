import { Box, Button, Chip, DialogContent, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import Modal from '../../../utility_components/modal/Modal';
import InputIcon from '../../../utility_components/InputIcon';
import { TbCurrencyPeso } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import TextArea from '../../../utility_components/TextArea';

const AddAndEditRoomType = ({ button, roomType, onSuccess, isCottage }) => {
    const modalTitle = !roomType ? `Add New Type of ${!isCottage ? 'rooms' : 'cottages'}` : `Edit ${roomType.type} ${!isCottage ? 'rooms' : 'cottages'}`;
    const buttonText = !roomType ? `Add New Type of ${!isCottage ? 'rooms' : 'cottages'}` : `Update all ${roomType.type} ${!isCottage ? 'rooms' : 'cottages'}`;
    const buttonLoadingText = !roomType ? `Adding new type of ${!isCottage ? 'rooms' : 'cottages'}...` : `Updating all ${roomType.type} ${!isCottage ? 'rooms' : 'cottages'}...`;
    const buttonColor = !roomType ? 'success' : 'info';

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const [attributes, setAttributes] = useState(roomType?.attributes || []);
    const [isAttributeDirty, setIsAttributeDirty] = useState(false);
    const [attribute, setAttribute] = useState('');
    const [attrErrorMsg, setAttrErrorMsg] = useState('');

    const schema = yup.object().shape({
        type: yup.string().required('Room type is required'),
        description: yup.string(),
        price: yup.number().required('Price is required').typeError('Price must be an integer').min(1, 'Price must be at least 1'),
        capacity: yup.number()
            .required('Capacity is required')
            .typeError('Capacity must be a number')
            .min(1, 'Capacity must be at least 1')
    });

    const { register, handleSubmit, setError, formState: { errors, isDirty, isValid, } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (attributes.length === 0) setAttrErrorMsg('Room attributes/s are required')
        else {
            const newData = Object.assign(data, { attributes: isAttributeDirty ? attributes : null, origType: roomType?.type });
            if (!isCottage) {
                if (!roomType) {
                    commonValidationCall({
                        endpoint: 'api/rooms/add-room-type',
                        body: newData,
                        setError,
                        method: 'post',
                        setLoading,
                        hasToaster: true,
                        onSuccess: () => {
                            onSuccess();
                            handleClose();
                        }
                    });
                } else {
                    commonValidationCall({
                        endpoint: 'api/rooms/update-rooms-by-type',
                        body: newData,
                        method: 'put',
                        setError,
                        setLoading,
                        hasToaster: true,
                        onSuccess: () => {
                            onSuccess();
                            handleClose();
                        }
                    });
                }
            } else {
                if (!roomType) {
                    commonValidationCall({
                        endpoint: 'api/cottages/add-cottage-type',
                        body: newData,
                        setError,
                        method: 'post',
                        setLoading,
                        hasToaster: true,
                        onSuccess: () => {
                            onSuccess();
                            handleClose();
                        }
                    });
                } else {
                    commonValidationCall({
                        endpoint: 'api/cottages/update-cottages-by-type',
                        body: newData,
                        setError,
                        method: 'put',
                        setLoading,
                        hasToaster: true,
                        onSuccess: () => {
                            onSuccess();
                            handleClose();
                        }
                    });
                }
            }
        }
    }


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

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title={modalTitle}
            loading={loading}
            maxWidth="sm"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>

                        <InputIcon defaultValue={roomType?.type} sx={{ mb: 2 }} errors={errors} label='Type' register={register} fullWidth name='type' />

                        <InputIcon Icon={TbCurrencyPeso} defaultValue={roomType?.price} type='number' sx={{ mb: 2 }} errors={errors} label='Price' register={register} fullWidth name='price' />

                        {/* <InputIcon defaultValue={roomType?.rate} type='number' sx={{ mb: 2 }} errors={errors} label='Rate (%)' register={register} fullWidth name='rate' /> */}

                        <InputIcon defaultValue={roomType?.capacity || roomType?.minCapacity} type='number' sx={{ mb: 2 }} errors={errors} label='Capacity' register={register} fullWidth name='capacity' />

                        <TextArea defaultValue={roomType?.description} register={register} name='description' height='50px' placeholder={`${!isCottage ? 'Room' : 'Cottage'} Description (Optional)`} />

                        <Typography gutterBottom variant='h6'>{!isCottage ? 'Room' : 'Cottage'} Attributes</Typography>
                        <Box mb={2}>
                            <TextField
                                value={attribute}
                                fullWidth
                                label='Add attributes'
                                error={!!attrErrorMsg}
                                helperText={attrErrorMsg ? attrErrorMsg : undefined}
                                onChange={e => setAttribute(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button disabled={!attribute} variant='contained' onClick={handleAddAttr}>
                                                Add
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {attributes.length !== 0 ? <Box p={2} pb={1} pr={1} border='1px solid' bgcolor='primary.contrastText' borderColor='primary.main' borderRadius={2} mt={1}>
                                {
                                    attributes.map(attr => (
                                        <Chip color='primary' sx={{ mr: 1, mb: 1 }} label={attr?.name} key={attr?.name} onDelete={() => handleRemoveAttr(attr?.name)} />
                                    ))
                                }
                            </Box> : undefined}
                        </Box>
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            loading={loading}
                            disabled={!roomType ? !(isAttributeDirty && isValid) : !(isAttributeDirty || isDirty)}
                            type='submit'
                            loadingText={buttonLoadingText}
                            color={buttonColor}
                        >
                            {buttonText}
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    )
}

export default AddAndEditRoomType