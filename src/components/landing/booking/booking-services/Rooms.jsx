import { Card, CardContent, CardMedia, Typography } from "@mui/material";

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
                            <Typography gutterBottom variant="h5" component="div">
                                {room.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {room.description}
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

