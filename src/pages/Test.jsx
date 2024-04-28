import { Box, Grid, Typography } from '@mui/material';

export default function Test() {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <Box p={10} px={20} >
                    <Typography variant="h6">Our Rooms</Typography>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.75rem' } }}>Rooms</Typography>
                    <Box mt={4}>
                        <RoomItem name="Classic Room" price="Starting from $39.00/Night" imageUrl="https://placehold.co/100x75" />
                        <RoomItem name="Grand Deluxe Room" price="Starting from $59.00/Night" imageUrl="https://placehold.co/100x75" />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <img src="https://placehold.co/600x400" alt="Main Room" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </Grid>
        </Grid>
    );
}

function RoomItem({ name, price, imageUrl }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <img src={imageUrl} alt={name} style={{ width: '5rem', height: '3.75rem', marginRight: '0.5rem' }} />
            <Box>
                <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>{name}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>{price}</Typography>
            </Box>
        </Box>
    );
}
