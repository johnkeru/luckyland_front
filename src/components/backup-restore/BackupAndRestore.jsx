import React, { useEffect, useState } from 'react';
import EnhancedTable from '../../utility_components/table/EnhancedTable';

import { Box, Divider, Typography } from '@mui/material';
import { AiOutlineFileText } from 'react-icons/ai';
import useUser from '../../hooks/useUser';
import ButtonWithLoading from '../../utility_components/ButtonWithLoading';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import { BACKUP_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';
import { isAdmin, isInventory } from '../../utility_functions/roles';
import BackupAndRestoreBody from './BackupAndRestoreBody';

const Waste = () => {
    const { user } = useUser();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [backingUp, setBackingUp] = useState(false);


    useEffect(() => {
        basicGetCall({
            endpoint: BACKUP_ENDPOINT,
            setResponse,
            setLoading,
        });
    }, []);


    const configHead = [
        { label: 'ID', },
        { label: 'Filename', },
        { label: 'Size', },
        { label: 'Status', },
        { label: 'Checksum' },
        { label: 'Action', },
    ];

    const handleBackup = () => {
        const handleManualBackup = () => {
            basicGetCall({
                endpoint: 'api/backups/create-backup',
                setLoading: setBackingUp,
                hasToaster: true,
                onSuccess: () => {
                    basicGetCall({
                        endpoint: BACKUP_ENDPOINT,
                        setResponse,
                    });
                }
            });
        }

        return <Box p={3} boxShadow={1}>
            <Typography variant="h4" gutterBottom>Backup Management</Typography>
            <Typography variant="body1" gutterBottom>
                View and manage backups for your application. Automated backups are scheduled every 28th day of the month, and you can also perform manual backups.
            </Typography>
            <Divider />
            <ButtonWithLoading
                loading={backingUp}
                color='info'
                icon={<AiOutlineFileText />}
                onClick={handleManualBackup}
                sx={{ mt: 2 }}
                loadingText='Backing...'
            >
                Backup
            </ButtonWithLoading>
        </Box>
    }

    const handleDownload = async (id, setLoading) => {
        try {
            setLoading(true);
            const response = await axiosCreate.get(`api/backups/download/${id}`, {
                responseType: 'blob', // Specify response type as Blob
            });

            // Create a Blob object from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a URL for the Blob object
            const url = window.URL.createObjectURL(blob);

            // Create an anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup_${id}.zip`; // Set the filename for the downloaded file
            a.click();

            // Cleanup
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading backup:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    }

    const configMethods = {
        backup: handleBackup,
        download: handleDownload,
    }

    return (
        <EnhancedTable
            noTrash
            isSearch={false}
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            title='Backup & Restore'
            isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            childrenBody={
                <BackupAndRestoreBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAdmin(user.roles) || isInventory(user.roles)}
                />
            }
        />
    )
}

export default Waste


