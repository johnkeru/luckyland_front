import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { FaPeopleRoof } from 'react-icons/fa6';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdOutlineBedroomParent, MdOutlineCottage } from "react-icons/md";
import useCustomer from '../../../../../hooks/reservation/useCustomer';
import useDate from '../../../../../hooks/reservation/useDate';
import useServices from '../../../../../hooks/reservation/useServices';
import { formatDateRange } from '../../../../../utility_functions/formatTime';
import Cottages from './Cottages';
import Rooms from './Rooms';
import Suggestions from './Suggestions';
import { MdOutlineRecommend } from "react-icons/md";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SmallTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0, // Adjust as needed
    height: '30px', // Adjust as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export default function ServicesTab({ handleNext, handleStep }) {
    const { tab, setTab } = useServices();
    const { accommodationType, customer } = useCustomer();
    const { selectedDate } = useDate();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                <SmallTabs value={tab} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab key={1} icon={<MdOutlineRecommend size='20px' />} iconPosition="end" label="suggestions" {...a11yProps(0)} />,

                    {accommodationType === 'both' ? [
                        <Tab key={1} icon={<MdOutlineBedroomParent size='17px' />} iconPosition="end" label="rooms" {...a11yProps(1)} />,
                        <Tab key={2} icon={<MdOutlineCottage size='17px' />} iconPosition="end" label="cottages"  {...a11yProps(2)} />
                    ] :
                        accommodationType === 'rooms' ?
                            <Tab icon={<MdOutlineBedroomParent size='17px' />} iconPosition="end" label="rooms" {...a11yProps(1)} />
                            :
                            <Tab icon={<MdOutlineCottage size='17px' />} iconPosition="end" label="cottages"  {...a11yProps(2)} />
                    }
                </SmallTabs>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'GrayText' }} gap={2} >
                    <Box display='flex' alignItems='center' gap={1} >
                        <Button variant='outlined' size='small' onClick={() => handleNext()}>Summary</Button>
                    </Box>
                    |
                    <Box display='flex' alignItems='center' gap={1} title={`${customer.guests} ${customer.guests > 1 ? 'guests' : 'guest'}`}>
                        <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={1}>
                            {customer.guests > 4 ? <FaPeopleRoof /> : <IoPeopleSharp />} {customer.guests}
                        </Typography>
                    </Box>
                    |
                    <Box display='flex' alignItems='center' gap={1} >
                        <Typography variant="body2">
                            {accommodationType === 'both' ? 'Rooms & Cottages ' : accommodationType === 'rooms' ? 'Rooms ' : 'Cottages '}
                            available for <b>{formatDateRange(selectedDate.checkIn, selectedDate.checkOut)}</b></Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                // className="no-scrollbar"
                // sx={{
                //     overflowY: 'scroll',
                //     height: '71vh',
                // }}
                mt={1}
            >
                <CustomTabPanel value={tab} index={0}>
                    <Suggestions handleStep={handleStep} />
                </CustomTabPanel>
                {accommodationType === 'both' ? <>
                    <CustomTabPanel value={tab} index={1}>
                        <Rooms handleStep={handleStep} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={2}>
                        <Cottages handleStep={handleStep} />
                    </CustomTabPanel>
                </> :
                    accommodationType === 'rooms' ?
                        <CustomTabPanel value={tab} index={1}>
                            <Rooms handleStep={handleStep} />
                        </CustomTabPanel>
                        :
                        <CustomTabPanel value={tab} index={1}>
                            <Cottages handleStep={handleStep} />
                        </CustomTabPanel>
                }
            </Box>
        </Box >
    );
}

