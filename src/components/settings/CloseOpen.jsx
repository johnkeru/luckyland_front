import { Box, Card, Divider, FormControlLabel, Switch, Typography } from '@mui/material'
import React from 'react'

const CloseOpen = () => {
    return (
        <Card elevation={2} sx={{ p: 2, mb: 1.5 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Resort Status</Typography>
            <Divider />
            <Box mt={2}>
                <FormControlLabel
                    control={<Switch />}
                    label="Resort Open"
                />
            </Box>
        </Card>
    )
}

export default CloseOpen