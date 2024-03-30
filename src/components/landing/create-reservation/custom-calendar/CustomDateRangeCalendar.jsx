import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ disabledDates = [], defaultValue, setDefaultValue }) => {
    const [startDate, setStartDate] = useState(defaultValue?.checkIn ? new Date(defaultValue.checkIn) : null);
    const [endDate, setEndDate] = useState(defaultValue?.checkOut ? new Date(defaultValue.checkOut) : null);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

    const calculateDuration = (start, end) => {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

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
                            setDefaultValue({ checkIn: day, checkOut: startDate, duration: calculateDuration(startDate, day) });
                        } else {
                            setEndDate(day);
                            setDefaultValue({ checkIn: startDate, checkOut: day, duration: calculateDuration(startDate, day) });
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
                            setDefaultValue({ checkIn: day, checkOut: startDate, duration: calculateDuration(startDate, day) });
                            setStartDate(day);
                        } else {
                            setEndDate(day);
                            setDefaultValue({ checkIn: startDate, checkOut: day, duration: calculateDuration(startDate, day) });
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
        const formattedDate = formatDateString(day);
        const currentDate = new Date();
        return disabledDates.includes(formattedDate) || day < currentDate;
    };

    const formatDateString = (day) => {
        const year = day.getFullYear();
        const month = day.getMonth() + 1;
        const date = day.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    };

    const renderCalendar = (offset) => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + offset + currentMonthOffset);
        const monthName = currentDate.toLocaleDateString('default', { month: 'long' });
        return (
            <div className="calendar">
                <Box className="header">
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
                <Box className="days">
                    <Typography className="day-name">Sun</Typography>
                    <Typography className="day-name">Mon</Typography>
                    <Typography className="day-name">Tue</Typography>
                    <Typography className="day-name">Wed</Typography>
                    <Typography className="day-name">Thu</Typography>
                    <Typography className="day-name">Fri</Typography>
                    <Typography className="day-name">Sat</Typography>
                    {renderDays(currentDate)}
                </Box>
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

            days.push(
                <Typography
                    key={i}
                    className={`day ${isSelected ? 'selected' : ''} ${isInRange ? 'inRange' : ''} ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isDisabledDay ? 'disabled' : ''}`}
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
        <div className="calendar-container">
            {renderCalendar(0)}
            {renderCalendar(1)}
        </div>
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