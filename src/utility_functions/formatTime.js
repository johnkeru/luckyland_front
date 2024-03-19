export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const formatDateTime = (dateToConvert) => {
    const date = new Date(dateToConvert);
    const now = new Date();
    const timeDifferenceInSeconds = Math.floor((now - date) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return 'Just now';
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (timeDifferenceInSeconds < 172800) { // 2 days in seconds
        return 'Yesterday';
    } else {
        return formatDate(date);
    }
};
export default formatDateTime;


export function formatDateToMonth(inputDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateObj = new Date(inputDate);

    // Extract date, month, and year
    const date = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // Format the date
    const formattedDate = `${month} ${date} ${year}`;

    return formattedDate;
}

export function formalFormatDateToMonth(dateString) {
    // Convert the string to a Date object
    const date = new Date(dateString);

    // Array of month names
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    // Extract day, month, year, hours, and minutes from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const period = hours < 12 ? 'AM' : 'PM';
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;
    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Format the date in the desired format
    const formattedDate = monthNames[monthIndex] + " " + day + ", " + year + " " + formattedHours + ":" + formattedMinutes + " " + period;

    return formattedDate;
}


export function formatDateRange(startDate, endDate) {
    // Parse the input dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Months array to map month indexes to month names
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Format start and end dates
    const formattedStartDate = months[start.getMonth()] + ' ' + start.getDate();
    let formattedEndDate = '';

    if (start.getMonth() === end.getMonth()) {
        formattedEndDate = end.getDate();
    } else {
        formattedEndDate = months[end.getMonth()] + ' ' + end.getDate();
    }

    formattedEndDate += ', ' + end.getFullYear();

    // Combine and return the formatted date range
    return formattedStartDate + ' - ' + formattedEndDate;
}


// const originalDateTime = "2023-12-26 04:56:56";
// const formattedDateTime = formatDateTime(originalDateTime);

