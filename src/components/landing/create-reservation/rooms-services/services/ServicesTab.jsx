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
        gap={1}
        alignItems='center'
        bgcolor={isMatch ? 'primary.main' : undefined}
        color={isMatch ? 'primary.contrastText' : 'primary.main'}
        border={1}
        borderColor='primary.main'
        borderRadius={1}
        onClick={() => onClick()}
        sx={{ cursor: 'pointer' }}
    >
        {icon}
        <Typography display={{ xs: 'none', sm: 'block' }}>{text}</Typography>
    </Box>
}

export default function ServicesTab({ handleNext, handleStep }) {
    const { tab, setTab } = useServices();
    const { accommodationType, customer } = useCustomer();
    const { selectedDate } = useDate();

    const handleChange = (newValue) => {
        setTab(newValue);
    };

    return (
        <Box pt={{ xs: 8 }} >
            <Box top={0} width='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: .5, flexDirection: { xs: 'column', md: 'row' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mb: { xs: 1, md: 0 } }}>
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

                <Box sx={{ mb: { xs: 1, lg: 0 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'GrayText' }} gap={2}>
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
            </Box>

            <Box>
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
        </Box>
    );
}
