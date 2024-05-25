import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MdOutlineBedroomParent, MdOutlineRecommend } from "react-icons/md";
import useCustomer from '../../../../../hooks/reservation/useCustomer';
import useDate from '../../../../../hooks/reservation/useDate';
import useServices from '../../../../../hooks/reservation/useServices';
import { primary } from '../../../../../styles/globalStyle';
import { formatDateRange } from '../../../../../utility_functions/formatTime';
import scrollTop from '../../../../../utility_functions/scrollTop';
import ReservationCottages from './ReservationCottages';
import ReservationRooms from './ReservationRooms';
import Suggestions from './Suggestions';
import PopoverOverview from './overview/PopoverOverview';
import { FaUmbrellaBeach } from 'react-icons/fa';

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
        alignItems='center'
        p={1}
        borderRadius={5}
        onClick={onClick}
        sx={{
            cursor: 'pointer',
            bgcolor: !isMatch ? primary.contrastText : primary.main,
            color: !isMatch ? primary.main : primary.contrastText,
            border: !isMatch ? `2px solid ${primary.light}` : `2px solid ${primary.contrastText}`,
            boxShadow: !isMatch ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                // bgcolor: primary.light,
                // color: primary.contrastText,
                border: `2px solid ${primary.main}`,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            },
        }}
    >
        <Box display='flex' alignItems='center' justifyContent='center' gap={0.3} mr={0.5}>
            {icon}
        </Box>
        <Typography variant="body2">{text}</Typography>
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
            <Box
                position='sticky'
                top={0}
                p={1.5}
                zIndex={5}
                bgcolor='#fff'
                color='#333' // Adjusted text color for better contrast
                width='100%'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', lg: 'row' },
                    borderBottomRightRadius: 7,
                    borderBottomLeftRadius: 7,
                    boxShadow: '0px 2px 2px rgba(3, 3, 3, 0.15)' // Added shadow for depth
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                    <PopoverOverview handleNext={handleNext} />
                    <Box display='flex' alignItems='center' gap={1} title={`${customer.guests} ${customer.guests > 1 ? 'guests' : 'guest'}`}>
                        <Typography display='flex' alignItems='center' gap={1}>
                            Guests: <b>{customer.guests}</b>
                        </Typography>
                    </Box>
                    <Typography px={1}>|</Typography> {/* Using Typography component for the "|" */}
                    <Box display='flex' alignItems='center' gap={1}>
                        <Typography >
                            {accommodationType === 'both' ? '' : accommodationType === 'rooms' ? 'Rooms ' : 'Cottages '}
                            Available for <b>{formatDateRange(selectedDate.checkIn, selectedDate.checkOut)}</b>
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mt: { xs: .5, sm: 0 }, }}>
                    <CustomTab icon={<MdOutlineRecommend size={20} />} text='Suggestions' onClick={() => handleChange(0)}
                        isMatch={tab === 0} />
                    {accommodationType === 'both' && (
                        <>
                            <CustomTab icon={<MdOutlineBedroomParent size={20} />} text='Rooms'
                                onClick={() => handleChange(1)} isMatch={tab === 1} />
                            <CustomTab icon={<FaUmbrellaBeach size={20} />} text='Cottages'
                                onClick={() => handleChange(2)} isMatch={tab === 2} />
                        </>
                    )}
                    {accommodationType === 'rooms' && (
                        <CustomTab icon={<MdOutlineBedroomParent size={20} />} text='Rooms'
                            onClick={() => handleChange(1)} isMatch={tab === 1} />
                    )}
                    {accommodationType === 'cottages' && (
                        <CustomTab icon={<FaUmbrellaBeach size={20} />} text='Cottages' onClick={() => handleChange(1)}
                            isMatch={tab === 1} />
                    )}
                </Box>
            </Box>

            <Box px={{ xs: 0, sm: 1 }}>
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
