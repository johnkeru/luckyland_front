import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import useBookingSummaryReservation from '../../../../hooks/useBookingSummaryReservation';
import basicGetCall from '../../../../utility_functions/axiosCalls/basicGetCall';
import RoomDetails from './RoomDetails';
import RoomsDisplay from './RoomsDisplay';

const SelectingRoom = ({ handleNext }) => {
    const { roomsDetail, selectedDate, setRoomsDetail, roomSelected, setRoomSelected, setReselectRoom, setRoomLoading, roomLoading } = useBookingSummaryReservation();

    const getAvailableRooms = (loadingOnce) => {
        basicGetCall({
            method: 'post',
            endpoint: 'api/reservations/getAvailableRooms',
            body: {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
            },
            setDataDirectly: setRoomsDetail,
            setLoading: loadingOnce ? setRoomLoading : undefined
        })
    }

    useEffect(() => {
        getAvailableRooms(true);
    }, []);

    // console.log(roomsDetail);
    // return;

    return (
        <>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                {(!roomSelected) ?
                    <RoomsDisplay
                        setRoomSelected={setRoomSelected}
                        loading={roomLoading}
                        selectedDate={selectedDate}
                        rooms={roomsDetail?.rooms}
                    /> :
                    <RoomDetails
                        setReselectRoom={setReselectRoom}
                        room={roomSelected}
                        amenities={roomsDetail.amenities}
                        handleNext={handleNext}
                    />}
            </Box>
        </>
    )
}

export default SelectingRoom