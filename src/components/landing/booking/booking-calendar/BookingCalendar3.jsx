import React, { useState } from 'react';
import useBookingSummary from '../../../../hooks/useBookingSummary';

function BookingCalendar3({ handleNext }) {
    const { setDate } = useBookingSummary();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const handleStartDateChange = (e) => {
        setCheckIn(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setCheckOut(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDate({ checkIn, checkOut });
        handleNext();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={checkIn}
                        onChange={handleStartDateChange}
                        pattern="\d{4}-\d{2}-\d{2}"
                        placeholder="YYYY-MM-DD"
                        required
                    />
                </label>
                <br />
                <label>
                    End Date:
                    <input
                        type="date"
                        value={checkOut}
                        onChange={handleEndDateChange}
                        pattern="\d{4}-\d{2}-\d{2}"
                        placeholder="YYYY-MM-DD"
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default BookingCalendar3;
