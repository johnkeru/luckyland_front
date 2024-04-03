// import { Box, Typography } from '@mui/material';
// import { grey } from '@mui/material/colors';
// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { useNavigate } from 'react-router';
// import useBookingSummaryReservation from '../../../hooks/useBookingSummaryReservation';
// import UploadingLoading from '../../../utility_components/UploadingLoading';
// import GCashIcon from '../../../utility_components/icons/GCashIcon';
// import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
// import cloudinaryUrl from '../../../utility_functions/cloudinaryUrl';
// import useUser from '../../../hooks/useUser';

// const GCashPayment = () => {
//     const [loading, setLoading] = useState(false);
//     const [imageUrl, setImageUrl] = useState(null);
//     const nav = useNavigate();
//     const { user } = useUser();

//     const { reservationId, resetAll,
//         // counter, setCounter
//     } = useBookingSummaryReservation();

//     function uploadGCashRefNumber(url) {
//         basicGetCall({
//             method: 'put',
//             endpoint: 'api/reservations/upload-gcash-reference-number/' + reservationId,
//             body: { gCashRefNumberURL: url },
//             hasToaster: true,
//             setResponse: console.log,
//             toasterDelay: 8000,
//             onSuccess: () => {
//                 if (user) {
//                     resetAll();
//                     nav('/dashboard/reservation');
//                 } else {
//                     resetAll();
//                     nav('/');
//                 }
//             }
//         })
//     }

//     const onDrop = useCallback(async (acceptedFiles) => {
//         // }
//         // setCounter(counter + 1);
//         const image = acceptedFiles[0];
//         setLoading(true);
//         const url = await cloudinaryUrl(image);
//         const secureUrl = url.secure_url;
//         setImageUrl(secureUrl);
//         uploadGCashRefNumber(secureUrl)
//         setLoading(false);
//     }, []); // if counter then put as dependency: counter

//     const { getRootProps, getInputProps } = useDropzone({ onDrop });

//     return (
//         <Box display='flex' gap={4}>
//             <Box width='30%'>
//                 <Typography variant='h6' fontWeight={600} gutterBottom>Resort's GCash: XXXXXXXXXX</Typography>
//                 <img src="/gcash-qr/mamgcash2.jpg" alt="Gcash" style={{ width: '100%', height: '500px', borderRadius: '8px', marginBottom: '8px' }} />
//             </Box>

//             <Box width='70%' display='flex' justifyContent='space-between' gap={3} bgcolor={grey[50]} border={'2px solid ' + grey[200]} p={2} borderRadius={3}>
//                 <Box py={1} width='50%' display='flex' flexDirection='column' justifyContent='space-between'>
//                     <Box>
//                         <Typography fontWeight={600} fontSize='20px' gutterBottom>Upload your screenshot of the reference code on the right side</Typography>
//                         <Typography gutterBottom >
//                             Before uploading the screenshot, please make sure to scan or input the GCash reference for payment shown on the left side.
//                         </Typography>
//                         <Typography gutterBottom >
//                             Additionally, ensure that the screenshot clearly displays the reference code for easy processing.
//                         </Typography>
//                         <Typography gutterBottom >
//                             Double-check the GCash reference to avoid any errors in payment processing.
//                         </Typography>
//                         {/* <Typography gutterBottom>
//                             If you made a mistake while uploading the screenshot of the GCash reference code, you can reupload it, but only three times. Your last uploaded screenshot will be the one to be checked.
//                         </Typography> */}
//                     </Box>

//                     <Typography>
//                         Thank you for choosing our resort for your reservation!
//                     </Typography>
//                 </Box>


