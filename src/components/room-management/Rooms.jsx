import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import formatPrice from '../../utility_functions/formatPrice';
import RoleChip from "../employee/RoleChip";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";

import { BiSolidCabinet } from "react-icons/bi";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import RoomLoading from "./RoomLoading";
import RoomDetails from "./RoomDetails";


const Rooms = ({ rooms, loading, onSuccess }) => {

    return (
        <>
            {loading ? <RoomLoading /> :
                rooms.map(room => (
                    <Card key={room.id} sx={{ mb: 2, position: 'relative', border: '1px solid #ddd', width: '24%', cursor: 'pointer', ":hover": { opacity: .95 } }}>
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
                            <Box my={1} display='flex' alignItems='center' gap={2} color='GrayText'>
                                <FaWifi />
                                <PiTelevisionSimpleFill />
                                <MdBedroomChild />
                                <BiSolidCabinet />
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

                        <RoomDetails
                            room={room}
                            onSuccess={onSuccess}
                            button={
                                <Button sx={{ position: 'absolute', width: "100%", height: "100%", right: 0, top: 0 }} ></Button>
                            }
                        />
                    </Card>
                ))
            }
        </>
    );
};

export default Rooms;

