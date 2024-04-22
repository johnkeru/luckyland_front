// import React from 'react'
// import ReservationCottages from '../create-reservation/rooms-services/services/ReservationCottages'
// import ReservationRooms from '../create-reservation/rooms-services/services/ReservationRooms'
// import { Box, Typography } from '@mui/material'

// const Featured = ({ }) => {
//     return (
//         <Box>
//             <Box display="flex" flexDirection="column" mx="auto" py={5} >
//                 <Typography
//                     variant="h3"
//                     color='primary'
//                     sx={{
//                         fontWeight: 'bold',
//                         textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
//                         textAlign: 'center',
//                         mb: 7 // Adding marginBottom to sx
//                     }}
//                 >
//                     FEATURED ROOMS
//                 </Typography>
//                 <ReservationRooms inLanding endpoint={'api/landing/rooms'} />
//             </Box>

//             <Box display="flex" flexDirection="column" mx="auto" py={5} >
//                 <Typography
//                     variant="h3"
//                     color='primary'
//                     sx={{
//                         fontWeight: 'bold',
//                         textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
//                         textAlign: 'center',
//                         mb: 7 // Adding marginBottom to sx
//                     }}
//                 >
//                     FEATURED COTTAGES
//                 </Typography>
//                 <ReservationCottages inLanding endpoint={'api/landing/cottages'} />
//             </Box>
//         </Box>
//     )
// }

// export default Featured



import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import CustomCarousel from '../../../utility_components/CustomCarousel';
import FeaturedLoading from './features/FeaturedLoading';

const Test = () => {
    const ROOMS = 'Rooms';
    const COTTAGES = 'Cottages';

    const [tab, setTab] = useState(ROOMS);
    const [roomTabs, setRoomTabs] = useState([]);
    const [cottageTabs, setCottageTabs] = useState([]);
    const [selectedSubTab, setSelectedSubTab] = useState(null);

    const [rooms, setRooms] = useState([]);
    const [cottages, setCottages] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/accommodations',
            setLoading,
            setDataDirectly: (data) => {
                setRooms(data.rooms);
                setCottages(data.cottages);

                const roomTabs = data.rooms.map(room => room.type);
                const cottageTabs = data.cottages.map(cottage => cottage.type);
                setRoomTabs(roomTabs);
                setCottageTabs(cottageTabs);
            }
        })
    }, []);

    useEffect(() => {
        if (tab === ROOMS) {
            setSelectedSubTab(roomTabs.length > 0 ? roomTabs[0] : null);
        } else if (tab === COTTAGES) {
            setSelectedSubTab(cottageTabs.length > 0 ? cottageTabs[0] : null);
        }
    }, [tab, roomTabs, cottageTabs]);


    const handleSubTabClick = (type) => {
        setSelectedSubTab(type);
    };

    return (
        <Box py={5}>
            <Typography
                variant="h3"
                color='primary'
                sx={{
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    textAlign: 'center',
                }}
            >
                ACCOMMODATION
            </Typography>

            <Box display="flex" justifyContent="center" gap={1} mt={2} mb={1}>
                <Button variant='outlined'
                    size='small'
                    color={tab === ROOMS ? 'primary' : 'inherit'}
                    sx={{ borderRadius: '9999px', boxShadow: 0, fontSize: 16, px: 2.5, py: .5, fontWeight: 600, textTransform: 'capitalize' }}
                    onClick={() => setTab(ROOMS)}
                >
                    Rooms
                </Button>
                <Button variant='outlined'
                    size='small'
                    color={tab === COTTAGES ? 'primary' : 'inherit'}
                    sx={{ borderRadius: '9999px', boxShadow: 0, fontSize: 16, px: 2.5, py: .5, fontWeight: 600, textTransform: 'capitalize' }}
                    onClick={() => setTab(COTTAGES)}
                >
                    Cottages
                </Button>
            </Box>
            <Box display="flex" justifyContent="center" gap={1} mb={2}>
                {
                    tab === ROOMS ?
                        roomTabs.map(tab => (
                            <Button
                                key={tab}
                                variant='outlined'
                                size='small'
                                color={selectedSubTab === tab ? 'primary' : 'inherit'}
                                sx={{ borderRadius: '9999px', boxShadow: 0, fontSize: 14, px: 1.5, py: .3, fontWeight: 600, textTransform: 'capitalize' }}
                                onClick={() => handleSubTabClick(tab)}
                            >
                                {tab}
                            </Button>
                        ))
                        :
                        cottageTabs.map(tab => (
                            <Button
                                key={tab}
                                variant='outlined'
                                size='small'
                                color={selectedSubTab === tab ? 'primary' : 'inherit'}
                                sx={{ borderRadius: '9999px', boxShadow: 0, fontSize: 14, px: 1.5, py: .3, fontWeight: 600, textTransform: 'capitalize' }}
                                onClick={() => handleSubTabClick(tab)}
                            >
                                {tab}
                            </Button>
                        ))
                }
            </Box>

            {loading ?
                <FeaturedLoading />
                : tab === ROOMS ? rooms.filter(roomType => roomType.type === selectedSubTab).map(roomType => (
                    <Grid container spacing={3} key={roomType.id}>
                        <Grid item xs={12} lg={6}>
                            <CustomCarousel images={roomType.rooms[0].images} height={400} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Typography variant="h3" sx={{ mb: 2 }}>
                                {roomType.type} Room
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {roomType.description}
                            </Typography>

                            <Box display="flex" flexDirection="column" sx={{ mb: 2 }}>
                                {
                                    roomType.attributes.map(attr => (
                                        <Typography variant="body1" key={attr.id}>• {attr.name}</Typography>
                                    ))
                                }
                            </Box>

                            <Button variant="contained">
                                View All Accommodation
                            </Button>
                        </Grid>
                    </Grid>
                )) :
                    cottages.filter(cottage => cottage.type === selectedSubTab).map(cottageType => (
                        <Grid container spacing={3} key={cottageType.id}>
                            <Grid item xs={12} lg={6}>
                                <CustomCarousel images={cottageType.cottages[0].images} height={400} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="h3" sx={{ mb: 2 }}>
                                    {cottageType.type}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {cottageType.description}
                                </Typography>

                                <Box display="flex" flexDirection="column" sx={{ mb: 2 }}>
                                    {
                                        cottageType.attributes.map(attr => (
                                            <Typography variant="body1" key={attr.id}>• {attr.name}</Typography>
                                        ))
                                    }
                                </Box>

                                <Button variant="contained">
                                    View All Accommodation
                                </Button>
                            </Grid>
                        </Grid>
                    ))
            }
        </Box>
    );
};

export default Test;
