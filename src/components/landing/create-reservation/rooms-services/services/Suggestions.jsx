import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useCustomer from "../../../../../hooks/reservation/useCustomer";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";
import ReservationRoom from "./ReservationRoom";

const Suggestions = ({ handleStep }) => {
    const { accommodationType, customer } = useCustomer();
    const [data, setData] = useState({ rooms: [], roomAddOns: [], cottages: [], cottageAddOns: [], });
    const [loading, setLoading] = useState(true);

    const { selectedDate } = useDate();
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`

    const getAvailableRooms = () => {
        basicGetCall({
            method: 'post',
            endpoint: 'api/reservations/available-suggestions',
            body: {
                checkIn: selectedDate.checkIn,
                checkOut: selectedDate.checkOut,
                totalGuests: customer.guests,
            },
            setDataDirectly: setData,
            setLoading,
        })
    }

    useEffect(() => {
        getAvailableRooms();
    }, []);


    return (
        <>
            {
                accommodationType === 'all' ? <>
                    <Accommodation
                        accom={data.rooms}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={'rooms'}
                        loading={loading}
                        children={
                            <Grid width={'100%'}>
                                {
                                    !loading ? data.rooms.map(room => (
                                        <ReservationRoom room={room} addOns={data.roomAddOns} key={room.id} />
                                    )) : undefined
                                }
                            </Grid>
                        }
                    />
                    <Accommodation
                        accom={data.cottages}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={'cottages'}
                        loading={loading}
                        children={
                            <Grid width={'100%'}>
                                {!loading ? data.cottages.map(cottage => (
                                    <ReservationCottage
                                        key={cottage.id}
                                        cottage={cottage}
                                        addOns={data.cottageAddOns}
                                    />
                                )) : undefined
                                }
                            </Grid>
                        }
                    />
                    <Accommodation
                        accom={data.others}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={'others'}
                        loading={loading}
                        children={
                            <Grid width={'100%'}>
                                {
                                    !loading ? data.others.map(other => (
                                        <ReservationCottage
                                            isOther={true}
                                            key={other.id}
                                            cottage={other}
                                        />
                                    )) : undefined
                                }
                            </Grid>
                        }
                    />
                </>
                    :
                    accommodationType === 'rooms' ? <Accommodation
                        accom={data.rooms}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={'rooms'}
                        loading={loading}
                        children={
                            <Grid width={'100%'}>
                                {
                                    !loading ? data.rooms.map(room => (
                                        <ReservationRoom room={room} addOns={data.roomAddOns} key={room.id} />
                                    )) : undefined
                                }
                            </Grid>
                        }
                    /> :
                        accommodationType === 'cottages' ?
                            <Accommodation
                                accom={data.cottages}
                                displayDateSelected={displayDateSelected}
                                handleStep={handleStep}
                                title={'cottages'}
                                loading={loading}
                                children={
                                    <Grid width={'100%'}>
                                        {!loading ? data.cottages.map(cottage => (
                                            <ReservationCottage
                                                key={cottage.id}
                                                cottage={cottage}
                                                addOns={data.cottageAddOns}
                                            />
                                        )) : undefined
                                        }
                                    </Grid>
                                }
                            /> :
                            <Accommodation
                                accom={data.others}
                                displayDateSelected={displayDateSelected}
                                handleStep={handleStep}
                                title={'others'}
                                loading={loading}
                                children={
                                    <Grid width={'100%'}>
                                        {
                                            !loading ? data.others.map(other => (
                                                <ReservationCottage
                                                    isOther={true}
                                                    key={other.id}
                                                    cottage={other}
                                                />
                                            )) : undefined
                                        }
                                    </Grid>
                                }
                            />
            }
        </>
    );
};

export default Suggestions;


const Accommodation = ({ accom, title, displayDateSelected, handleStep, children, loading }) => {
    return <>
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
            {loading ? `Searching ${title} suggestions...` : `${accom.length} Suggested ${title}`}
        </Typography>
        {
            loading ? <RoomLoading tiles={4} /> :
                accom.length === 0 ?
                    <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                        alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2}
                        my={1}>
                        <Typography>No {title} suggestions on {displayDateSelected}. Try selecting another
                            date.</Typography>
                        <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                            onClick={() => handleStep(1)}>re-select dates.</Button>
                    </Box>
                    :
                    children
        }
    </>
}