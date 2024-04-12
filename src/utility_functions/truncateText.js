export default function truncateText(description, maxLength) {
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + "...";
    } else {
        return description;
    }
}