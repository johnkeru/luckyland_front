import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationRoom from "./ReservationRoom";

const ReservationRooms = ({ handleStep, defaultValue }) => {
    const [roomsAndAddOns, setRoomsAndAddOns] = useState({ rooms: [], addOns: [] });
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableRooms = () => {
        basicGetCall({
            method: 'post',
            endpoint: 'api/reservations/available-rooms',
            body: {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
            },
            setDataDirectly: setRoomsAndAddOns,
            setLoading
        })
    }

    const setDefaultValue = (data) => {
        setRoomsAndAddOns(data.roomsAndAddOns);
        setLoading(data.loading);
    }

    useEffect(() => {
        !defaultValue ? getAvailableRooms() : setDefaultValue(defaultValue);
        return () => setSelectedType('');
    }, [defaultValue]);

    const roomTypes = [...new Set(loading ? [] : roomsAndAddOns.rooms.map(room => room.type))];

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const filteredRooms = selectedType ? roomsAndAddOns.rooms.filter(room => room.type === selectedType) : roomsAndAddOns.rooms;

    return (
        <>
            <Typography
                variant={'h4'}
                color={'#333'}
                py={2}
                px={{ xs: 2, sm: 0 }}
                sx={{
                    width: '100%',
                    color: 'primary.main',
                    textAlign: 'center', // Center-align the text
                    fontWeight: 'bold', // Make the text bold
                    fontFamily: 'Georgia, serif', // Choose a luxurious serif font
                    textTransform: 'uppercase', // Uppercase text
                    letterSpacing: '2px', // Spacing between letters
                    fontSize: '2.5rem', // Increase font size for a luxurious feel
                    lineHeight: '1.2', // Adjust line height for readability
                    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)', // Add subtle text shadow
                }}
            >
                {loading ? 'Searching rooms available...' : `${filteredRooms.length} Rooms Available`}
            </Typography>
            {
                loading ? <RoomLoading tiles={5} /> :
                    roomsAndAddOns.rooms.length === 0 ?
                        <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }} alignItems='center' gap={2} p={2} borderRadius={2} my={1}>
                            <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography>
                            <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }} onClick={() => handleStep(1)}>re-select dates.</Button>
                        </Box>
                        :
                        <Grid width={'100%'}>
                            <Box display='flex' justifyContent='center' gap={1} flexWrap='wrap' alignItems='center' my={2}>
                                <Button
                                    variant={selectedType === '' ? 'contained' : 'outlined'}
                                    onClick={() => handleTypeChange('')}
                                >
                                    All
                                </Button>
                                {roomTypes.map((type) => (
                                    <Button
                                        key={type}
                                        variant={selectedType === type ? 'contained' : 'outlined'}
                                        onClick={() => handleTypeChange(type)}
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </Box>
                            {
                                filteredRooms.map(room => (
                                    <ReservationRoom
                                        room={room}
                                        addOns={roomsAndAddOns.addOns}
                                        key={room.id}
                                    />
                                ))
                            }
                        </Grid>
            }
        </>
    );
};

export default ReservationRooms;
