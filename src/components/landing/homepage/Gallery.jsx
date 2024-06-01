import Masonry from '@mui/lab/Masonry';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { primaryDarkColors, primaryLightColors } from '../../../styles/globalStyle';

const itemData = [
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg',
        title: 'Fern',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg',
        title: 'Snacks',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1716089267/441331518_367900262930595_6045749825129925158_n_ytwxwu.jpg',
        title: 'Mushrooms',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/6_m20n9d.jpg',
        title: 'Tower',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223139/1_aoj4i8.jpg',
        title: 'Sea star',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712318098/434634660_226166927226572_5577912189830270801_n_vm4giq.jpg',
        title: 'Honey',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1716089401/440986575_367900362930585_5219622164973685939_n_l52u5l.jpg',
        title: '6',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1716089173/442487600_367902302930391_3012646217232738360_n_kfknoi.jpg',
        title: 'Pool',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1716089916/428361185_367900212930600_8889912809522708160_n_aptq83.jpg',
        title: 'Honey',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1714161875/398523270_2791751964333664_4104531403428654823_n_t2ctny.jpg',
        title: 'Basketball',
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717236768/new/IMG20240531210502_dcybe3.jpg",
        title: "lap",
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1716089032/441325075_367900429597245_3761056138771772773_n_ymt5fh.jpg", // 
        title: "cottage"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712223137/5_nshfji.jpg",
        title: "heart"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712318095/433678879_1070737890661635_4178202156844489351_n_jmjuan.jpg",
        title: "3 kami dito"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717236768/new/IMG20240601094010_kzklel.jpg",
        title: "stage"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717244427/others/IMG20240601093946_ewzynd.jpg",
        title: "stage"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717244426/others/IMG20240601094054_yyrtuc.jpg",
        title: "big hall?"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717241901/rooms/coup/ac/IMG20240527101500_jwgn5x.jpg",
        title: "room"
    },
];



export default function Gallery() {

    const gradient = `linear-gradient(180deg, ${primaryLightColors.primary100} 0%, ${primaryDarkColors.contrastText} 50%, ${primaryLightColors.primary100} 100%)`;

    return (
        <Box style={{ background: gradient }} sx={{ py: 8, color: primaryDarkColors.primary800 }} id='gallery'>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom>
                    Our Gallery
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Take a virtual tour through LuckyLand Resort and immerse yourself in its charm and beauty.
                </Typography>

                <Masonry sx={{ width: '100%', m: 'auto' }} columns={{ xs: 2, sm: 3, md: 4 }} spacing={1}>
                    {itemData.map((item, index) => (
                        <Box key={index} bgcolor={'white'} p={1} sx={{ boxShadow: 2, ":hover": { boxShadow: 5 } }}>
                            <img
                                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=162&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                }}
                            />
                        </Box>
                    ))}
                </Masonry>
            </Container>
        </Box>
    );
}

