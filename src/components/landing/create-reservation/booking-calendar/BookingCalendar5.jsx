import React, { useState } from "react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
import { DateRange } from "react-date-range";

export default function BookingCalendar5() {
    let now = new Date();
    let startt = moment(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );

    let ends = moment(startt).add(1, "days").subtract(1, "seconds");

    let [start, setstart] = useState(startt);
    let [end, setend] = useState(ends);

    let ranges = {
        "Today Only": [moment(start), moment(end)],
        "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    };
    let local = {
        format: "DD-MM-YYYY HH:mm",
        sundayFirst: false
    };
    let maxDate = moment(start).add(24, "hour");

    let applyCallback = (startDate, endDate) => {
        setstart(startDate);
        setend(endDate);
    };

    let handleSelect = (date) => {
        console.log(date); // Momentjs object
    };
    return (
        <div className="App">
            <div>
                <h1>Booking</h1>
                <DateTimeRangeContainer
                    ranges={ranges}
                    start={start}
                    end={end}
                    local={local}
                    applyCallback={applyCallback}
                >
                    <input
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter date"
                    />
                </DateTimeRangeContainer>
            </div>

            <div>
                <h1>Display Calendar</h1>
                <DateRange onInit={handleSelect} onChange={handleSelect} />
            </div>

            {/* <h1>Type 3</h1>
      <DatetimeRangePicker /> */}
        </div>
    );
}
