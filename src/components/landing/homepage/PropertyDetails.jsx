import { IoBed, IoHome, IoBasketball,  IoFastFood, IoPeople} from 'react-icons/io5';
import {Typography, Box} from "@mui/material";
import { RiBilliardsFill } from "react-icons/ri";
import { FaSwimmingPool } from "react-icons/fa";
import { FaStore } from "react-icons/fa";

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
                <Item icon={<IoBed size={50} />} label="Rooms" />
                <Item icon={<IoHome size={50} />} label="Cottages" />
                <Item icon={<FaStore size={50} />} label="Mini Mart" />
                <Item icon={<IoFastFood size={50} />} label="Restaurant" />
                <Item icon={<IoPeople size={50} />} label="Function Hall" />
                <Item icon={<FaSwimmingPool size={50} />} label="Swimming Pools" />
                <Item icon={<IoBasketball size={50} />} label="Half Court Basketball" />
                <Item icon={<RiBilliardsFill size={50} />} label="Billiard" />
            </Box>
        </Box>
    );
}

const containerStyles = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    margin: 'auto',
    flexWrap: 'wrap',
    gap: {xs: 4, sm: 0}
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
    flexBasis: '12%',
};
