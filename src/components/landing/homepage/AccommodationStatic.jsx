import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CustomCarouselDirectly from "../../../utility_components/CustomCarouselDirectly";
import scrollTop from "../../../utility_functions/scrollTop";

const accommodationData = [
    {
        path: 'rooms',
        title: 'Featured Rooms',
        description: 'Our rooms cater to all needs, offering comfortable options for couples, friends, and families.',
        images: [
            "https://res.cloudinary.com/kerutman/image/upload/v1717241900/rooms/coup/ac/IMG20240527101346_zwdfqo.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717241901/rooms/coup/ac/IMG20240527101500_jwgn5x.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717243347/rooms/fam/IMG20240529112807_y6zyjw.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717243345/rooms/fam/IMG20240527101203_n0s8u2.jpg",
        ],
    },
    {
        path: 'cottages',
        title: 'Featured Cottages',
        description: 'We offer cottages in various sizes, perfect for both small and large groups.',
        images: [
            "https://res.cloudinary.com/kerutman/image/upload/v1717201551/cottages/pool%20side%20cottages%201/IMG20240601071552_hxtjzj.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717245874/cottages/gazebo/IMG20240601093811_ti6r3b.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717245897/cottages/duplex/IMG20240601093247_xzjpts.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717810567/cottages/Big%20Cottages/BIg%20Cottage%204/IMG20240604071828_asyitx.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717810199/cottages/Big%20Cottages/Big%20Cottage%203/IMG20240604071958_dayts8.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717810493/cottages/Big%20Cottages/Big%20Cottage%202/IMG20240604071910_qh7nug.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717809884/cottages/Big%20Cottages/IMG20240604072613_cnx0mk.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717202346/cottages/anahaw/IMG20240601071915_mmit8n.jpg",
        ],
    },
    {
        path: 'others',
        title: 'Featured Others',
        description: 'Our function hall and tree house are perfect for events and parties.',
        images: [
            "https://res.cloudinary.com/kerutman/image/upload/v1718090752/others/Tree%20House/IMG20240604072453_xepb3p.jpg",
            "https://res.cloudinary.com/kerutman/image/upload/v1717810080/others/Open%20Hall/IMG20240604072237_h3ovxg.jpg",
        ]
    },
]

const AccommodationStatic = ({ lastPart, isOtherPage }) => {
    return (
        <Box sx={{ py: 8, }} id='accommodations'> {/* Setting a light background color */}
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    {isOtherPage ? 'Other Accommodations' : 'Accommodations'}
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Explore our beautifully designed accommodations for an unforgettable stay.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {accommodationData.map(acc => <AccommodationCard key={acc.title} accommodation={acc} />)}
                </Grid>
            </Container>
        </Box>
    );
}

export default AccommodationStatic;


const AccommodationCard = ({ accommodation }) => {
    const nav = useNavigate();
    const handleGo = (path) => {
        nav(path);
        scrollTop();
    }
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
                <CustomCarouselDirectly
                    images={accommodation.images}
                    height={300}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {accommodation.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {accommodation.description}
                    </Typography>
                </CardContent>
                <Button
                    size='large'
                    variant="contained"
                    color="primary"
                    onClick={() => handleGo(`/${accommodation.path}`)}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Explore {accommodation.path}
                </Button>
            </Card>
        </Grid>
    );
}