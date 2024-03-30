import React, { useState } from 'react'
import CustomDateRangeCalendar from '../components/landing/create-reservation/custom-calendar/CustomDateRangeCalendar'
import { Box } from '@mui/material'

const Test = () => {
    const [defaultValue, setDefaultValue] = useState(() => null);
    console.log(defaultRange)
    return (
        <Box width='84%' m='auto'>
            <CustomDateRangeCalendar
                disabledDates={["2024-03-29", "2024-03-24"]}
                defaultValue={defaultValue}
                setDefaultValue={setDefaultValue}
            />
        </Box>
    );
}

export default Test