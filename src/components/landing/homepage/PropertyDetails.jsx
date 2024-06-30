import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaStore, FaSwimmingPool, FaUmbrellaBeach } from "react-icons/fa";
import { IoBasketball, IoBed, IoFastFood, IoPeople } from 'react-icons/io5';
import { LuParkingCircle } from "react-icons/lu";
import { RiBilliardsFill } from "react-icons/ri";

const propertyData = [
    {
        label: "Rooms",
        icon: <IoBed size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Cottages",
        icon: <FaUmbrellaBeach size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1712223138/2_lociog.jpg"
    },
    {
        label: "Mini Mart",
        icon: <FaStore size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Restaurant",
        icon: <IoFastFood size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Function Hall",
        icon: <IoPeople size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Swimming Pools",
        icon: <FaSwimmingPool size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Half Court Basketball",
        icon: <IoBasketball size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Billiard",
        icon: <RiBilliardsFill size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    },
    {
        label: "Parking",
        icon: <LuParkingCircle size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714146487/435010970_1760424487770875_441501228963471840_n_bx1szd.jpg"
    }
];

export default function PropertyDetails() {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <Box
            sx={{
                bgcolor: 'primary.light',
                color: 'white',
                py: 8,
                px: 5,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                position: 'relative'
            }}
        >
            <Typography variant="h4" align="center" gutterBottom paragraph fontWeight={600}>
                Property Details
            </Typography>
            <Box sx={containerStyles}>
                {propertyData.map((item, index) => (
                    <Item
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        img={item.img}
                        isHovered={hoveredItem === index}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                    />
                ))}
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

const Item = ({ icon, label, img, isHovered, onMouseEnter, onMouseLeave }) => (
    <Box
        sx={{
            ...itemStyles,
            ...(isHovered && hoveredStyles)
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {isHovered ? (
            <img
                src={img}
                alt={label}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            />
        ) : (
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' height='100%'>
                <div>
                    {icon}
                    <Typography
                        variant="h6"
                        sx={{
                            marginTop: '0.5rem',
                            fontWeight: 500,
                            textAlign: 'center',
                            color: 'primary.contrastText',
                        }}
                    >
                        {label}
                    </Typography>
                </div>
            </Box>
        )}
    </Box>
);

const itemStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    flexBasis: 'calc(33% - 16px)',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    height: '200px', // Fixed height for each box
    width: '150px', // Fixed width for each box
    '&:hover': {
        transform: 'scale(1.05)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
};

const hoveredStyles = {
    backgroundColor: 'transparent',
    padding: '0',
};