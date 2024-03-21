import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import truncateText from '../../../../utility_functions/truncateText';
import formatPrice from '../../../../utility_functions/formatPrice';
import RoleChip from "../../../employee/RoleChip";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";

const Rooms = ({ setRoom, rooms }) => {

    return (
        <>
            {
                rooms.map(room => (
                    <Card key={room.id} sx={{ width: '32%', cursor: 'pointer', ":hover": { opacity: .95 } }} onClick={() => setRoom(room)}>
                        <CardMedia
                            component="img"
                            height="240"
                            image={room.images[0].url}
                            alt={room.name}
                        />
                        <CardContent>
                            <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
                                <Typography variant="h5" component="div">
                                    {room.name}
                                </Typography>
                                <RoleChip role={room.status} size="small" />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {truncateText(room.description, 100)}
                            </Typography>
                            <Box display='flex' justifyContent='space-between' alignItems='center' mt={1} title={room.capacity + ' capacity'}>
                                <Typography variant="body2">
                                    ₱{formatPrice(room.price)} / night
                                </Typography>
                                <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                                    {room.status === 'Family' ? <FaPeopleRoof /> : <IoPeopleSharp />} {room.capacity}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
};

export default Rooms;

