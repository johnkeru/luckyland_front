import React from 'react';

export default function SelectArrivalDate({ arrivalDate, setArrivalDate }) {
    const handleDateChange = (event) => {
        setArrivalDate(event.target.value);
    };

    return (
        <div>
            <label htmlFor="arrivalDate">Arrival Date: </label>
            <input
                type="datetime-local"
                id="arrivalDate"
                value={arrivalDate}
                onChange={handleDateChange}
                style={{
                    padding: '10px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    width: '200px' // Adjust width as needed
                }}
            />
        </div>
    );
}
