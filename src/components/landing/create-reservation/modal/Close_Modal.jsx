import { Button, DialogContent, Typography } from '@mui/material'
import React from 'react'
import Modal from '../../../../utility_components/modal/Modal'
import CommonFooter from '../../../../utility_components/modal/CommonFooter'

const Close_Modal = ({ handleSureClose, closeModalOpen, setCloseModalOpen, closeModalText }) => {

    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>

    const handleNo = () => setCloseModalOpen(false);

    return (
        <Modal
            hasCloseIcon={false}
            button={hiddenButton}
            open={closeModalOpen}
            maxWidth="sm"
            title='Warning'
            children={
                <>
                    <DialogContent dividers sx={{ width: '400px' }}>
                        <Typography variant="body1">
                            Are you sure you want to {closeModalText}? This will erase all the data.
                        </Typography>
                    </DialogContent>

                    <CommonFooter>
                        <Button
                            onClick={handleNo}
                            variant="contained"
                            color="info"
                        >
                            No
                        </Button>
                        <Button
                            onClick={handleSureClose}
                            variant="contained"
                            color='error'
                        >
                            Yes, I'm sure
                        </Button>
                    </CommonFooter>
                </>
            }
        />
    )
}

export default Close_Modal
