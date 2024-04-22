import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Room from '../components/room-management/Room';
import RoomLoading from '../components/room-management/RoomLoading';
import AddRoom from '../components/room-management/modal/AddRoom';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import RoomTypeTable from '../components/room-management/RoomTypeTable';
import AddAndEditRoomType from '../components/room-management/modal/AddAndEditRoomType';
import useTypes from '../hooks/rooms/useTypes';
import useUser from '../hooks/useUser';
import { isAdmin, isHouseKeeping } from '../utility_functions/roles';

const RoomManagementPage = () => {
    const { user } = useUser();
    const isAllow = isAdmin(user.roles) || isHouseKeeping(user.roles);

    const [cottages, setCottages] = useState(null);
    const [cottageTypes, setCottageTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setTypes } = useTypes();

    const getAllCottages = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/cottages',
            setDataDirectly: setCottages,
            setLoading: loadingOnce ? setLoading : undefined
        });
    }
    useEffect(() => {
        getAllCottages(true);
        getTypes(true);
    }, []);

    const getTypes = (loadingOnce) => {
        basicGetCall({
            endpoint: 'api/cottages/types',
            setDataDirectly: (data) => {
                setTypes(data.map(typ => ({ type: typ.type, id: typ.id })))
                setCottageTypes(data);
            },
            setLoading: loadingOnce ? setLoading : undefined
        });
    }

    const onSuccess = () => {
        getAllCottages();
        getTypes();
    }
    return (
        <Grid>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5} display='flex' ml='auto' gap={2} alignItems='center'>
                <Typography variant='h5' fontWeight={700}>
                    Cottage Module
                </Typography>
                {isAllow ? <Box display='flex' ml='auto' gap={2} justifyContent='end'>
                    <AddAndEditRoomType
                        isCottage
                        onSuccess={onSuccess}
                        button={
                            <Button variant='contained' startIcon={<IoMdAdd />} >Create new type of cottage</Button>
                        }
                    />
                    <AddRoom
                        isCottage
                        onSuccess={onSuccess}
                        button={
                            <Button variant='contained' color='success' startIcon={<IoMdAdd />} >Add Cottage</Button>
                        }
                    />
                </Box> : undefined}
            </Box>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5} display='flex' flexDirection='column' alignItems='start' gap={2}>
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>Cottage Variants</Typography>
                        <Typography>(Edit cottages at once by type)</Typography>
                    </Box>
                </Box>

                {
                    loading ?
                        <Skeleton animation="wave" variant="rectangular" width="100%" height={100} /> :
                        <RoomTypeTable isAllow={isAllow} onSuccess={onSuccess} roomTypes={cottageTypes} isCottage />
                }
            </Box>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5}>
                <Box display='flex' alignItems='center' justifyContent='space-between' mb={1.5}>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>{loading ? 0 : cottages.filter(cottage => cottage.active).length} Available Cottages</Typography>
                        <Typography>(These cottages will be displayed in the reservations section.)</Typography>
                    </Box>
                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-evenly' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            cottages.filter(cottage => cottage.active).map(cottage => <Room isAllow={isAllow} isCottage key={cottage.id} onSuccess={onSuccess} room={cottage} />)
                    }
                </Box>
            </Box>

            <Box mb={1.5} bgcolor='background.white' borderRadius={2} p={2}>
                <Box display='flex' alignItems='center' gap={2} mb={1.5}>
                    <Typography variant='h5' fontWeight={600}>{loading ? 0 : cottages.filter(cottage => !cottage.active).length} Unavailable Cottages</Typography>
                    <Typography>(These cottages will not be displayed in the reservations section as they are currently unavailable.)</Typography>

                </Box>
                <Box display='flex' flexWrap='wrap' justifyContent='space-evenly' width='100%' gap={2}>
                    {
                        loading ? <RoomLoading isRoomManagement /> :
                            cottages.filter(cottage => !cottage.active).map(cottage => <Room isAllow={isAllow} isCottage key={cottage.id} onSuccess={onSuccess} room={cottage} />)
                    }
                </Box>
            </Box>

        </Grid>
    )
}

export default RoomManagementPage