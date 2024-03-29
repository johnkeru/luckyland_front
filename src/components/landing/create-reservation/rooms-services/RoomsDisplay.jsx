import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import formatPrice from '../../../../utility_functions/formatPrice';
import RoleChip from "../../../employee/RoleChip";

import { BiSolidCabinet } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";

import RoomLoading from "../../../room-management/RoomLoading";
import { formatDateToMonth } from "../../../../utility_functions/formatTime";


const RoomsDisplay = ({ rooms, setRoomSelected, selectedDate, loading }) => {
    const displayDateSelected = `${formatDateToMonth(selectedDate.checkIn)} - ${formatDateToMonth(selectedDate.checkOut)} / ${selectedDate.duration} ${selectedDate.duration > 1 ? 'days' : 'day'}`
    return (
        <>
            {loading ? <RoomLoading /> :
                rooms.length === 0 ? <Typography>No rooms available on {displayDateSelected}. Try selecting another date.</Typography> :
                    rooms.map(room => (
                        <Card onClick={() => setRoomSelected(room)}
                            key={room.id}
                            sx={{
                                mb: 2,
                                position: 'relative',
                                border: '1px solid #ddd',
                                width: '32%',
                                cursor: 'pointer',
                                ":hover": { opacity: .95 }
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="140"
                                image={room.images[0].url}
                                alt={room.name}
                            />
                            <CardContent>
                                <Box display='flex' alignItems='center' justifyContent='space-between'>
                                    <Typography variant="h6" component="div">
                                        {room.name}
                                    </Typography>
                                    <RoleChip role={room.type} size="small" />
                                    {!room.active ? <Chip label='Unavailable' /> : undefined}
                                </Box>

                                {/* attributes */}
                                <Box my={2} display='flex' alignItems='center' gap={2} color='GrayText'>
                                    <Box display='flex' alignItems='center' gap={1}>
                                        <FaWifi />
                                        <Typography fontSize='14px'>Wi-Fi</Typography>
                                    </Box>
                                    <Box display='flex' alignItems='center' gap={.5} >
                                        <PiTelevisionSimpleFill />
                                        <Typography fontSize='14px'>TV</Typography>
                                    </Box>
                                    <Box display='flex' alignItems='center' gap={.5} >
                                        <MdBedroomChild />
                                        <Typography fontSize='14px'>Bed</Typography>
                                    </Box>
                                    <Box display='flex' alignItems='center' gap={.5}>
                                        <BiSolidCabinet />
                                        <Typography fontSize='14px'>Cabinet</Typography>
                                    </Box>
                                </Box>

                                <Box display='flex' justifyContent='space-between' alignItems='center' mt={2} title={room.capacity + ' capacity'}>
                                    <Typography variant="body2">
                                        ₱{formatPrice(room.price)} / night
                                    </Typography>
                                    <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                                        {room.type === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {room.capacity}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
            }
        </>
    );
};

export default RoomsDisplay;

