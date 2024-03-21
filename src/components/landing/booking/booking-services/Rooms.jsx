import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import truncateText from '../../../../utility_functions/truncateText';
import RoleChip from "../../../employee/RoleChip";

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
                                <RoleChip role={room.status} />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {truncateText(room.description, 100)}
                            </Typography>
                            <Typography variant="body2" mt={1}>
                                Price: ₱{room.price} per night
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
};

export default Rooms;

