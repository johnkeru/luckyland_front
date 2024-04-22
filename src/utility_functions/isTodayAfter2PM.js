export default function isTodayAfter2PM(dateString) {
    // Create a Date object from the given dateString
    const date = new Date(dateString);

    // Get today's date
    const today = new Date();

    // Check if the date is today
    const isToday = date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    // Check if the time is after 2:30 PM
    const isAfter2PM = date.getHours() > 14 || (date.getHours() === 14 && date.getMinutes() >= 30);

    // Return true if it's today and after 2:30 PM, otherwise false
    return isToday && isAfter2PM;
}

