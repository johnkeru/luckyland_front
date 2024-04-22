import { Box, Typography } from '@mui/material';

export default function Widget() {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, padding: 4 }}>

            <Box sx={{ maxWidth: 'sm', borderRadius: 'rounded', overflow: 'hidden', boxShadow: 'shadow-lg' }}>
                <img src="https://placehold.co/400x300" alt="River Spirit Casino Resort" style={{ width: '100%' }} />
                <Box sx={{ px: 6, py: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>River Spirit Casino Resort</Typography>
                    <Typography variant="body1" sx={{ color: 'text.zinc700' }}>
                        Tulsa, Oklahoma<br />
                        Architect: HKS, Inc.<br />
                        General Contractor: Manhattan Construction Co.
                    </Typography>
                </Box>
            </Box>


            <Box sx={{ maxWidth: 'sm', borderRadius: 'rounded', overflow: 'hidden', boxShadow: 'shadow-lg' }}>
                <img src="https://placehold.co/400x300" alt="IMT Prestonwood Apartments" style={{ width: '100%' }} />
                <Box sx={{ px: 6, py: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>IMT Prestonwood Apartments</Typography>
                    <Typography variant="body1" sx={{ color: 'text.zinc700' }}>
                        Dallas, Texas<br />
                        Architect: BGO Architects<br />
                        General Contractor: IMT Real Estate Group
                    </Typography>
                </Box>
            </Box>


            <Box sx={{ maxWidth: 'sm', borderRadius: 'rounded', overflow: 'hidden', boxShadow: 'shadow-lg' }}>
                <img src="https://placehold.co/400x300" alt="Mercedes Benz of The Woodlands" style={{ width: '100%' }} />
                <Box sx={{ px: 6, py: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Mercedes Benz of The Woodlands</Typography>
                    <Typography variant="body1" sx={{ color: 'text.zinc700' }}>
                        The Woodlands, Texas<br />
                        Architect: Praxis 3<br />
                        General Contractor: Wier Enterprises
                    </Typography>
                </Box>
            </Box>


            <Box sx={{ maxWidth: 'sm', borderRadius: 'rounded', overflow: 'hidden', boxShadow: 'shadow-lg' }}>
                <img src="https://placehold.co/400x300" alt="Dallas Fire Station #27" style={{ width: '100%' }} />
                <Box sx={{ px: 6, py: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Dallas Fire Station #27</Typography>
                    <Typography variant="body1" sx={{ color: 'text.zinc700' }}>
                        Dallas, Texas<br />
                        Architect: Perkins + Will, Inc.<br />
                        General Contractor: Bartlett Cocke General Contractors
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
