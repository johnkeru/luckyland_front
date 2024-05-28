import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { IoIosRemoveCircle } from "react-icons/io";
import useServices from '../../../../../../hooks/reservation/useServices';

const CottageRoomCardOverview = () => {
    const { selectedRooms, selectedCottages, selectedOthers, removeRoom, removeCottage, removeOther } = useServices();
    const [roomToRemove, setRoomToRemove] = React.useState(null);
    const [cottageToRemove, setCottageToRemove] = React.useState(null);
    const [otherToRemove, setOtherToRemove] = React.useState(null);

    const isEmpty = (selectedRooms.length === 0 && selectedCottages.length === 0 && selectedOthers.length === 0);

    const handleRemoveRoom = (room) => {
        setRoomToRemove(room);
        setTimeout(() => {
            removeRoom(room);
            setRoomToRemove(null);
        }, 300); // Adjust timing as needed for the transition duration
    };

    const handleRemoveCottage = (cottage) => {
        setCottageToRemove(cottage);
        setTimeout(() => {
            removeCottage(cottage);
            setCottageToRemove(null);
        }, 300); // Adjust timing as needed for the transition duration
    };

    const handleRemoveOther = (other) => {
        setOtherToRemove(other);
        setTimeout(() => {
            removeOther(other);
            setOtherToRemove(null);
        }, 300); // Adjust timing as needed for the transition duration
    };

    return (
        <Box mt={1}>
            {selectedRooms.length > 0 && (
                <Box borderBottom='1px solid #ddd' mb={.5}>
                    <Typography gutterBottom fontWeight={600}>
                        Rooms ({selectedRooms.length})
                    </Typography>
                    {selectedRooms.map((room) => (
                        <Box
                            key={room.id}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            sx={{
                                transition: '0.3s ease',
                                opacity: roomToRemove === room ? 0 : 1,
                            }}
                            mb={1}
                        >
                            <Box display='flex' gap={2}>
                                <img
                                    src={room.images[0].url}
                                    alt={room.name}
                                    className='image'
                                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                <div>
                                    <Typography>{room.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {room.type}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ₱{room.price}
                                    </Typography>
                                </div>
                            </Box>
                            <IconButton color='error' title='remove' onClick={() => handleRemoveRoom(room)}>
                                <IoIosRemoveCircle />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}

            {isEmpty && (
                <Typography my={2}>There are no accommodation selected yet.</Typography>
            )}

            {selectedCottages.length > 0 && (
                <Box borderBottom='1px solid #ddd' mb={.5}>
                    <Typography gutterBottom fontWeight={600}>
                        Cottages ({selectedCottages.length})
                    </Typography>
                    {selectedCottages.map((cottage) => (
                        <Box
                            key={cottage.id}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            sx={{
                                transition: '0.3s ease',
                                opacity: cottageToRemove === cottage ? 0 : 1,
                            }}
                            mb={1}
                        >
                            <Box display='flex' gap={2}>
                                <img
                                    src={cottage.images[0].url}
                                    alt={cottage.name}
                                    className='image'
                                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                <div>
                                    <Typography>{cottage.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {cottage.type}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ₱{cottage.price}
                                    </Typography>
                                </div>
                            </Box>
                            <IconButton color='error' title='remove' onClick={() => handleRemoveCottage(cottage)}>
                                <IoIosRemoveCircle />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}

            {selectedOthers.length > 0 && (
                <Box borderBottom='1px solid #ddd' mb={.5}>
                    <Typography gutterBottom fontWeight={600}>
                        Others ({selectedOthers.length})
                    </Typography>
                    {selectedOthers.map((other) => (
                        <Box
                            key={other.id}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            sx={{
                                transition: '0.3s ease',
                                opacity: otherToRemove === other ? 0 : 1,
                            }}
                            mb={1}
                        >
                            <Box display='flex' gap={2}>
                                <img
                                    src={other.images[0].url}
                                    alt={other.name}
                                    className='image'
                                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                                <div>
                                    <Typography>{other.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Type: {other.type}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ₱{other.price}
                                    </Typography>
                                </div>
                            </Box>
                            <IconButton color='error' title='remove' onClick={() => handleRemoveOther(other)}>
                                <IoIosRemoveCircle />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default CottageRoomCardOverview;
