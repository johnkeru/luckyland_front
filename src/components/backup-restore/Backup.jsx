import React, { useEffect, useState } from 'react';
import EnhancedTable from '../../utility_components/table/EnhancedTable';

import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import { BACKUP_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import BackupBody from './BackupBody';
import BackupHead from './BackupHead';

const Backup = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(BACKUP_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);


    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === BACKUP_ENDPOINT ? setLoading : undefined,
        });
    }, [sendUrl]);


    const configHead = [
        { label: 'ID', },
        { label: 'Filename', },
        { label: 'Size', },
        { label: 'Status', },
        { label: 'Checksum' },
        { label: 'Action', },
    ];

    const handleBackup = (setLoading) => {
        basicGetCall({
            endpoint: 'api/backups/create-backup',
            setLoading,
            hasToaster: true,
            onSuccess: () => {
                basicGetCall({
                    endpoint: sendUrl,
                    setResponse,
                });
            }
        });
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
        } finally {
            setLoading(false);
        }
    }

    const handleSelectPage = (value) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, `page=${value}&`));
    }

    const configMethods = {
        backup: handleBackup,
        download: handleDownload,
        handleSelectPage
    }

    return (
        <EnhancedTable
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            childrenHead={
                <BackupHead configMethods={configMethods} />
            }
            childrenBody={
                <BackupBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                />
            }
        />
    )
}

export default Backup


