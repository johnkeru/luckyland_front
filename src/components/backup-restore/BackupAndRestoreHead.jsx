import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import ButtonWithLoading from '../../utility_components/ButtonWithLoading';

const BackupAndRestoreHead = ({ configMethods }) => {
    const [backingUp, setBackingUp] = useState(false);

    const handleBackup = () => {
        configMethods.backup(setBackingUp);
    }

    return (
        <Box p={3} >
            <Typography variant="h4" gutterBottom color='info.main'>Backup Management</Typography>
            <Typography variant="body1" gutterBottom>
                View and manage backups for the resort's data. Automated backups are scheduled every 28th day of the month, and you can also perform manual backups.
            </Typography>
            <Box mt={2} display='flex' justifyContent='end'>
                <ButtonWithLoading
                    loading={backingUp}
                    color='info'
                    icon={<AiOutlineFileText />}
                    onClick={handleBackup}
                    loadingText='Backing...'
                >
                    Backup
                </ButtonWithLoading>
            </Box>
        </Box>
    )
}

export default BackupAndRestoreHead