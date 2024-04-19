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
import CommonFooter from '../../../../utility_components/modal/CommonFooter';
import Modal from "../../../../utility_components/modal/Modal";
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import { resizeInventoryPic } from '../../../../utility_functions/cloudinaryUrl';
import combineCategories from '../../../../utility_functions/combineCategories'

export default function Add_Waste_Modal({ button, configMethods, handleUpdate, row, isUpdate = false }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [updating, setUpdating] = useState(false);

    const schema = yup.object().shape({
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

    const isReadyBorrow = !!watch('quantity') && isUpdate ? true : !!selected;


    const onSubmit = (data) => {
        if (isUpdate) {

            handleUpdate(data, setError, setUpdating, handleClose);
        } else {
            const updatedData = Object.assign(data, { item_id: selected.value });
            configMethods.add(updatedData, setUpdating, setError, handleClose)
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
            title={isUpdate ? `Edit ${row.name} Waste` : "Add Waste"}
            loading={updating}
            children={
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '500px' }}>
                    <DialogContent dividers>
                        {!isUpdate ? <Autocomplete
                            sx={{ mb: 2 }}
                            fullWidth
                            onChange={(event, newValue) => {
                                if (newValue)
                                    setSelected(newValue);
                            }}
                            options={loading ? [{ label: 'Loading...', value: null, }] : items.data.map(item => ({
                                value: item.id,
                                label: `${item.name}`,
                                label2: `${combineCategories(item.categories)}`,
                                image: item?.image,
                                currentQuantity: item.currentQuantity
                            }))}
                            onInputChange={e => e.target.value !== 0 ? setSearch(e.target.value) : undefined}
                            getOptionLabel={option => option.label}
                            isOptionEqualToValue={(option, value) => {
                                // console.log('value', value?.value);
                                // console.log('option', option.value);
                                // console.log('isMatch', option.value === value?.value);
                                return true;
                            }}
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
                            label={row ? `Edit ${row.name}, Inventory quantity: ${row.currentQuantity + row?.quantity}` : `Add waste quantity, Inventory quantity: ${selected?.currentQuantity || 0}`}
                            placeholder='Enter quantity waste'
                            register={register}
                            error={errors?.quantity?.message}
                        />

                    </DialogContent>

                    <CommonFooter>
                        <ButtonWithLoading
                            fullWidth
                            color='error'
                            type="submit"
                            disabled={!isReadyBorrow}
                            loading={updating}
                            loadingText={isUpdate ? 'Editing Waste...' : 'Adding Waste...'}
                        >
                            {isUpdate ? 'Edit Waste' : 'Add Waste'}
                        </ButtonWithLoading>
                    </CommonFooter>
                </form>
            }
        />
    );
}
