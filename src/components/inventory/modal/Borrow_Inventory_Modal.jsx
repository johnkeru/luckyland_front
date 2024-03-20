import { yupResolver } from '@hookform/resolvers/yup';
import {
    Autocomplete,
    DialogContent,
    TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import InputHelper from '../../../utility_components/InputHelper';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from "../../../utility_components/modal/Modal";
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';

export default function Borrow_Inventory_Modal({ draggable, data, button, onClick }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [borrowing, setBorrowing] = useState(false);

    const schema = yup.object().shape({
        borrowed_quantity: yup
            .number()
            .required('Required')
            .max(data.currentQuantity)
            .integer('Must be an integer')
            .transform((value) => (isNaN(value) ? undefined : value)),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        reset();
        setSelectedId(null)
        setOpen(false)
    };

    const isReadyBorrow = !!watch('borrowed_quantity') && !!selectedId;


    const handleBorrow = (borrowed_quantity) => {
        onClick(data.id, selectedId, borrowed_quantity, setBorrowing, handleClose)
    }

    useEffect(() => {
        let timer;
        if (open) {
            const delay = 500;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                basicGetCall({
                    endpoint: `api/customers?search=${search}&inResort=true`,
                    setLoading,
                    setResponse: setCustomers
                });
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [search, open]);

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            maxWidth='md'
            draggable={draggable}
            title="Customer Borrow"
            loading={borrowing}
            children={
                <form onSubmit={handleSubmit(handleBorrow)} style={{ width: '500px' }}>
                    <DialogContent dividers>
                        <Autocomplete
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(event, newValue) => {
                                if (newValue)
                                    setSelectedId(newValue.value);
                            }}
                            options={loading ? [{ label: 'Loading...', value: null }] : customers.data.map(customer => ({
                                value: customer.id,
                                label: `${customer.reservationHASH} - ${customer.firstName} ${customer.lastName}`
                            }))}
                            onInputChange={e => e.target.value !== 0 ? setSearch(e.target.value) : undefined}
                            getOptionLabel={option => option.label}
                            isOptionEqualToValue={(option, value) => option.value === value?.value}
                            renderInput={(params) => <TextField {...params} label="Search or select a customer" />}
                        />
                        <InputHelper
                            disabled={data.status === 'Out of Stock' || data.currentQuantity === 0}
                            error={errors.borrowed_quantity || data.status === 'Out of Stock' ? 'No stock available.' : undefined}
                            name='borrowed_quantity' number
                            label={`Borrow ${data.productName}, Current quantity: ${data.currentQuantity}`}
                            placeholder='Enter borrow quantity'
                            register={register} />
                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            fullWidth
                            color='error'
                            type="submit"
                            disabled={!isReadyBorrow}
                            loading={borrowing}
                            loadingText='Borrowing...'
                        >
                            Borrow
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}
