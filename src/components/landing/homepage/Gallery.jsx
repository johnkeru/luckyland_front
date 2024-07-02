import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const itemData = [
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg',
        title: 'Snacks',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1716089267/441331518_367900262930595_6045749825129925158_n_ytwxwu.jpg',
        title: 'rooms',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1717810199/cottages/Big%20Cottages/Big%20Cottage%203/IMG20240604072046_btwrqi.jpg',
        title: 'Tower',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1719747437/448240548_512461227883314_3545241557700989722_n_tgcln2.jpg',
        title: 'luckyland',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1716089401/440986575_367900362930585_5219622164973685939_n_l52u5l.jpg',
        title: '6',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1719794675/345464544_1009331876722011_3423820444628131743_n_fwxmww.jpg',
        title: 'Dino',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1717809884/cottages/Big%20Cottages/IMG20240604072613_cnx0mk.jpg',
        title: 'big cottage 1',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1719887525/384029991_336172565479630_2847923309445548198_n_xmygc4.jpg',
        title: 'night table',
    },
    {
        img: 'https://res.cloudinary.com/kerutman/image/upload/v1718090752/others/Tree%20House/IMG20240604071750_uctp9i.jpg',
        title: 'tree house',
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719793292/448974962_1145858336531121_1447057116577565893_n_r7rw58.jpg",
        title: "lap",
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719887482/384143196_636001988395916_2684048565404986731_n_ysitmp.jpg",
        title: "blue pool",
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717202346/cottages/anahaw/IMG20240601071915_mmit8n.jpg",
        title: "anahaw 1",
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719792954/448698334_1909529269518090_3594328501777505619_n_lmbxib.jpg",
        title: "reading"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712223137/5_nshfji.jpg",
        title: "heart"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719839253/441292585_367901272930494_7623719480856449387_n_xwn0ch.jpg",
        title: "anahaw"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719887481/383896365_1365850147661179_5069749208336272528_n_ydjxgo.jpg",
        title: "hight night"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719792956/448241612_7852052078217964_5234449400892751223_n_vqnoi6.jpg",
        title: "billiard"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712318095/433678879_1070737890661635_4178202156844489351_n_jmjuan.jpg",
        title: "3 kami dito"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146924/338689126_2671374859668176_3055486381283622274_n_qufxc7.jpg",
        title: "green house"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717236768/new/IMG20240601094010_kzklel.jpg",
        title: "stage"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719747506/448782704_444520348433016_2700230901061986551_n_pwt7ia.jpg",
        title: "basketball"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719794692/384206697_152564331257647_7148105458199225336_n_t2nnfp.jpg",
        title: "night pool"
    },
    {
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719839138/441327224_367900756263879_2255196024670694207_n_dlwnmj.jpg",
        title: "hall 2"
    },
];

export default function Gallery() {
    return (
        <Box sx={{ py: 8, backgroundColor: '#f0f4f8' }} id='gallery'>
            <Container maxWidth="lg">
                <Typography variant="h4" align="center" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    Our Gallery
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Take a virtual tour through LuckyLand Resort and immerse yourself in its charm and beauty.
                </Typography>

                <Masonry
                    sx={{ width: '100%', m: 'auto' }}
                    columns={{ xs: 2, sm: 3, md: 4 }}
                    spacing={1}
                >
                    {itemData.map((item, index) => (
                        <Box
                            key={index}
                            bgcolor={'white'}
                            p={1}
                            sx={{
                                boxShadow: 2,
                                borderRadius: 2,
                                transition: 'transform 0.2s ease-in-out',
                                // '&:hover': {
                                //     transform: 'scale(1.05)',
                                // },
                            }}
                        >
                            <img
                                srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=162&auto=format`}
                                alt={item.title}
                                loading="eager"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    borderRadius: '8px',
                                }}
                            />
                        </Box>
                    ))}
                </Masonry>
            </Container>
        </Box>
    );
}
