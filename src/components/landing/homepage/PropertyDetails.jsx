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
        img: "https://res.cloudinary.com/kerutman/image/upload/v1716089173/442487600_367902302930391_3012646217232738360_n_kfknoi.jpg"
    },
    {
        label: "Cottages",
        icon: <FaUmbrellaBeach size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717201551/cottages/pool%20side%20cottages%201/IMG20240601071552_hxtjzj.jpg"
    },
    {
        label: "Mini Mart",
        icon: <FaStore size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719792963/448799973_453916160926861_3141147952147339000_n_besblw.jpg"
    },
    {
        label: "Restaurant",
        icon: <IoFastFood size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717244429/others/IMG20240601094043_zljkdl.jpg"
    },
    {
        label: "Function Hall",
        icon: <IoPeople size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1717810080/others/Open%20Hall/IMG20240604072237_h3ovxg.jpg"
    },
    {
        label: "Swimming Pools",
        icon: <FaSwimmingPool size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1714162115/346082600_3449478032047306_7852981897229480780_n_xnpkv7.jpg"
    },
    {
        label: "Half-Court Basketball",
        icon: <IoBasketball size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719747506/448782704_444520348433016_2700230901061986551_n_pwt7ia.jpg"
    },
    {
        label: "Billiard",
        icon: <RiBilliardsFill size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719792956/448241612_7852052078217964_5234449400892751223_n_vqnoi6.jpg"
    },
    {
        label: "Parking",
        icon: <LuParkingCircle size={60} />,
        img: "https://res.cloudinary.com/kerutman/image/upload/v1719792962/448896913_1539185543607338_3157092403732666429_n_hdptbt.jpg"
    }
];


export default function PropertyDetails() {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <Box
            sx={{
                bgcolor: 'primary.light',
                color: 'white',
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 5 },
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                position: 'relative',
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
    width: { xs: '100%', sm: '90%' },
    margin: 'auto',
    flexWrap: 'wrap',
    gap: 2,
};

const Item = ({ icon, label, img, isHovered, onMouseEnter, onMouseLeave }) => (
    <Box
        sx={{
            ...itemStyles,
            ...(isHovered && hoveredStyles),
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
                    borderRadius: '8px',
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
    flexBasis: { xs: 'calc(100% - 16px)', sm: 'calc(50% - 16px)', md: 'calc(33% - 16px)' },
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    height: { xs: '150px', sm: '200px' }, // Responsive height
    width: { xs: '100%', sm: '150px' }, // Responsive width
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
};

const hoveredStyles = {
    backgroundColor: 'transparent',
    padding: '0',
};
