import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    DialogContent
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import ButtonWithLoading from '../../../../utility_components/ButtonWithLoading';
import InputHelper from '../../../../utility_components/InputHelper';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from "../../../../utility_components/modal/Modal";


export default function Add_To_Another({ button, row, addToInventory = false, handleOnSubmit }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [focusInput, setFocusInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const schema = yup.object().shape({
        quantity: yup
            .number()
            .required('Required')
            .integer('Must be an integer')
            .min(0, 'Must be greater than or equal to 0')
            .max(row.quantity, "Quantity must be less than or equal to " + row.quantity)
            .transform((value) => (isNaN(value) ? undefined : value)),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        reset();
        setOpen(false)
    };

    const isReadyToMove = !!watch('quantity');


    const onSubmit = (data) => {
        handleOnSubmit(data, setLoading, setError, handleClose, addToInventory)
    }

    const handleAll = () => {
        setValue('quantity', row.quantity);
        setFocusInput(true);
    }

    return (
        <Modal
            draggable
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            maxWidth='md'
            title={`Add to ${addToInventory ? 'inventory' : 'waste'}`}
            loading={loading}
            children={
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '500px' }}>
                    <DialogContent dividers>

                        <Box display='flex' gap={2}>
                            <InputHelper
                                focused={focusInput}
                                name='quantity'
                                number
                                label={`Quantity: ${row?.quantity || 0}`}
                                placeholder={`Enter quantity to add ${addToInventory ? 'inventory' : 'waste'}`}
                                register={register}
                                error={errors?.quantity?.message}
                            />
                            <Button color='info' onClick={handleAll}>All</Button>
                        </Box>

                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            fullWidth
                            color={addToInventory ? 'success' : 'error'}
                            type="submit"
                            disabled={!isReadyToMove}
                            loading={loading}
                            loadingText={addToInventory ? 'Adding to inventory...' : 'Adding to waste...'}
                        >
                            {addToInventory ? 'Add to inventory' : 'Add to waste'}
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}
