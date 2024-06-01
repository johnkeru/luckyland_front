import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Room from '../components/room-management/Room';
import RoomLoading from '../components/room-management/RoomLoading';
import RoomTypeTable from '../components/room-management/RoomTypeTable';
import AddRoom from '../components/room-management/modal/AddRoom';
import useTypes from '../hooks/rooms/useTypes';
import useUser from '../hooks/useUser';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import { isAdmin, isHouseKeeping } from '../utility_functions/roles';

const RoomManagementPage = ({ isOther }) => {
    const { user } = useUser();
    const isAllow = isAdmin(user.roles) || isHouseKeeping(user.roles);

    const [cottages, setCottages] = useState(null);
    const [cottageTypes, setCottageTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setTypes } = useTypes();

    const getAllCottages = (loadingOnce) => {
        basicGetCall({
            endpoint: isOther ? 'api/others' : 'api/cottages',
            setDataDirectly: setCottages,
            setLoading: loadingOnce ? setLoading : undefined
        });
    }
    useEffect(() => {
        getAllCottages(true);
        getTypes(true);
    }, [isOther]);

    const getTypes = (loadingOnce) => {
        basicGetCall({
            endpoint: isOther ? 'api/others/types' : 'api/cottages/types',
            setDataDirectly: (data) => {
                setTypes(data)
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
                    {isOther ? 'Other' : 'Cottage'} Module
                </Typography>
                {isAllow ?
                    <AddRoom
                        isCottage
                        isOther={isOther}
                        onSuccess={onSuccess}
                        button={
                            <Button variant='contained' color='success' startIcon={<IoMdAdd />} >Add {isOther ? 'Other' : 'Cottage'}</Button>
                        }
                    /> : undefined}
            </Box>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5} display='flex' flexDirection='column' alignItems='start' gap={2}>
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>{isOther ? 'Other' : 'Cottage'} Variants</Typography>
                        <Typography>(Edit {isOther ? 'others' : 'cottages'} at once by type)</Typography>
                    </Box>
                </Box>

                {
                    loading ?
                        <Skeleton animation="wave" variant="rectangular" width="100%" height={100} /> :
                        <RoomTypeTable isAllow={isAllow} onSuccess={onSuccess} roomTypes={cottageTypes} isCottage
                            isOther={isOther} />
                }
            </Box>

            <Box bgcolor='background.white' borderRadius={2} p={2} mb={1.5}>
                <Box display='flex' alignItems='center' justifyContent='space-between' mb={1.5}>
                    <Box display='flex' alignItems='center' gap={2}>
                        <Typography variant='h5' fontWeight={600}>{loading ? 0 : cottages.filter(cottage => cottage.active).length} Available {isOther ? 'Others' : 'Cottages'}</Typography>
                        <Typography>(These {isOther ? 'others' : 'cottages'} will be displayed in the reservations section.)</Typography>
                    </Box>
                </Box>
                {
                    loading ? <RoomLoading isRoomManagement /> :
                        cottages.filter(cottage => cottage.active).map(cottage => <Room isAllow={isAllow} isCottage
                            isOther={isOther} key={cottage.id} onSuccess={onSuccess} room={cottage} />)
                }
            </Box>

            <Box mb={1.5} bgcolor='background.white' borderRadius={2} p={2}>
                <Box display='flex' alignItems='center' gap={2} mb={1.5}>
                    <Typography variant='h5' fontWeight={600}>{loading ? 0 : cottages.filter(cottage => !cottage.active).length} Unavailable {isOther ? 'Others' : 'Cottages'}</Typography>
                    <Typography>(These {isOther ? 'others' : 'cottages'} will not be displayed in the reservations section as they are currently unavailable.)</Typography>
                </Box>
                {
                    loading ? <RoomLoading isRoomManagement /> :
                        cottages.filter(cottage => !cottage.active).map(cottage => <Room isAllow={isAllow} isCottage
                            isOther={isOther} key={cottage.id} onSuccess={onSuccess} room={cottage} />)
                }
            </Box>

        </Grid>
    )
}

export default RoomManagementPage