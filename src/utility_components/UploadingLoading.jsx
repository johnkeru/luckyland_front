import { Box, CircularProgress } from "@mui/material";

const UploadingLoading = () => {
    return (
        <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            m={'auto'}
            width={"100%"}
            height={'100%'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={10}
            sx={{ backgroundColor: 'rgba(0,0,0,.3)' }}
        >
            <CircularProgress color="primary" size={40} thickness={4} />
        </Box>
    );
}

export default UploadingLoading;