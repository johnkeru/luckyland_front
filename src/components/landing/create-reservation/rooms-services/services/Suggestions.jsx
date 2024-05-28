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
                        {loading ? 'Searching rooms suggestions...' : `${data.rooms.length} Suggested Rooms`}
                    </Typography>
                    {
                        loading ? <RoomLoading tiles={4} /> :
                            data.rooms.length === 0 ?
                                <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                                    alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2}
                                    my={1}>
                                    <Typography>No rooms suggestions on {displayDateSelected}. Try selecting another
                                        date.</Typography>
                                    <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                                        onClick={() => handleStep(1)}>re-select dates.</Button>
                                </Box>
                                :
                                <Grid width={'100%'}>
                                    {data.rooms.map(room => (
                                        <ReservationRoom room={room} addOns={data.roomAddOns} key={room.id} />
                                    ))}
                                </Grid>
                    }

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
                        {loading ? 'Searching cottages suggestions...' : `${data.cottages.length} Suggested Cottages`}
                    </Typography>
                    {
                        loading ? <RoomLoading tiles={4} /> :
                            data.cottages.length === 0 ?
                                <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                                    alignItems='center' gap={2} bgcolor='background.paper2' p={2} borderRadius={2}
                                    my={1}>
                                    <Typography>No cottages suggestions on {displayDateSelected}. Try selecting
                                        another date.</Typography>
                                    <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                                        onClick={() => handleStep(1)}>re-select dates.</Button>
                                </Box>
                                :
                                <Grid width={'100%'}>
                                    {data.cottages.map(cottage => (
                                        <ReservationCottage
                                            key={cottage.id}
                                            cottage={cottage}
                                            addOns={data.cottageAddOns}
                                        />
                                    ))}
                                </Grid>

                    }

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
                        {loading ? 'Searching others suggestions...' : `${data.others.length} Suggested others`}
                    </Typography>
                    {
                        loading ? <RoomLoading tiles={4} /> :
                            data.others.length === 0 ?
                                <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                                    alignItems='center' gap={2} bgcolor='background.paper2' p={2}
                                    borderRadius={2} my={1}>
                                    <Typography>No others suggestions on {displayDateSelected}. Try selecting
                                        another date.</Typography>
                                    <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                                        onClick={() => handleStep(1)}>re-select dates.</Button>
                                </Box>
                                :
                                <Grid width={'100%'}>
                                    {
                                        data.others.map(other => (
                                            <ReservationCottage
                                                isOther={true}
                                                key={other.id}
                                                cottage={other}
                                            />
                                        ))
                                    }
                                </Grid>
                    }
                </>
                    :
                    accommodationType === 'rooms' ? <>
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
                            {loading ? 'Searching rooms suggestions...' : `${data.rooms.length} Suggested Rooms`}
                        </Typography>
                        {
                            loading ? <RoomLoading tiles={4} /> :
                                data.rooms.length === 0 ?
                                    <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                                        alignItems='center' gap={2} bgcolor='background.paper2' p={2}
                                        borderRadius={2} my={1}>
                                        <Typography>No rooms suggestions on {displayDateSelected}. Try selecting
                                            another date.</Typography>
                                        <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                                            onClick={() => handleStep(1)}>re-select dates.</Button>
                                    </Box>
                                    :
                                    <Grid width={'100%'}>
                                        {
                                            data.rooms.map(room => (
                                                <ReservationRoom room={room} addOns={data.roomAddOns} key={room.id} />
                                            ))
                                        }
                                    </Grid>
                        }
                    </> :
                        accommodationType === 'cottages' ?
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
                                    {loading ? 'Searching cottages suggestions...' : `${data.cottages.length} Suggested Cottages`}
                                </Typography>
                                {
                                    loading ? <RoomLoading tiles={4} /> :
                                        data.cottages.length === 0 ?
                                            <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                                                alignItems='center' gap={2} bgcolor='background.paper2' p={2}
                                                borderRadius={2} my={1}>
                                                <Typography>No cottages suggestions on {displayDateSelected}. Try selecting
                                                    another date.</Typography>
                                                <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                                                    onClick={() => handleStep(1)}>re-select dates.</Button>
                                            </Box>
                                            :
                                            <Grid width={'100%'}>
                                                {
                                                    data.cottages.map(cottage => (
                                                        <ReservationCottage
                                                            key={cottage.id}
                                                            cottage={cottage}
                                                            addOns={data.cottageAddOns}
                                                        />
                                                    ))
                                                }
                                            </Grid>
                                }
                            </> :
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
                                    {loading ? 'Searching others suggestions...' : `${data.others.length} Suggested others`}
                                </Typography>
                                {
                                    loading ? <RoomLoading tiles={4} /> :
                                        data.others.length === 0 ?
                                            <Box width='100%' display='flex' flexDirection={{ xs: 'column', md: 'row' }}
                                                alignItems='center' gap={2} bgcolor='background.paper2' p={2}
                                                borderRadius={2} my={1}>
                                                <Typography>No others suggestions on {displayDateSelected}. Try selecting
                                                    another date.</Typography>
                                                <Button size="small" sx={{ width: { xs: '100%', md: 'fit-content' } }}
                                                    onClick={() => handleStep(1)}>re-select dates.</Button>
                                            </Box>
                                            :
                                            <Grid width={'100%'}>
                                                {
                                                    data.others.map(other => (
                                                        <ReservationCottage
                                                            key={other.id}
                                                            isOther={true}
                                                            cottage={other}
                                                        />
                                                    ))
                                                }
                                            </Grid>
                                }
                            </>
            }
        </>
    );
};

export default Suggestions;

