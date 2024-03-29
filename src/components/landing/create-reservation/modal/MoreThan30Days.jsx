import { Button, DialogContent, Typography } from '@mui/material'
import React from 'react'
import Modal from '../../../../utility_components/modal/Modal'
import CommonFooter from '../../../../utility_components/modal/CommonFooter'

const Morethan30DaysModal = ({ handleCloseIsMoreThan30Days, isMoreThan30Days, }) => {

    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>;

    return (
        <Modal
            hasCloseIcon={false}
            button={hiddenButton}
            open={isMoreThan30Days}
            maxWidth="sm"
            title='Attention'
            children={
                <>
                    <DialogContent dividers sx={{ width: '400px' }}>
                        <Typography variant="body1">
                            We're sorry, but reserving room for more than 30 days are not allowed. If you wish to book for more than 30 days, please contact us at Luckyland.resort58@gmail.com
                        </Typography>
                    </DialogContent>

                    <CommonFooter>
                        <Button
                            onClick={handleCloseIsMoreThan30Days}
                            variant="contained"
                            color='error'
                        >
                            Close
                        </Button>
                    </CommonFooter>
                </>
            }
        />
    )
}

export default Morethan30DaysModal
