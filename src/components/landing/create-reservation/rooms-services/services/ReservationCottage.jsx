import { Box, Button, Divider, Typography, useMediaQuery } from '@mui/material';
import useServices from '../../../../../hooks/reservation/useServices';
import CustomCarousel from '../../../../../utility_components/CustomCarousel';
import formatPrice from '../../../../../utility_functions/formatPrice';
import ViewCottage from './ViewCottage';
import { useTheme } from "@emotion/react";
import useDate from '../../../../../hooks/reservation/useDate';

const ReservationCottage = ({ cottage, addOns, isOther }) => {

    const {
        selectedCottages, pushNewCottage, removeCottage,
        selectedOthers, pushNewOther, removeOther,
    } = useServices();

    const { selectedDate } = useDate();

    const isAddedToBook = isOther ? (selectedOthers.length !== 0 ? selectedOthers.some(ctg => ctg.id === cottage.id) : false) : (selectedCottages.length !== 0 ? selectedCottages.some(ctg => ctg.id === cottage.id) : false);
    const push = isOther ? pushNewOther : pushNewCottage;
    const remove = isOther ? removeOther : removeCottage;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Box sx={{
            px: { xs: 2, sm: 4 },
            py: 4,
            borderBottom: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            backgroundColor: '#f0f8ff', // Light azure background
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 0, md: 2 },
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff' // White background for content box
            }}>
                {/* Images Column */}
                <Box sx={{ flex: 1 }}>
                    <CustomCarousel images={cottage.images} height={isMobile ? 200 : undefined} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flex: { xs: 0, sm: 1, md: 2 }, }}>
                    {/* Details Column */}
                    <Box sx={{ flex: 1, p: 3 }}>
                        <Typography variant="h5" component="div" fontWeight="bold"
                            sx={{ color: '#2c3e50' }}>{cottage.name}</Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom
                            sx={{ color: '#34495e' }}>{cottage.type}</Typography>
                        <Divider sx={{ mb: 2, width: '80%' }} />
                        {cottage.attributes.map(attribute => (
                            <Typography variant="body1" gutterBottom key={attribute.id}
                                sx={{ display: 'flex', alignItems: 'center', color: '#7f8c8d' }}>
                                {attribute.name}
                            </Typography>
                        ))}
                        <ViewCottage cottage={cottage} addOns={addOns} isOther={isOther} />
                    </Box>

                    {/* Price and Book Button Column */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        justifyContent: 'space-between',
                        bgcolor: { xs: '#f6f9f9', sm: '#ecf0f1' },
                        borderRadius: { xs: 0, md: '0 10px 10px 0' }
                    }}>
                        <Typography variant="h6" sx={{ color: '#2c3e50' }}>Price</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h4" color="primary"
                                sx={{ color: '#27ae60' }}>₱{formatPrice(cottage.price)}</Typography>
                            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>{selectedDate.duration >= 1 ? 'Per Day' : 'Daytime'}</Typography>
                        </Box>
                        <Box mt={{ xs: 2, sm: 'auto' }}>
                            {
                                isAddedToBook ?
                                    <Button variant="contained" color='error' fullWidth
                                        onClick={() => remove(cottage)}>
                                        Cancel
                                    </Button> :
                                    <Button variant="contained" fullWidth
                                        sx={{ bgcolor: '#27ae60', ":hover": { bgcolor: '#27ae60' } }}
                                        onClick={() => push(cottage)}>
                                        Book This
                                    </Button>
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReservationCottage;
