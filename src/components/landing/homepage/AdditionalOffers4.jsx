import { Grid, Typography, Button, Box, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router';

const AdditionalOffers4 = () => {
    const nav = useNavigate();

    // Sample data for special offers or packages
    const specialOffers = [
        {
            id: 1,
            title: "Stay Longer, Save More",
            description: "Book a stay of 5 nights or more and enjoy 20% off our best available rate.",
            buttonText: "Explore",
            imageUrl: "https://via.placeholder.com/400x300",
        },
        {
            id: 2,
            title: "Family Vacation Package",
            description: "Plan your family getaway with our exclusive package including accommodation, meals, and activities for kids.",
            buttonText: "Learn More",
            imageUrl: "https://via.placeholder.com/400x300",
        },
    ];

    return (
        <Box mt={6}>
            <Typography variant="h2" gutterBottom>Additional Details or Offers</Typography>
            <Grid container spacing={3}>
                {specialOffers.map(offer => (
                    <Grid item xs={12} sm={6} key={offer.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                image={offer.imageUrl}
                                alt={offer.title}
                                sx={{ height: 0, paddingTop: '56.25%' }} // 16:9 aspect ratio
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{offer.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{offer.description}</Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Button
                                    onClick={() => nav('reservation')}
                                    variant="contained"
                                    color="primary"
                                >
                                    {offer.buttonText}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default AdditionalOffers4;
