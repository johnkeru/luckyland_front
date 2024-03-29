import React, { useState } from 'react';
import './Calendar.css';
import { Box, Typography } from '@mui/material';

const Calendar = ({ disabledDates = [] }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

    const handleDateClick = (day) => {
        if (!startDate || (startDate && endDate)) {
            if (!isDisabled(day)) {
                setStartDate(day);
                setEndDate(null);
                setHoveredDate(null); // Reset hovered dates when selecting a new start date
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
                        setEndDate(day);
                        setHoveredDate(null); // Reset hovered dates when selecting a new end date
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
                        setEndDate(startDate);
                        setStartDate(day);
                        setHoveredDate(null); // Reset hovered dates when selecting a new start date
                    }
                }
            }
        }
    };


    const handleDateHover = (day) => {
        if (startDate && !endDate && !isDisabled(day)) {
            let hoveredDates = [];
            if (day < startDate) {
                let d = new Date(day);
                while (d <= startDate) {
                    if (isDisabled(new Date(d))) {
                        return;
                    }
                    hoveredDates.push(new Date(d));
                    d.setDate(d.getDate() + 1);
                }
            } else if (day > startDate) {
                let d = new Date(startDate);
                while (d <= day) {
                    if (isDisabled(new Date(d))) {
                        return;
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
        const isPastDate = day < currentDate;
        const isDisabledDate = disabledDates.includes(formattedDate);
        return isPastDate || isDisabledDate;
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
        const monthName = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });
        return (
            <div className={`calendar ${offset === 1 ? 'right' : ''}`}>
                <div className="header">
                    {offset === 1 ? (
                        <Box />
                    ) : null}
                    {offset === 0 ? (
                        <button className="prev-btn" onClick={() => setCurrentMonthOffset(currentMonthOffset - 1)}>&#10094;</button>
                    ) : null}
                    <Typography variant='h6' className="month">{monthName}</Typography>
                    {offset === 0 ? (
                        <Box />
                    ) : null}
                    {offset === 1 ? (
                        <button className="next-btn" onClick={() => setCurrentMonthOffset(currentMonthOffset + 1)}>&#10095;</button>
                    ) : null}
                </div>
                <Box className="days">
                    <Box className="day-name">Sun</Box>
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