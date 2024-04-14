import { yupResolver } from '@hookform/resolvers/yup';
import {
    Autocomplete,
    Box,
    DialogContent,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import ButtonWithLoading from '../../../../utility_components/ButtonWithLoading';
import InputHelper from '../../../../utility_components/InputHelper';
import InputIcon from "../../../../utility_components/InputIcon";
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from "../../../../utility_components/modal/Modal";
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import { resizeInventoryPic } from '../../../../utility_functions/cloudinaryUrl';
import combineCategories from '../../../../utility_functions/combineCategories';


export default function Add_Unavailable_Modal({ button, onClick, handleUpdate, row, isUpdate = false }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [updating, setUpdating] = useState(false);

    const schema = yup.object().shape({
        reason: yup.string().required('Reason is required'),
        quantity: yup
            .number()
            .required('Required')
            .integer('Must be an integer')
            .max(selected?.currentQuantity || row?.currentQuantity + row?.quantity || 0)
            .transform((value) => (isNaN(value) ? undefined : value)),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        reset();
        setSelected(null)
        setOpen(false)
    };

    const w = watch();

    const isReadyToAdd = !!w.quantity && !!w.reason && !!selected;
    const isReadyToEdit = isUpdate ? (w.quantity && w.quantity !== row.quantity) || (w.reason && w.reason !== row.reason) : true;

    const onSubmit = (data) => {
        if (isUpdate) {
            handleUpdate(data, setError, setUpdating, handleClose);
        } else {
            const updatedData = Object.assign(data, { item_id: selected.value });
            onClick(updatedData, setUpdating, setError, handleClose)
        }
    }

    useEffect(() => {
        let timer;
        if (open) {
            const delay = 500;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                basicGetCall({
                    endpoint: `api/findItem?search=${search}`,
                    setLoading,
                    setResponse: setItems
                })
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [search, open]);

    return (
        <Modal
            draggable
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            maxWidth='md'
            title={isUpdate ? `Edit ${row.name}` : "Add Unavailable"}
            loading={updating}
            children={
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '500px' }}>
                    <DialogContent dividers>

                        <InputIcon
                            defaultValue={row?.reason}
                            label='Reason'
                            name='reason'
                            register={register}
                            errors={errors}
                            placeholder='Enter reason why unavailable.'
                            sx={{ mb: 2 }}
                        />

                        {!isUpdate ? <Autocomplete
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(event, newValue) => {
                                if (newValue)
                                    setSelected(newValue);
                            }}
                            options={loading ? [{ label: 'Loading...', value: null }] : items.data.map(item => ({
                                value: item.id,
                                label: `${item.name}`,
                                label2: `${combineCategories(item.categories)}`,
                                image: item?.image,
                                currentQuantity: item.currentQuantity
                            }))}
                            onInputChange={e => e.target.value !== 0 ? setSearch(e.target.value) : undefined}
                            getOptionLabel={option => option.label}
                            isOptionEqualToValue={() => true}
                            renderOption={(props, option) => (
                                <Box {...props}>
                                    <Box width='100%' display='flex' alignItems='center' justifyContent='space-between' borderBottom='1px solid #ddd'>
                                        <Box width='100%' display='flex' alignItems='center' gap={2}>
                                            <img alt={option.label} loading="lazy" src={resizeInventoryPic(option.image, 50, 35, 'c_thumb')} />
                                            <Typography>{option.label}</Typography>
                                        </Box>
                                        <Typography variant='body2' color='GrayText'>{option.label2}</Typography>
                                    </Box>
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params} label="Search or select a item" />}
                        />
                            : undefined}
                        <InputHelper
                            name='quantity'
                            number
                            value={row ? row.quantity : undefined}
                            label={row ? `Edit ${row.name}, Inventory quantity: ${row.currentQuantity + row?.quantity}` : `Add unavailable quantity, Inventory quantity: ${selected?.currentQuantity || 0}`}
                            placeholder='Enter quantity unavailable'
                            register={register}
                            error={errors?.quantity?.message}
                        />

                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            fullWidth
                            color='error'
                            type="submit"
                            disabled={isUpdate ? !isReadyToEdit : !isReadyToAdd}
                            loading={updating}
                            loadingText={isUpdate ? 'Editing unavailable...' : 'Adding unavailable...'}
                        >
                            {isUpdate ? 'Edit unavailable' : 'Add unavailable'}
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}
