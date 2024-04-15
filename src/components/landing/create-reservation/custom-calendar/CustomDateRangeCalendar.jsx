import { Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import calculateDaysDuration from '../../../../utility_functions/calculateDaysDuration';
import './Calendar.css';

const Calendar = ({ disabledDates = [], defaultValue, setDefaultValue, loading, loadingText }) => {
    const theme = useTheme();

    // const [startDate, setStartDate] = useState(defaultValue?.checkIn ? new Date(defaultValue.checkIn.setHours(0, 0, 0, 0)) : null);
    // const [endDate, setEndDate] = useState(defaultValue?.checkOut ? new Date(defaultValue.checkOut.setHours(0, 0, 0, 0)) : null);
    const [startDate, setStartDate] = useState(new Date(new Date(defaultValue.checkIn).setHours(0, 0, 0, 0)));
    const [endDate, setEndDate] = useState(new Date(new Date(defaultValue.checkOut).setHours(0, 0, 0, 0)));

    const [hoveredDate, setHoveredDate] = useState(null);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

    const handleDateClick = (day) => {
        if (!startDate || (startDate && endDate)) {
            if (!isDisabled(day)) {
                setStartDate(day);
                setEndDate(null);
                setHoveredDate(null); // Clear hovered dates when selecting start date
            }
        } else if (startDate && !endDate) {
            if (!isDisabled(day)) {
                if (day > startDate) {
                    let isDisabledInRange = false;
                    for (let d = new Date(startDate); d <= day; d.setDate(d.getDate() + 1)) {
                        if (isDisabled(new Date(d))) {
                            isDisabledInRange = true;
                            break;
                        }
                    }
                    if (!isDisabledInRange) {
                        let swapDayIffirstIsGreater = startDate > day;
                        if (swapDayIffirstIsGreater) {
                            setEndDate(startDate);
                            setStartDate(day);
                            setDefaultValue({ checkIn: day, checkOut: startDate, duration: calculateDaysDuration(day, startDate) });
                        } else {
                            setEndDate(day);
                            setDefaultValue({ checkIn: startDate, checkOut: day, duration: calculateDaysDuration(startDate, day) });
                        }
                    }
                } else {
                    let isDisabledInRange = false;
                    for (let d = new Date(day); d <= startDate; d.setDate(d.getDate() + 1)) {
                        if (isDisabled(new Date(d))) {
                            isDisabledInRange = true;
                            break;
                        }
                    }
                    if (!isDisabledInRange) {
                        if (startDate > day) {
                            setEndDate(startDate);
                            setDefaultValue({ checkIn: day, checkOut: startDate, duration: calculateDaysDuration(day, startDate) });
                            setStartDate(day);
                        } else {
                            setEndDate(day);
                            setDefaultValue({ checkIn: startDate, checkOut: day, duration: calculateDaysDuration(startDate, day) });
                            setStartDate(startDate);
                        }
                        setHoveredDate(null); // Clear hovered dates when reselecting start date
                    }
                }
            }
        }
    };


    const handleDateHover = (day) => {
        if (startDate && !endDate && !isDisabled(day)) {
            let hoveredDates = [];
            if (day < startDate) {
                let d = new Date(startDate);
                while (d >= day) {
                    if (isDisabled(new Date(d))) {
                        break; // Exit loop if disabled date found
                    }
                    hoveredDates.push(new Date(d));
                    d.setDate(d.getDate() - 1);
                }
            } else if (day > startDate) {
                let d = new Date(startDate);
                while (d <= day) {
                    if (isDisabled(new Date(d))) {
                        break; // Exit loop if disabled date found
                    }
                    hoveredDates.push(new Date(d));
                    d.setDate(d.getDate() + 1);
                }
            }
            setHoveredDate(hoveredDates);
        }
    };


    const isDisabled = (day) => {
        const currentDate = new Date();
        const formattedCurrentDate = formatDateString(currentDate);
        const formattedDay = formatDateString(day);

        // Check if today's date and current time is past 2 PM
        if (formattedDay === formattedCurrentDate) {
            const currentHour = currentDate.getHours();
            if (currentHour >= 14) {
                return true;
            }
        }

        return formattedDay < formattedCurrentDate || disabledDates.includes(formattedDay);
    };


    const formatDateString = (day) => {
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    };

    const renderCalendar = (offset) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + offset + currentMonthOffset;
        currentDate.setFullYear(currentYear, currentMonth, 1); // Set year and month

        const monthName = currentDate.toLocaleDateString('default', { year: 'numeric', month: 'long' });

        const handlePrevClick = () => {
            setCurrentMonthOffset(currentMonthOffset - 1);
        };

        const handleNextClick = () => {
            setCurrentMonthOffset(currentMonthOffset + 1);
        };

        return (
            <div className="calendar">
                <Box className="header" bgcolor='primary.main' color='primary.contrastText'>
                    {offset === 1 ? (
                        <Box />
                    ) : null}
                    {offset === 0 ? (
                        <button className="prev-btn" onClick={() => setCurrentMonthOffset(currentMonthOffset - 1)}>&#10094;</button>
                    ) : null}
                    <div className="month">{monthName}</div>
                    {offset === 0 ? (
                        <Box />
                    ) : null}
                    {offset === 1 ? (
                        <button className="next-btn" onClick={() => setCurrentMonthOffset(currentMonthOffset + 1)}>&#10095;</button>
                    ) : null}
                </Box>
                <div className="days">
                    <div className="day-name">Sun</div>
                    <div className="day-name">Mon</div>
                    <div className="day-name">Tue</div>
                    <div className="day-name">Wed</div>
                    <div className="day-name">Thu</div>
                    <div className="day-name">Fri</div>
                    <div className="day-name">Sat</div>
                    {renderDays(currentDate)}
                </div>
            </div>
        );
    };


    const renderDays = (currentDate) => {
        const days = [];
        const daysCount = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= daysCount; i++) {
            const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isSelected = startDate && endDate && currentDay >= startDate && currentDay <= endDate;
            const isInRange = hoveredDate && hoveredDate.find(date => date.getTime() === currentDay.getTime());
            const isStart = startDate && currentDay.getTime() === startDate.getTime();
            const isEnd = endDate && currentDay.getTime() === endDate.getTime();
            const isDisabledDay = isDisabled(currentDay);

            // const bgcolor = isSelected ? 'primary.main' : isInRange ? 'primary.light' : isStart ? 'primary.main' : isEnd ? 'primary.main' : isDisabledDay ? theme.palette.background.paper : ''
            // const color = isSelected ? 'primary.contrastText' : isInRange ? 'primary.light' : isStart ? 'primary.contrastText' : isEnd ? 'primary.contrastText' : isDisabledDay ? theme.palette.background.contrastText : ''

            let bgColor;
            let textColor = theme.palette.text.primary; // Default text color

            if (isDisabledDay) {
                bgColor = theme.palette.grey[400]; // Gray color for disabled days
            } else if (isSelected || isStart || isEnd) {
                bgColor = theme.palette.primary.main; // Primary color if selected
                textColor = theme.palette.primary.contrastText; // Contrast text for selected days
            } else if (isInRange) {
                bgColor = theme.palette.primary.light; // Primary light color if in range
                textColor = theme.palette.primary.contrastText; // Contrast text for in range days
            } else {
                bgColor = 'inherit'; // Default background color
            }

            days.push(
                <Typography
                    key={i}

                    // bgcolor={bgColor}
                    // color={textColor}
                    // sx={{
                    //     py: 2.5,
                    //     textAlign: 'center'
                    // }}

                    className={`
                        day ${isSelected ? 'selected' : ''} 
                        ${isInRange ? 'inRange' : ''} 
                        ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} 
                        ${isDisabledDay ? 'disabled' : ''}
                        `}
                    onClick={() => !isDisabledDay && handleDateClick(currentDay)}
                    onMouseEnter={() => handleDateHover(currentDay)}
                >
                    {i}
                </Typography>
            );
        }

        return days;
    };

    return (
        <Box position='relative'>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
                {renderCalendar(0)}
                {renderCalendar(1)}
            </Box>
            {loading ? <Box
                position='absolute'
                top={0}
                left={0}
                width='100%'
                height='100%'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    backdropFilter: 'blur(1px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Glass effect background
                    color: 'white', // Text color
                }}
            >
                <Typography fontWeight={600}>{loadingText}</Typography>
            </Box> : undefined}
        </Box>
    );
};

export default Calendar;




{/* <Typography
    key={i}
    className={`day ${isSelected ? 'selected' : ''} ${isInRange ? 'inRange' : ''} ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isDisabledDay ? 'disabled' : ''}`}
    onClick={() => !isDisabledDay && handleDateClick(currentDay)}
    onMouseEnter={() => handleDateHover(currentDay)}
>
    {i}
</Typography> */}