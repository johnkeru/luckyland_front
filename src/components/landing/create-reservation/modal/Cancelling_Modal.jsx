import { Button, DialogContent, Typography } from '@mui/material'
import React from 'react'
import Modal from '../../../../utility_components/modal/Modal'
import CommonFooter from '../../../../utility_components/modal/CommonFooter'
import ButtonWithLoading from '../../../../utility_components/ButtonWithLoading'

const Cancelling_Modal = ({ cancelling, setCancelling, handleCancel, loading, disabled }) => {

    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>;

    return (
        <Modal
            hasCloseIcon={false}
            button={hiddenButton}
            open={cancelling}
            maxWidth="sm"
            title="Cancelling"
            children={
                <>
                    <DialogContent dividers>
                        <Typography variant="body1">
                            Are you sure you want to cancel your reservation?
                        </Typography>
                    </DialogContent>

                    <CommonFooter>
                        <Button
                            onClick={() => setCancelling(false)}
                            variant="contained"
                            color='info'
                            disabled={disabled}
                            size='large'
                        >
                            No
                        </Button>

                        <ButtonWithLoading
                            loading={loading}
                            disabled={disabled}
                            variant="contained"
                            onClick={handleCancel}
                            color='error'
                        >
                            Yes
                        </ButtonWithLoading>
                    </CommonFooter>
                </>
            }
        />
    )
}

export default Cancelling_Modal
