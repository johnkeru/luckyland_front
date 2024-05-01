import { Box, Button, Chip, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import { TbCurrencyPeso } from "react-icons/tb";
import InputIcon from '../../../utility_components/InputIcon';
import TextArea from '../../../utility_components/TextArea';
import TypeOfRoom from './TypeOfRoom';

const RoomTypeForm = ({
    register,
    errors,
    attribute,
    attributes,
    setAttribute,
    attrErrorMsg,
    handleAddAttr,
    handleRemoveAttr,
    isCottage,
    defaultValues
}) => {

    return (
        <Box>
            <TypeOfRoom isCottage={isCottage} defaultValues={defaultValues} name={'selectingType'} register={register} />
            <InputIcon sx={{ mb: 2 }} errors={errors} label='Type' register={register} fullWidth name='type' />
            <InputIcon Icon={TbCurrencyPeso} type='number' sx={{ mb: 2 }} errors={errors} label='Price' register={register} fullWidth name='price' />
            {/* <InputIcon  type='number' sx={{ mb: 2 }} errors={errors} label='Rate (%)' register={register} fullWidth name='rate' /> */}
            <InputIcon type='number' sx={{ mb: 2 }} errors={errors} label='Capacity' register={register} fullWidth name='capacity' />
            <TextArea register={register} name='description' height='50px' placeholder={`${!isCottage ? 'Room' : 'Cottage'} Description (Optional)`} />
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
        </Box>
    )
}

export default RoomTypeForm