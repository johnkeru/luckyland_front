import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

const BookingCalendar2 = () => {
    const [selectedRange, setSelectedRange] = useState(null);

    const handleDateSelect = (selectInfo) => {
        const { start, end } = selectInfo;
        setSelectedRange({ start, end });
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            select={handleDateSelect}
            validRange={{ start: new Date().toISOString().substring(0, 10) }}
            events={[
                {
                    title: 'Meeting with Client',
                    start: '2024-02-17T10:00:00', // Start time
                    end: '2024-02-17T12:00:00',   // End time
                    backgroundColor: 'green',      // Background color
                },
                {
                    title: 'Team Lunch',
                    start: '2024-02-18T12:30:00', // Start time
                    end: '2024-02-18T13:30:00',   // End time
                    backgroundColor: 'blue',       // Background color
                },
                {
                    title: 'Project Deadline',
                    start: '2024-02-20',           // All-day event
                    end: '2024-02-20',             // All-day event
                    backgroundColor: 'red',        // Background color
                },
            ]}
        />
    );
};

export default BookingCalendar2;


