import * as React from 'react';
import Typography from '@mui/material/Typography';
import useServices from '../../../../../../hooks/reservation/useServices';
import { Box, Divider, IconButton } from '@mui/material';
import { IoIosRemoveCircle } from "react-icons/io";


const CottageRoomCardOverview = () => {
    const { selectedRooms, selectedCottages, removeRoom, removeCottage } = useServices();
    return (
        <Box>
            {selectedRooms.length !== 0 ? <Box>
                <Typography gutterBottom fontWeight={600}>
                    Rooms ({selectedRooms.length})
                </Typography>
                {selectedRooms.map((room) => (
                    <Box key={room.id} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <img src={room.images[0].url} alt={room.name} style={{ width: '100px', height: '70px' }} />
                            <Box>
                                <Typography>
                                    {room.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {room.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${room.price}
                                </Typography>
                            </Box>
                        </Box>

                        <IconButton color='error' title='remove' onClick={() => removeRoom(room)} sx={{ opacity: .7, ":hover": { opacity: .9 } }}>
                            <IoIosRemoveCircle />
                        </IconButton>
                    </Box>
                ))}
            </Box> : undefined}

            {
                (selectedCottages.length !== 0 && selectedRooms.length !== 0) ? <Divider sx={{ my: 1, mt: 2 }} /> : undefined
            }

            {
                selectedCottages.length === 0 && selectedRooms.length === 0 ? <Typography my={2}>There's no rooms or cottages selected yet.</Typography> : undefined
            }

            {selectedCottages.length !== 0 ? <Box>
                <Typography gutterBottom fontWeight={600}>
                    Cottages ({selectedCottages.length})
                </Typography>
                {selectedCottages.map((cottage) => (
                    <Box key={cottage.id} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <img src={cottage.images[0].url} alt={cottage.name} style={{ width: '100px', height: '70px' }} />
                            <Box>
                                <Typography gutterBottom>
                                    {cottage.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Type: {cottage.type}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${cottage.price}
                                </Typography>
                            </Box>
                        </Box>

                        <IconButton color='error' title='remove' onClick={() => removeCottage(cottage)}>
                            <IoIosRemoveCircle />
                        </IconButton>
                    </Box>
                ))}
            </Box> : undefined}
        </Box>
    );
};

export default CottageRoomCardOverview;
