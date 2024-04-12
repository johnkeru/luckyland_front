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

const AddRoomType = ({ button, onSuccess }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState('');
    const [attrErrorMsg, setAttrErrorMsg] = useState('');

    const schema = yup.object().shape({
        type: yup.string().required('Room type is required'),
        description: yup.string(),
        price: yup.number().required('Price is required').typeError('Price must be an integer').min(1, 'Price must be at least 1'),
        minCapacity: yup.number()
            .required('Minimum capacity is required')
            .typeError('Capacity must be an integer')
            .min(1, 'Capacity must be at least 1')
            .test('maxCapacity', 'Minimum capacity must be less than or equal to maximum capacity', function (value) {
                const { maxCapacity } = this.parent; // Get the value of maxCapacity from the parent object
                return value <= maxCapacity; // Check if minCapacity is less than or equal to maxCapacity
            }),
        maxCapacity: yup.number()
            .required('Maximum capacity is required')
            .typeError('Capacity must be an integer')
            .min(1, 'Capacity must be at least 1')
            .test('minCapacity', 'Maximum capacity must be greater than or equal to minimum capacity', function (value) {
                const { minCapacity } = this.parent; // Get the value of minCapacity from the parent object
                return value >= minCapacity; // Check if maxCapacity is greater than or equal to minCapacity
            })
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (attributes.length === 0) {
            setAttrErrorMsg('Room attributes/s are required')
        } else {
            const newData = Object.assign(data, { attributes });
            commonValidationCall({
                endpoint: 'api/rooms/update-rooms-by-type',
                body: newData,
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


    const handleAddAttr = () => {
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
        setAttributes(prev => prev.filter(attribute => attribute.name !== name))
    }

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title='Add New Type of rooms'
            loading={loading}
            maxWidth="md"
            children={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>

                        <InputIcon sx={{ mb: 2 }} errors={errors} label='Type' register={register} fullWidth name='type' />

                        <InputIcon Icon={TbCurrencyPeso} type='number' sx={{ mb: 2 }} errors={errors} label='Price' register={register} fullWidth name='price' />

                        {/* <InputIcon  type='number' sx={{ mb: 2 }} errors={errors} label='Rate (%)' register={register} fullWidth name='rate' /> */}
                        <InputIcon type='number' sx={{ mb: 2 }} errors={errors} label='Minimum Capacity' register={register} fullWidth name='minCapacity' />
                        <InputIcon type='number' sx={{ mb: 2 }} errors={errors} label='Maximum Capacity' register={register} fullWidth name='maxCapacity' />

                        <TextArea register={register} name='description' height='50px' placeholder='Room Description (Optional)' />

                        <Typography gutterBottom variant='h6'>Room Attributes</Typography>
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
                            disabled={!isValid}
                            type='submit'
                            loadingText="Adding New type of rooms..."
                            color='info'
                        >
                            Add New type of rooms
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    )
}

export default AddRoomType