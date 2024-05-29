import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useCustomer from "../../../../../hooks/reservation/useCustomer";
import useDate from '../../../../../hooks/reservation/useDate';
import basicGetCall from "../../../../../utility_functions/axiosCalls/basicGetCall";
import { formatDateToMonth } from "../../../../../utility_functions/formatTime";
import RoomLoading from "../../../../room-management/RoomLoading";
import ReservationCottage from "./ReservationCottage";
import ReservationRoom from "./ReservationRoom";

const ROOMS = 'rooms';
const COTTAGES = 'cottages';
const OTHERS = 'others';

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
                        title={ROOMS}
                        loading={loading}
                        Component={ReservationRoom}
                        data={data}
                    />
                    <Accommodation
                        accom={data.cottages}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={COTTAGES}
                        loading={loading}
                        Component={ReservationCottage}
                        data={data}
                    />
                    <Accommodation
                        accom={data.others}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={OTHERS}
                        loading={loading}
                        isOther={true}
                        Component={ReservationCottage}
                        data={data}
                    />
                </>
                    :
                    accommodationType === ROOMS ? <Accommodation
                        accom={data.rooms}
                        displayDateSelected={displayDateSelected}
                        handleStep={handleStep}
                        title={ROOMS}
                        loading={loading}
                        Component={ReservationRoom}
                        data={data}
                    /> :
                        accommodationType === COTTAGES ?
                            <Accommodation
                                accom={data.cottages}
                                displayDateSelected={displayDateSelected}
                                handleStep={handleStep}
                                title={COTTAGES}
                                loading={loading}
                                Component={ReservationCottage}
                                data={data}
                            /> :
                            <Accommodation
                                accom={data.others}
                                displayDateSelected={displayDateSelected}
                                handleStep={handleStep}
                                title={OTHERS}
                                loading={loading}
                                isOther={true}
                                Component={ReservationCottage}
                                data={data}
                            />
            }
        </>
    );
};

export default Suggestions;


const Accommodation = ({ data, accom, title, displayDateSelected, handleStep, Component, isOther, loading }) => {

    const [selectedType, setSelectedType] = useState('');
    const accomTypes = [...new Set(loading ? [] : accom.map(acc => acc.type))];

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const filteredAccom = selectedType ? accom.filter(acc => acc.type === selectedType) : accom;

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
            {loading ? `Searching ${title} suggestions...` : `${filteredAccom.length} Suggested ${title}`}
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
                    <Grid width={'100%'}>
                        <Box display='flex' justifyContent='center' gap={1} flexWrap='wrap' alignItems='center' my={2}>
                            <Button
                                variant={selectedType === '' ? 'contained' : 'outlined'}
                                onClick={() => handleTypeChange('')}
                            >
                                All
                            </Button>
                            {accomTypes.map((type) => (
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
                            filteredAccom.map(acc => (
                                <Component room={acc} cottage={acc} isOther={isOther} addOns={data.roomAddOns || data.cottageAddOns} key={acc.id} />
                            ))
                        }
                    </Grid>
        }
    </>
}





