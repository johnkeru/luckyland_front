import { IoBed, IoHome, IoBasketball, IoBeer, IoFastFood, IoPeople, IoWater, IoCube } from 'react-icons/io5';
import {Typography, Box} from "@mui/material";

export default function Widget() {
    return (
        <Box
            sx={{
                backgroundColor: '#FFA500',
                color: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}
        >
            <Typography sx={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Property Details</Typography>
            <Box sx={containerStyles}>
                <Item icon={<IoBed size={40} />} label="Rooms" />
                <Item icon={<IoHome size={40} />} label="Cottages" />
                <Item icon={<IoCube size={40} />} label="Mini Mart" />
                <Item icon={<IoFastFood size={40} />} label="Restaurant" />
                <Item icon={<IoPeople size={40} />} label="Function Hall" />
                <Item icon={<IoWater size={40} />} label="Swimming Pools" />
                <Item icon={<IoBasketball size={40} />} label="Half Court Basketball" />
                <Item icon={<IoBeer size={40} />} label="Billiard" />
            </Box>
        </Box>
    );
}

const containerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '7xl',
    margin: 'auto',
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
