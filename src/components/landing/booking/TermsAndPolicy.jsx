import { Box, Button, Checkbox, DialogContent, FormControl, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import useBookingSummary from '../../../hooks/useBookingSummary';
import CommonFooter from '../../../utility_components/modal/CommonFooter';

const TermsAndPolicy = ({ handleClosePolicyPopUp, handleClose }) => {
  const { privacyPolicy, setPrivacyPolicy } = useBookingSummary();

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

  const handleConfirmation = () => {
    if (privacyPolicy.isMinimumAccepted && privacyPolicy.isPaymentWithinDay) {
      setPrivacyPolicy({
        ...privacyPolicy,
        isConfirmed: true
      });
      handleClosePolicyPopUp();
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
            1. Check-in time is at 3:00 PM and check-out time is at 11:00 AM. Early check-ins and late check-outs are subject to availability and additional charges.
          </Typography>
          <Typography my={1} color='GrayText'>
            2. Guests must present a valid ID and credit card upon check-in. The credit card will be authorized for incidentals.
          </Typography>
          <Typography my={1} color='GrayText'>
            3. Smoking is strictly prohibited in all indoor areas. Designated smoking areas are available outside the resort premises.
          </Typography>
          <Typography my={1} color='GrayText'>
            4. Pets are not allowed on the resort premises unless they are service animals.
          </Typography>
          <Typography my={1} color='GrayText'>
            5. Noise disturbances and disruptive behavior will not be tolerated, and guests may be asked to leave without a refund if they fail to adhere to quiet hours and resort policies.
          </Typography>
          <Typography my={1} color='GrayText'>
            6. Guests are responsible for any damages caused to the resort property during their stay.
          </Typography>
          <Typography my={1} color='GrayText'>
            7. All guests must follow local laws and regulations, including those related to COVID-19 safety protocols, during their stay.
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
          onClick={handleClose}
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
