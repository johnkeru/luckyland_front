import { Box, Typography } from "@mui/material";
import { FaStore, FaSwimmingPool, FaUmbrellaBeach } from "react-icons/fa";
import { IoBasketball, IoBed, IoFastFood, IoPeople } from 'react-icons/io5';
import { LuParkingCircle } from "react-icons/lu";
import { RiBilliardsFill } from "react-icons/ri";

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
                <Item icon={<IoBed size={60} />} label="Rooms" />
                <Item icon={<FaUmbrellaBeach size={60} />} label="Cottages" />
                <Item icon={<FaStore size={60} />} label="Mini Mart" />
                <Item icon={<IoFastFood size={60} />} label="Restaurant" />
                <Item icon={<IoPeople size={60} />} label="Function Hall" />
                <Item icon={<FaSwimmingPool size={60} />} label="Swimming Pools" />
                <Item icon={<IoBasketball size={60} />} label="Half Court Basketball" />
                <Item icon={<RiBilliardsFill size={60} />} label="Billiard" />
                <Item icon={<LuParkingCircle size={60} />} label="Parking" />
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
