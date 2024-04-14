import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useBookingSummaryReservation from '../../../../../hooks/useBookingSummaryReservation';

const Amenities = ({ amenities }) => {
    const { roomSelected, setAmenitiesToSend, amenitiesToSend, setAmenitiesToCompute, amenitiesToCompute } = useBookingSummaryReservation();

    useEffect(() => {
        setAmenitiesToSend(amenities.map(am => ({
            id: am.id,
            productName: am.productName,
            category: am.category.name,
            for: am.for,
            type: roomSelected.type,
            quantity: am.for === 'Room' ? roomSelected.capacity : 0,
            price: am.price,
        })));
    }, [])

    // Handler function to update selected amenities
    const handleAmenityChange = (quantity, id, productName, price, category, isForRoom) => {
        const numQuantity = parseInt(quantity);
        setAmenitiesToSend(amenitiesToSend.map(am => {
            if (am.id === id) {
                return { ...am, quantity: parseInt(quantity) }
            } else {
                return am
            }
        }));

        const existingIndex = amenitiesToCompute.findIndex(item => item.id === id);
        if (existingIndex !== -1) {
            if (numQuantity === roomSelected.capacity) {
                setAmenitiesToCompute(amenitiesToCompute.filter(atc => atc.id !== id));
            } else {
                if (numQuantity === 0) {
                    setAmenitiesToCompute(amenitiesToCompute.filter(atc => atc.id !== id));
                } else {
                    const updatedAmenities = [...amenitiesToCompute];
                    updatedAmenities[existingIndex].quantity = isForRoom ? (numQuantity - roomSelected.capacity) : numQuantity;
                    setAmenitiesToCompute(updatedAmenities);
                }
            }
        } else {
            if (numQuantity === roomSelected.capacity) {
                return;
            }
            setAmenitiesToCompute([...amenitiesToCompute, { quantity: isForRoom ? (numQuantity - roomSelected.capacity) : numQuantity, id, productName, price, category }]);
        }
    };

    return (
        <Box p={2} border='1px solid #ddd' bgcolor='white'>
            <Typography fontWeight={600} gutterBottom>Amenities</Typography>

            <Box display='flex' alignItems='center' justifyContent='space-evenly' flexWrap='wrap'>
                {
                    amenitiesToSend.length === 0 ? undefined : amenitiesToSend.map(am => (
                        am.for === 'Room' ?
                            am.type !== 'Family' ?
                                <Box key={am.id} width='100px'>
                                    <Typography gutterBottom mb={2}>{am.category}</Typography>
                                    <FormControl size='small' fullWidth>
                                        <InputLabel id="demo-simple-select-label">Free {roomSelected.capacity}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={''}
                                            label='Amenties'
                                            onChange={(e) => handleAmenityChange(e.target.value, am.id, am.productName, am.price, am.category, true)}
                                        >
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                            <MenuItem value="6">6</MenuItem>
                                            <MenuItem value="7">7</MenuItem>
                                            <MenuItem value="8">8</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                :
                                <Box key={am.id} width='100px'>
                                    <Typography gutterBottom mb={2}>{am.category}</Typography>
                                    <FormControl size='small' fullWidth>
                                        <InputLabel id="demo-simple-select-label">Free {roomSelected.capacity}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={''}
                                            label='Amenties'
                                            onChange={(e) => handleAmenityChange(e.target.value, am.id, am.productName, am.price, am.category, true)}
                                        >
                                            <MenuItem value="8">8</MenuItem>
                                            <MenuItem value="9">9</MenuItem>
                                            <MenuItem value="10">10</MenuItem>
                                            <MenuItem value="11">11</MenuItem>
                                            <MenuItem value="12">12</MenuItem>
                                            <MenuItem value="13">13</MenuItem>
                                            <MenuItem value="14">14</MenuItem>
                                            <MenuItem value="15">15</MenuItem>
                                            <MenuItem value="16">16</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            :
                            <Box key={am.id} width='100px'>
                                <Typography gutterBottom mb={2}>{am.productName}</Typography>
                                <FormControl size='small' fullWidth>
                                    <InputLabel id="demo-simple-select-label">{0}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={''}
                                        label='Amenties2'
                                        onChange={(e) => handleAmenityChange(e.target.value, am.id, am.productName, am.price, am.category)}
                                    >
                                        <MenuItem value="0">0</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Amenities
