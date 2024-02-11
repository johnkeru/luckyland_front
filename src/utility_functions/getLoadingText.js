export const getLoadingText = (action) => {
    switch (action) {
        case 'Update':
            return 'Updating...';
        case 'Delete':
            return 'Deleting...';
        case 'Add':
            return 'Adding...';
        case 'Cancel':
            return 'Canceling...';
        // Add more cases for other actions as needed
        default:
            return 'Loading...';
    }
};