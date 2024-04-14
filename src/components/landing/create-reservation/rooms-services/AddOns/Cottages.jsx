import { Box, Button, CardMedia, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useBookingSummaryReservation from '../../../../../hooks/useBookingSummaryReservation';

const AddOnsCottages = ({ cottages }) => {
    const [localCottages, setLocalCottages] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const { cottageSelected, setCottageSelected, isCottageOvernight, setIsCottageOvernight } = useBookingSummaryReservation();

    const [selectOptionError, setSelectOptionError] = useState('');

    const defaultCottages = () => {
        setSelectedType();
        const cottageByType = {};
        cottages.forEach(cottage => {
            if (!(cottage.type in cottageByType)) {
                cottageByType[cottage.type] = cottage;
            }
        });
        setLocalCottages(Object.values(cottageByType));
    }

    useEffect(() => {
        defaultCottages();
    }, []);

    const handleSelectCottagesWithSameType = (type) => {
        setSelectedType(type);
        setLocalCottages(() => (
            cottages.filter(old => old.type === type)
        ));
    }

    const handleSelectCottage = (cottage) => {
        if (!isCottageOvernight) {
            setSelectOptionError('Required');
            return;
        }
        setCottageSelected(cottage);
    }

    const handleUnSelectCottage = () => {
        setCottageSelected(null);
    }

    return (
        <Box p={2} border='1px solid #ddd' bgcolor='white' mb={1}>
            <Box mb={2} display='flex' justifyContent='space-between' alignItems='end'>
                <Box display='flex' gap={1} alignItems='center'>
                    <Typography fontWeight={600}>{cottageSelected?.name || selectedType || 'Cottages Type'}</Typography>
                    {(!cottageSelected && selectedType) ? '/' : undefined}
                    {(!cottageSelected && selectedType) ? <Typography onClick={() => defaultCottages()} sx={{ cursor: 'pointer', ":hover": { textDecoration: 'underline' } }}>All</Typography> : undefined}
                </Box>
                <FormControl size='small' sx={{ width: '30%' }} error={!!selectOptionError}>
                    <InputLabel id="demo-simple-select-label">Day or Overnight</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isCottageOvernight || ''}
                        label='Day or Overnight book'
                        onClick={() => setSelectOptionError('')}
                        onChange={e => setIsCottageOvernight(e.target.value)}
                    >
                        <MenuItem value="" disabled>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Day">Day</MenuItem>
                        <MenuItem value="Overnight">Overnight</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box display="flex" justifyContent="space-between" flexWrap='wrap' gap={2}>

                {!cottageSelected ? localCottages.map(cottage => (
                    <Box key={cottage.id} width='48.5%'
                        sx={{ cursor: selectedType ? 'default' : 'pointer', }}
                        onClick={() => handleSelectCottagesWithSameType(cottage.type)}
                    >
                        <Box bgcolor="#fff" borderRadius={2} boxShadow={2}>
                            <CardMedia
                                component="img"
                                image={cottage.images[0].url}
                                alt={cottage.name}
                                height={200}
                                sx={{ objectFit: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                            />
                            <Box p={2} display='flex' alignItems='end' justifyContent='space-between'>
                                <Box width='100%'>
                                    <Box width='100%' mb={2} display='flex' alignItems='center' justifyContent='space-between'>
                                        <Typography variant="h5" component="div">
                                            {selectedType ? cottage.name : cottage.type}
                                        </Typography>
                                        {selectedType ? <Chip size='small' label={cottage.type} /> : undefined}
                                    </Box>

                                    <Box display='flex' alignItems='end' justifyContent='space-between'>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: ₱{cottage.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Capacity: {cottage.capacity} guests
                                            </Typography>
                                        </Box>


                                        {selectedType ? <Button
                                            variant='contained'
                                            size='small'
                                            color={'success'}
                                            onClick={() => handleSelectCottage(cottage)}
                                        >
                                            Select
                                        </Button> : undefined}
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )) :

                    <Box key={cottageSelected.id} width='100%'>
                        <Box bgcolor="#fff" borderRadius={2} boxShadow={2}>
                            <CardMedia
                                component="img"
                                image={cottageSelected.images[0].url}
                                alt={cottageSelected.name}
                                height={200}
                                sx={{ objectFit: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                            />
                            <Box p={2} display='flex' alignItems='end' justifyContent='space-between'>
                                <Box width='100%'>
                                    <Box width='100%' mb={2} display='flex' alignItems='center' justifyContent='space-between'>
                                        <Typography variant="h5" component="div">
                                            {cottageSelected.name}
                                        </Typography>
                                        {selectedType ? <Chip size='small' label={cottageSelected.type} /> : undefined}
                                    </Box>

                                    <Box display='flex' alignItems='end' justifyContent='space-between'>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: ₱{cottageSelected.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Capacity: {cottageSelected.capacity} guests
                                            </Typography>
                                        </Box>

                                        <Button
                                            variant='contained'
                                            size='small'
                                            color={'error'}
                                            onClick={() => handleUnSelectCottage()}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                }
            </Box>
        </Box>
    )
}

export default AddOnsCottages




