import { Badge, Dialog, DialogTitle, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { cloneElement } from 'react'
import { IoClose } from 'react-icons/io5'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Modal = ({ button, open, handleOpen, handleClose, loading, children, title = 'Modal Title', maxWidth = 'md', badge }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {badge ? <Badge content={badge}>
                {cloneElement(button, { onClick: handleOpen })}
            </Badge> : cloneElement(button, { onClick: handleOpen })}

            <BootstrapDialog
                onClose={handleOpen}
                aria-labelledby="customized-dialog-title"
                fullScreen={fullScreen}
                open={open}
                maxWidth={maxWidth}
            >

                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    title='close'
                    aria-label="close"
                    onClick={loading ? undefined : handleClose}
                    disabled={loading}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <IoClose className=" text-red-500 " />
                </IconButton>

                {children}

            </BootstrapDialog>
        </>
    )
}

export default Modal