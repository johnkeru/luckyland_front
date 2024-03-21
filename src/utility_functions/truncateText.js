export default function truncateText(description, maxLength) {
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + "... See more";
    } else {
        return description;
    }
}