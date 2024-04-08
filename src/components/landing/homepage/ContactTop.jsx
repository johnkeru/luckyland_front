import { Box, Typography } from '@mui/material';
import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";

const ContactTop = () => {
    return (
        <Box sx={{ bgcolor: 'orange', color: '#fff', display: 'flex', py: 1, px: 20 }}>
            <Box display="flex" alignItems="center" flexGrow={1} gap={2}>
                <Box display="flex" gap={1} alignItems='center'>
                    <FaPhoneAlt />
                    <Typography variant="body2" color="inherit" fontSize={14}>
                        09092131231231
                    </Typography>
                </Box>

                <Box display="flex" gap={1} alignItems="center">
                    <MdEmail />
                    <Typography variant="body2" color="inherit" fontSize={14}>
                        example@example.com
                    </Typography>
                </Box>

                <Box display="flex" gap={1} alignItems="center">
                    <ImLocation />
                    <Typography variant="body2" color="inherit" fontSize={14}>
                        Your Address
                    </Typography>
                </Box>
            </Box>

            <Box>
                <FaSquareFacebook />
            </Box>
        </Box>
    );
}

export default ContactTop;
