import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    DialogContent,
    DialogActions
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import * as yup from 'yup';
import InputHelper from '../../../utility_components/InputHelper';
import axiosCall from '../../../utility_functions/axiosCall';
import Modal from "../Modal";

export default function Borrow_Inventory_Modal({ data, button, onClick }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [borrowing, setBorrowing] = useState(false);

    const handleSearchCustomer = (option) => setSearch(option);

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
        setSelectedOption(null)
        setOpen(false)
    };

    const isReadyBorrow = !!watch('borrowed_quantity') && !!selectedOption?.value;


    const handleBorrow = (borrowed_quantity) => {
        onClick(data.id, selectedOption.value, borrowed_quantity, setBorrowing, handleClose)
    }

    useEffect(() => {
        axiosCall({
            endpoint: `api/customers?search=${search}`,
            setLoading,
            setResponse: setCustomers
        })
    }, [search]);

    return (
        <Modal
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            maxWidth='md'
            title="Customer Borrow"
            loading={borrowing}
            children={
                <form onSubmit={handleSubmit(handleBorrow)}>
                    <DialogContent dividers>
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            Customer
                        </label>
                        <Select
                            className="w-full mb-3"
                            value={selectedOption}
                            onChange={option => setSelectedOption(option)}
                            options={
                                loading
                                    ? [{ label: 'Loading...', value: null }]
                                    : customers.data.data.map(customer => ({
                                        value: customer.id,
                                        label: `${customer.hashId} - ${customer.firstName} ${customer.lastName}`
                                    }))
                            }
                            onInputChange={handleSearchCustomer}
                            isSearchable
                            placeholder="Search or select a customer"
                        />

                        <InputHelper isBorrow disabled={data.status === 'Out of Stock' || data.currentQuantity === 0} error={errors.borrowed_quantity} name='borrowed_quantity' number label={`Borrow ${data.productName}, Current quantity: ${data.currentQuantity}`} placeholder='Enter borrow quantity' register={register} />
                    </DialogContent>

                    <DialogActions sx={{ m: 1 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            color='error'
                            type="submit"
                            disabled={!isReadyBorrow || borrowing}
                        >
                            Borrow
                        </Button>
                    </DialogActions>
                </form>
            }
        />
    );
}
