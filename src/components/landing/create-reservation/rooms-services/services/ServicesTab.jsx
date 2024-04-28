import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { FaPeopleRoof } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdOutlineBedroomParent, MdOutlineCottage, MdOutlineRecommend } from "react-icons/md";
import useCustomer from '../../../../../hooks/reservation/useCustomer';
import useDate from '../../../../../hooks/reservation/useDate';
import useServices from '../../../../../hooks/reservation/useServices';
import { formatDateRange } from '../../../../../utility_functions/formatTime';
import ReservationCottages from './ReservationCottages';
import ReservationRooms from './ReservationRooms';
import Suggestions from './Suggestions';
import PopoverOverview from './overview/PopoverOverview';
import scrollTop from '../../../../../utility_functions/scrollTop';


function CustomTabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const CustomTab = ({ icon, text, isMatch, onClick }) => {
    return <Box
        display='flex'
        px={1}
        py={.3}
        gap={.3}
        alignItems='center'
        borderColor='primary.main'
        onClick={() => onClick()}
        sx={{
            cursor: 'pointer',
            bgcolor: isMatch ? 'primary.contrastText' : 'primary.main',
            color: isMatch ? 'primary.main' : 'primary.contrastText',
            border: isMatch ? '2px solid orange' : '2px solid white'
        }}
    >
        <Box display={{ xs: 'none', sm: 'flex' }} alignItems='center' justifyContent='center' m='auto'>
            {icon}
        </Box>
        <Typography>{text}</Typography>
    </Box>
}

export default function ServicesTab({ handleNext, handleStep }) {
    const { tab, setTab } = useServices();
    const { accommodationType, customer } = useCustomer();
    const { selectedDate } = useDate();

    const handleChange = (newValue) => {
        setTab(newValue);
        scrollTop();
    };

    return (
        <Box position='relative'>
            <Box position='sticky' top={0} p={1} zIndex={5} bgcolor='primary.dark' color='primary.contrastText' width='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', lg: 'row' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }} gap={{ xs: .5, sm: 1 }}>
                    <Box display='flex' alignItems='center' gap={1}>
                        <PopoverOverview handleNext={handleNext} />
                    </Box>
                    |
                    <Box display='flex' alignItems='center' gap={1} title={`${customer.guests} ${customer.guests > 1 ? 'guests' : 'guest'}`}>
                        <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                            {customer.guests > 4 ? <FaPeopleRoof /> : <IoPeopleSharp />} {customer.guests}
                        </Typography>
                    </Box>
                    |
                    <Box display='flex' alignItems='center' gap={1}>
                        <Typography variant="body2" display={{ xs: 'none', md: 'block' }}>
                            {accommodationType === 'both' ? 'Rooms & Cottages ' : accommodationType === 'rooms' ? 'Rooms ' : 'Cottages '}
                            available for <b>{formatDateRange(selectedDate.checkIn, selectedDate.checkOut)}</b>
                        </Typography>

                        <Typography variant="body2" display={{ xs: 'block', md: 'none' }}>
                            <b>{formatDateRange(selectedDate.checkIn, selectedDate.checkOut)}</b>
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mt: { xs: .5, sm: 0 } }}>
                    <CustomTab icon={<MdOutlineRecommend size={20} />} text='Suggestions' onClick={() => handleChange(0)} isMatch={tab === 0} />
                    {accommodationType === 'both' && (
                        <>
                            <CustomTab icon={<MdOutlineBedroomParent size={20} />} text='Rooms' onClick={() => handleChange(1)} isMatch={tab === 1} />
                            <CustomTab icon={<MdOutlineCottage size={20} />} text='Cottages' onClick={() => handleChange(2)} isMatch={tab === 2} />
                        </>
                    )}
                    {accommodationType === 'rooms' && (
                        <CustomTab icon={<MdOutlineBedroomParent size={20} />} text='Rooms' onClick={() => handleChange(1)} isMatch={tab === 1} />
                    )}
                    {accommodationType === 'cottages' && (
                        <CustomTab icon={<MdOutlineCottage size={20} />} text='Cottages' onClick={() => handleChange(1)} isMatch={tab === 1} />
                    )}
                </Box>
            </Box>

            <Box mt={2}>
                <CustomTabPanel value={tab} index={0}>
                    <Suggestions handleStep={handleStep} />
                </CustomTabPanel>
                {accommodationType === 'both' && (
                    <>
                        <CustomTabPanel value={tab} index={1}>
                            <ReservationRooms handleStep={handleStep} />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={2}>
                            <ReservationCottages handleStep={handleStep} />
                        </CustomTabPanel>
                    </>
                )}
                {accommodationType === 'rooms' && (
                    <CustomTabPanel value={tab} index={1}>
                        <ReservationRooms handleStep={handleStep} />
                    </CustomTabPanel>
                )}
                {accommodationType === 'cottages' && (
                    <CustomTabPanel value={tab} index={1}>
                        <ReservationCottages handleStep={handleStep} />
                    </CustomTabPanel>
                )}
            </Box>
        </Box >
    );
}
