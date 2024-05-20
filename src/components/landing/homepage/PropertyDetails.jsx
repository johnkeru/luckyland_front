import { IoBed, IoHome, IoBasketball, IoFastFood, IoPeople } from 'react-icons/io5';
import { Typography, Box } from "@mui/material";
import { RiBilliardsFill } from "react-icons/ri";
import { FaSwimmingPool } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

export default function PropertyDetails() {
    return (
        <Box
            sx={{
                bgcolor: 'primary.light',
                color: 'white',
                py: 8,
                px: 5,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom mb={4}>
                Property Details
            </Typography>
            <Box sx={containerStyles}>
                <AnimatedItem icon={<IoBed size={60} />} label="Rooms" />
                <AnimatedItem icon={<IoHome size={60} />} label="Cottages" />
                <AnimatedItem icon={<FaStore size={60} />} label="Mini Mart" />
                <AnimatedItem icon={<IoFastFood size={60} />} label="Restaurant" />
                <AnimatedItem icon={<IoPeople size={60} />} label="Function Hall" />
                <AnimatedItem icon={<FaSwimmingPool size={60} />} label="Swimming Pools" />
                <AnimatedItem icon={<IoBasketball size={60} />} label="Half Court Basketball" />
                <AnimatedItem icon={<RiBilliardsFill size={60} />} label="Billiard" />
                <AnimatedItem icon={<LuParkingCircle size={60} />} label="Parking" />
            </Box>
        </Box>
    );
}

const containerStyles = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    margin: 'auto',
    flexWrap: 'wrap',
    gap: { xs: 4, sm: 2 }
};

const AnimatedItem = ({ icon, label }) => {
    const [ref, inView] = useInView();
    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        config: { duration: 500 },
    });

    return (
        <animated.div ref={ref} style={animation}>
            <Item icon={icon} label={label} />
        </animated.div>
    );
};

const Item = ({ icon, label }) => (
    <Box sx={itemStyles}>
        {icon}
        <Typography sx={{ marginTop: '0.5rem' }}>{label}</Typography>
    </Box>
);

const itemStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    flexBasis: '1%',
};
