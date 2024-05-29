import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { BsStars } from "react-icons/bs";
import { FaUmbrellaBeach } from 'react-icons/fa';
import { MdOutlineBedroomParent, MdOutlineOtherHouses } from "react-icons/md";
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
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";

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
            border: `2px solid ${primary.light}`,
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
        <Box display='flex' alignItems='center' justifyContent='center' gap={0.3} mr={{ xs: isMatch ? .5 : 0, sm: 0.5 }}>
            {icon}
        </Box>
        <Typography variant="body2" sx={{ display: { xs: isMatch ? 'block' : 'none', sm: 'block' } }}>{text}</Typography>
    </Box>
}

export default function ServicesTab({ handleNext, handleStep }) {
    const { tab, setTab, selectedCottages, selectedRooms, selectedOthers } = useServices();
    const display = selectedRooms.length !== 0 || selectedCottages.length !== 0 || selectedOthers.length !== 0
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
                mt={.5}
                zIndex={5}
                bgcolor='#fff'
                color='grayText' // Adjusted text color for better contrast
                width='100%'
                borderRadius={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    flexDirection: { xs: 'column', md: 'row' },
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Added shadow for depth
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, }}>
                    {display ? <PopoverOverview handleNext={handleNext} /> : undefined}
                    <Box display='flex' alignItems='center' gap={2} p={1} px={2} bgcolor='#f5f5dc' borderRadius={2}>
                        <Box display='flex' alignItems='center' gap={1} title={`${customer.guests} ${customer.guests > 1 ? 'guests' : 'guest'}`}>
                            <Typography display='flex' alignItems='center' gap={0.7} color='#4b8b3b' title='Guests'>
                                <MdPeopleAlt size={20} />
                                <b>{customer.guests}</b>
                            </Typography>
                        </Box>
                        <Typography px={.5} color='#6b8e23'>|</Typography> {/* Styled separator */}
                        <Typography display='flex' alignItems='center' gap={1} color='#4b8b3b' title='selected dates'>
                            <BsCalendar2DateFill size={20} />
                            <b>{formatDateRange(selectedDate.checkIn, selectedDate.checkOut)}</b>
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: .5, mt: { xs: .5, sm: 0 }, }}>
                    <CustomTab icon={<BsStars size={20} />} text='Suggestions' onClick={() => handleChange(0)}
                        isMatch={tab === 0} />
                    {accommodationType === 'all' && (
                        <>
                            <CustomTab icon={<MdOutlineBedroomParent size={20} />} text='Rooms'
                                onClick={() => handleChange(1)} isMatch={tab === 1} />
                            <CustomTab icon={<FaUmbrellaBeach size={20} />} text='Cottages'
                                onClick={() => handleChange(2)} isMatch={tab === 2} />
                            <CustomTab icon={<MdOutlineOtherHouses size={20} />} text='Others'
                                onClick={() => handleChange(3)} isMatch={tab === 3} />
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

                    {/* for others... */}
                    {accommodationType === 'others' && (
                        <CustomTab icon={<MdOutlineOtherHouses size={20} />} text='Others' onClick={() => handleChange(1)}
                            isMatch={tab === 1} />
                    )}

                </Box>
            </Box>

            <Box px={{ xs: 0, sm: 1 }}>
                <CustomTabPanel value={tab} index={0}>
                    <Suggestions handleStep={handleStep} />
                </CustomTabPanel>
                {accommodationType === 'all' && (
                    <>
                        <CustomTabPanel value={tab} index={1}>
                            <ReservationRooms handleStep={handleStep} />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={2}>
                            <ReservationCottages handleStep={handleStep} />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={3}>
                            <ReservationCottages handleStep={handleStep} isOther />
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

                {accommodationType === 'others' && (
                    <CustomTabPanel value={tab} index={1}>
                        <ReservationCottages handleStep={handleStep} isOther={true} />
                    </CustomTabPanel>
                )}
            </Box>
        </Box >
    );
}
