import { Paper, Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import Carousel from 'react-material-ui-carousel';
import SecondToolbar from './SecondToolbar'

function Item({ item }) {
    const nav = useNavigate();

    return (
        <Paper
            sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.355), rgba(0,0,0,0.355)), url('${item.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px',
                textAlign: 'center',
                color: '#fff',
            }}
        >

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2" sx={{ marginBottom: '20px' }}>{item.name}</Typography>
                    <Typography variant="body1" sx={{ marginBottom: '30px' }}>
                        {item.description}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h4">Comfortable Rooms</Typography>
                    <Typography variant="body2" my={2}>
                        Enjoy our cozy rooms, perfect for families or friends/couples seeking a comfortable and relaxing stay.
                    </Typography>
                    <Button onClick={() => nav('reservation')}
                        variant="outlined"
                        sx={{
                            p: 1,
                            px: 4,
                            borderRadius: 0,
                            border: '2px solid white',
                            color: 'white',
                            ":hover": { border: '2px solid white', color: 'white' }
                        }}
                        color="info" >
                        Explore Rooms
                    </Button>
                </Grid>


                <Grid item xs={12} sm={4}>
                    <Typography variant="h4">Comfortable Accommodations</Typography>
                    <Typography variant="body2" my={2}>
                        Relax in our cozy rooms or cottages, designed for your comfort.
                    </Typography>
                    <Button onClick={() => nav('reservation')}
                        variant="outlined"
                        sx={{
                            p: 1,
                            px: 4,
                            borderRadius: 0,
                            border: '2px solid white',
                            color: 'white',
                            ":hover": { border: '2px solid white', color: 'white' }
                        }}
                        color="secondary" >
                        Reserve Now
                    </Button>
                </Grid>


                <Grid item xs={12} sm={4}>
                    <Typography variant="h4">Our Cottages</Typography>
                    <Typography variant="body2" my={2}>
                        Explore our cottages, offering options for both large groups and intimate getaways amidst nature's wonders.
                    </Typography>
                    <Button onClick={() => nav('reservation')}
                        variant="outlined"
                        sx={{
                            p: 1,
                            px: 4,
                            borderRadius: 0,
                            border: '2px solid white',
                            color: 'white',
                            ":hover": { border: '2px solid white', color: 'white' }
                        }}
                        color="success" >
                        View Cottages
                    </Button>
                </Grid>

            </Grid>
        </Paper>
    );
}

export default function HeroAndNavigation2(props) {
    var items = [
        {
            name: "Welcome To UnLuckyLand Resort",
            description: "Experience the ultimate relaxation in our luxurious beachfront villas.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg'
        },
        {
            name: "Exotic Spa Retreat",
            description: "Indulge in our exotic spa retreat and rejuvenate your body and soul.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/3_vb5wxf.jpg'
        },
        {
            name: "Adventure Awaits",
            description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg'
        },
        {
            name: "Nice",
            description: "Embark on thrilling adventures and discover the hidden treasures of our island paradise.",
            image: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/4_fqz3ko.jpg'
        },
    ];

    return (
        <Box position='relative'>
            <SecondToolbar
                sx={{
                    position: 'absolute',
                    zIndex: 2,
                    top: 0, left: 0,
                    width: '100%',
                    display: 'flex',
                    px: 20,
                    py: 1,
                    backdropFilter: 'blur(2px)',
                    backgroundColor: 'rgba(250, 250, 250, .7)', // Glass effect background
                }}
            />
            <Carousel autoPlay >
                {items.map((item, i) => <Item key={i} item={item} />)}
            </Carousel>
        </Box>
    );
}
