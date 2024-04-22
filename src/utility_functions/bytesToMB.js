export default function bytesToMb(bytes) {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB'; // Limiting to 2 decimal places
}