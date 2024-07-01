import { Box, Card, Divider, FormControlLabel, Switch, Typography } from '@mui/material';
import useResortStatus from '../../hooks/useResortStatus';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';
import { useEffect } from 'react';

const CloseOpen = () => {
    const { status, setStatus } = useResortStatus();

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/status/get-resort-status',
            setDataDirectly: setStatus
        });
    }, [status]);

    const handleChange = (event) => {
        const newStatus = event.target.checked;
        setStatus(newStatus);
        commonValidationCall({
            endpoint: 'api/status/update-resort-status',
            method: 'patch',
            hasToaster: true,
            body: { status: newStatus }
        });
    };

    return (
        <Card elevation={2} sx={{ p: 2, mb: 1.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Resort Status</Typography>
            <Divider />
            <Box mt={2}>
                <FormControlLabel
                    control={<Switch checked={status} onChange={handleChange} />}
                    label={status ? "Resort Open" : "Resort Closed"}
                />
            </Box>
        </Card>
    );
}

export default CloseOpen;
