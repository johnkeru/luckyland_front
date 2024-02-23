import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosCall from '../../../../utility_functions/axiosCall';

const Rooms = ({ setRoom }) => {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosCall({
            endpoint: 'api/reservation/rooms',
            onSuccess: setRooms,
            setLoading
        })
    }, [])

    return (
        <>
            {loading ? <Grid sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1">Finding rooms for the selected dates...</Typography>
            </Grid> :
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
                                Price: ${room.price} per night
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
};

export default Rooms;

