import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { BsPinAngleFill } from 'react-icons/bs';

const reminders = [
    "Please take a shower at the shower area (big mushrooms) before swimming at the pool.",
    "Please be reminded NOT to use maong shorts and colored clothes during swimming. Instead, white and soft clothing is advised. Rash guard wear would also be ok to use.",
    "No pets allowed in the swimming pools.",
    "No horseplay or running on the pool deck.",
    "No glass or alcoholic beverages around the swimming areas. They must be in the respective cottages.",
    "No diving, especially in the shallow areas.",
    "Children require supervision of parents or adult family members.",
    "Valuable belongings must not be brought to the resort OR please be responsible for them."
];

const Reminder = () => {
    return (
        <Box sx={{ py: 8, backgroundColor: '#f0f4f8' }}>
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                        REMINDERS
                    </Typography>
                    <List>
                        {reminders.map((reminder, index) => (
                            <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                                <ListItemIcon>
                                    <BsPinAngleFill style={{ color: '#ff9800' }} size={24} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={reminder}
                                    primaryTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Box mt={3} textAlign="center">
                        <Typography variant="body1" color="text.secondary">
                            Thank you 😊🤗😇
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Reminder;
