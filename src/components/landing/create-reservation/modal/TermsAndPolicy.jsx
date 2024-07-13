import { Button, Checkbox, DialogContent, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import useStepper from '../../../../hooks/reservation/useStepper';
import CommonFooter from '../../../../utility_components/modal/CommonFooter';

const TermsAndPolicy = ({ setPolicyPopUp }) => {
    const nav = useNavigate();
    const { privacyPolicy, setPrivacyPolicy } = useStepper();

    const handleCheck = (event) => {
        setPrivacyPolicy({
            ...privacyPolicy,
            isChecked: event.target.checked
        });
    };

    const handleCancel = () => nav('/')

    const handleConfirm = () => {
        if (privacyPolicy.isChecked) {
            setPrivacyPolicy({
                ...privacyPolicy,
                isConfirmed: true
            });
            setPolicyPopUp(false);
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
                        3. The resort strictly implements “NO INITIAL PAYMENT, NO RESERVATION”.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        4. The reservation is no longer valid if the check-in date has passed.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        5. Re-booking reservations are accepted until the check-in date.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        6.  Please note that no refunds will be issued for cancellations.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        7. The check-in time is at 2:00 PM, and guests are required to check out by 12:00 PM.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        8. Guests desiring early check-in are kindly invited to relax and await their accommodations in the welcoming lobby area.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        9. Upon arriving, any remaining balance must be settled at the front desk.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        10. Senior citizens must present their identification card.
                    </Typography>
                    <Typography my={1} color='GrayText'>
                        We thank you for choosing Luckyland Resort for your stay. By accepting these terms and conditions, you understand and agree to follow the resort's rules and guidelines. If you need any help or have questions during your stay, please feel free to reach out to our front desk. We hope you have a wonderful and unforgettable experience at Luckyland Resort.
                    </Typography>
                </div>

                <FormControl sx={{ width: '100%', borderTop: '1px solid #ddd', pt: 1 }} component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={privacyPolicy.isMinimumAccepted}
                                    onChange={handleCheck}
                                    color="primary"
                                />
                            }
                            label={<Typography>I accept the terms and policy.</Typography>}
                        />
                    </FormGroup>
                </FormControl>
            </DialogContent>

            <CommonFooter>
                <Button
                    variant="contained"
                    size='large'
                    color="error"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    size='large'
                    color="info"
                    onClick={handleConfirm}
                    disabled={!privacyPolicy.isChecked || privacyPolicy.isConfirmed}
                >
                    Confirm
                </Button>
            </CommonFooter>
        </>
    )
}

export default TermsAndPolicy;