//                 {!imageUrl ? <Box {...(!loading ? getRootProps() : {})}
//                     sx={{
//                         bgcolor: 'white',
//                         border: '4px dashed',
//                         borderColor: '#3b82f6',
//                         color: '#3b82f6',
//                         borderRadius: '8px',
//                         padding: '20px',
//                         cursor: loading ? 'not-allowed' : 'pointer',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: '50%',
//                         height: '100%',
//                         position: 'relative'
//                     }}
//                 >
//                     <input {...getInputProps()} />
//                     <Box sx={{ textAlign: 'center' }} >
//                         <GCashIcon height={70} width={70} color='#3b82f6' />
//                         <Typography variant='body2'>Upload your screenshot here</Typography>
//                         {loading && <UploadingLoading />}
//                     </Box>
//                 </Box> : <Box
//                     sx={{
//                         width: '50%',
//                         height: '100%',
//                     }}
//                 >
//                     {/* <Button variant='contained' size='small' sx={{ mb: 1 }} onClick={() => setImageUrl('')}>Re-upload</Button> */}
//                     <img src={imageUrl} alt="Gcash" style={{ width: '100%', height: '100%', borderRadius: '8px', marginBottom: '8px' }} />
//                 </Box>}
//             </Box>
//         </Box>
//     );
// };

// export default GCashPayment;



import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import GCashIcon from '../../../utility_components/icons/GCashIcon';
import { useNavigate } from 'react-router';
import useUser from '../../../hooks/useUser';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import useAfterReservation from '../../../hooks/reservation/useAfterReservation'
import useDate from '../../../hooks/reservation/useDate'
import InputIcon from '../../../utility_components/InputIcon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import * as yup from 'yup';
import useStepper from '../../../hooks/reservation/useStepper';
import useCustomer from '../../../hooks/reservation/useCustomer';
import useServices from '../../../hooks/reservation/useServices';

const validationSchema = yup.object().shape({
    gCashRefNumber: yup.string()
        .required('GCash Reference Number is required')
        .matches(/^[a-zA-Z0-9]{12}$/, 'Invalid GCash Reference Number'),
});


const GCashPayment = () => {
    const { reservationId, resetReservation, } = useAfterReservation();
    const { resetDate } = useDate();
    const { resetStepper } = useStepper();
    const { resetCustomer } = useCustomer();
    const { resetServices } = useServices();

    const resetAll = () => {
        resetReservation();
        resetDate();
        resetStepper();
        resetCustomer();
        resetServices();
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const { user } = useUser();

    const onSubmit = (data) => {
        basicGetCall({
            method: 'put',
            endpoint: 'api/reservations/upload-gcash-reference-number/' + reservationId,
            body: data,
            hasToaster: true,
            setLoading,
            toasterDelay: 8000,
            onSuccess: () => {
                if (user) {
                    resetAll();
                    nav('/dashboard/reservation');
                } else {
                    resetAll();
                    nav('/');
                }
            }
        })
    };

    return (
        <Box display='flex' gap={4}>
            <Box width='30%' display='flex' flexDirection='column' alignItems='center'>
                <Typography variant='h6' fontWeight={600} gutterBottom>Resort's GCash: XXXXXXXXXX</Typography>
                <img src="/gcash-qr/mamgcash2.jpg" alt="Gcash" style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '8px' }} />
            </Box>

            <Box width='70%' bgcolor={grey[50]} border={`2px solid ${grey[200]}`} borderRadius={3} p={2}>
                <Typography variant='h6' fontWeight={600} gutterBottom>GCash Reference Code</Typography>
                <Typography variant='body1' gutterBottom>
                    Please enter the GCash reference code provided for payment.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputIcon
                        name='gCashRefNumber'
                        label='GCash Reference Number'
                        fullWidth
                        Icon={GCashIcon}
                        errors={errors}
                        placeholder='Enter your GCash Reference Number here'
                        register={register}

                    />
                    <ButtonWithLoading
                        type="submit"
                        loading={loading}
                        loadingText='Submitting...'
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={!isValid}
                    >
                        Submit
                    </ButtonWithLoading>
                </form>
                <Typography variant='body1' mt={2}>
                    Thank you for choosing our resort for your reservation!
                </Typography>
            </Box>
        </Box>
    );
};

export default GCashPayment;
