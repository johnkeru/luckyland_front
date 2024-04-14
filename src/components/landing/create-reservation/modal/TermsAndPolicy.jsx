import { Box, Button, Checkbox, DialogContent, FormControl, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import useStepper from '../../../../hooks/reservation/useStepper';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';

const TermsAndPolicy = ({ setPolicyPopUp }) => {
    const nav = useNavigate();
    const { privacyPolicy, setPrivacyPolicy } = useStepper();

    const handleMinimumChange = (event) => {
        setPrivacyPolicy({
            ...privacyPolicy,
            isMinimumAccepted: event.target.checked
        });
    };

    const handlePaymentWithinDayChange = (event) => {
        setPrivacyPolicy({
            ...privacyPolicy,
            isPaymentWithinDay: event.target.checked
        });
    };

    const handleCancel = () => nav('/')

    const handleConfirmation = () => {
        if (privacyPolicy.isMinimumAccepted && privacyPolicy.isPaymentWithinDay) {
            setPrivacyPolicy({
                ...privacyPolicy,
                isConfirmed: true
            });
            setPolicyPopUp(false);
            // Perform further actions upon confirmation
        } else {
            alert("Please agree to all terms before proceeding.");
        }
    };

    return (
        <>
            <DialogContent dividers>
                <Typography variant="h5" color="primary">
                    Important: Please read and agree to the following terms and policy before proceeding:
                </Typography>

                <div>
                    <Typography my={1} color='GrayText'>
                        When booking a stay at our resort, please take note of the following rules and guidelines:
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        1. SETTLEMENT OF PAYMENT: Guests must pay a minimum of five hundred pesos (500.00) installment fee through Gcash by then reference code is asked to proceed with the reservation.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        2. All payment must be made in accordance with the payment method (Gcash) accepted by Luckyland Resort.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        3. Failure to make payment may result in the cancellation of the reservation.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        4. The resort strictly implements “NO INITIAL PAYMENT, NO RESERVATION”.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        5. The reservation remains valid until three hours past the designated time. After this period, the reservation is automatically canceled.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        6. Re-booking reservations are accepted within the day.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        7. 1 to 3 days prior cancellation after approved reservation.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        8. STRICTLY 50% of the initial payment will be returned if canceled.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        9. The check-in time is at 2:00 PM, and guests are required to check out by 12:00 PM.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        10. Guests desiring early check-in are kindly invited to relax and await their accommodations in the welcoming lobby area.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        11. Upon arriving, any remaining balance must be settled at the front desk.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        12. If you are unable to use your room and fail to arrive before check-in time without informing the resort front desk of your late arrival, rooms will be released and the initial reservation fee will be forfeited.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        13. Senior citizens must present their identification card.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        We thank you for choosing Luckyland Resort for your stay. By accepting these terms and conditions, you understand and agree to follow the resort's rules and guidelines. If you need any help or have questions during your stay, please feel free to reach out to our front desk. We hope you have a wonderful and unforgettable experience at Luckyland Resort.
                    </Typography>
                </div>

                <FormControl sx={{ width: '100%', borderTop: '1px solid #ddd', pt: 1 }} component="fieldset" variant="standard">
                    <FormGroup>
                        <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Box>
                                <Typography variant="body1" color="primary">
                                    To proceed with your transaction, a minimum payment of 500 pesos is required. By checking this box, you acknowledge and agree to adhere to this requirement.
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={privacyPolicy.isMinimumAccepted}
                                            onChange={handleMinimumChange}
                                            color="primary"
                                        />
                                    }
                                    label={<Typography >I understand and agree to the minimum payment requirement.</Typography>}
                                />

                                <Typography variant="body1" color="primary">
                                    It's crucial to make the payment within only 3 hours of accepting this policy. Failure to do so may result in delays or cancellation of your transaction. By checking this box, you confirm your commitment to timely payment.
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={privacyPolicy.isPaymentWithinDay}
                                            onChange={handlePaymentWithinDayChange}
                                            color="primary"
                                        />
                                    }
                                    label={<Typography>I agree to make the payment within only 3 hours.</Typography>}
                                />

                            </Box>
                        </Grid>
                    </FormGroup>
                </FormControl>
            </DialogContent>

            <CommonFooter>
                <Button
                    variant="contained" size='medium'
                    color="error"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmation}
                    disabled={!privacyPolicy.isMinimumAccepted || !privacyPolicy.isPaymentWithinDay || privacyPolicy.isConfirmed}
                >
                    Confirm
                </Button>
            </CommonFooter>
        </>
    )
}

export default TermsAndPolicy;
