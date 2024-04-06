import { FaPeopleRoof } from "react-icons/fa6";


import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { FaUsers } from "react-icons/fa";
import formatPrice from '../../../../utility_functions/formatPrice';
import RoleChip from "../../../employee/RoleChip";

const LandingCottages = ({ cottages }) => {

    return (
        <>
            {
                cottages.map(cottage => (
                    <Card key={cottage.id} sx={{ mb: 2, position: 'relative', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: '0.3s', width: '48%', ":hover": { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' } }}>

                        <CardMedia
                            key={cottage.id}
                            component="img"
                            height={'240'}
                            image={cottage.images[0].url}
                            alt={cottage.name}
                            sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                        />

                        <CardContent sx={{ padding: '16px' }}>
                            <Box display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography variant="h6" component="div">
                                    {cottage.name}
                                </Typography>
                                <RoleChip role={cottage.type} size="small" />
                                {!cottage.active ? <Chip label='Unavailable' /> : undefined}
                            </Box>

                            <Box display='flex' justifyContent='space-between' alignItems='center' mt={2} title={`Capacity: ${cottage.capacity}`}>
                                <Typography variant="body2">
                                    ₱{formatPrice(cottage.price)} / night
                                </Typography>
                                <Typography variant="body2" display='flex' justifyContent='space-between' alignItems='center' gap={.5}>
                                    {cottage.type === 'Family' ? <FaPeopleRoof /> : <FaUsers />} {cottage.capacity}
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary" fullWidth sx={{ mt: '16px' }}>
                                Book This Cottage
                            </Button>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
};

export default LandingCottages;


