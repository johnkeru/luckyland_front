import { Badge, Dialog, DialogTitle, IconButton, Slide, responsiveFontSizes, styled, useMediaQuery, useTheme } from '@mui/material'
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const Modal = ({ button, open, handleOpen, handleClose, loading, children, title, maxWidth = 'md', badge, element = 'div', handleSubmit, sx, transition = false }) => {


    let theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    theme = responsiveFontSizes(theme); // Apply responsive font sizes to the theme

    return (
        <>
            {badge ? <Badge badgeContent={badge > 9 ? '9+' : badge} color='error'>
                {cloneElement(button, { onClick: handleOpen })}
            </Badge> : cloneElement(button, { onClick: handleOpen })}

            <BootstrapDialog
                TransitionComponent={transition ? Transition : undefined}
                onClose={handleOpen}
                aria-labelledby="customized-dialog-title"
                fullScreen={fullScreen}
                open={open}
                maxWidth={maxWidth}
                PaperProps={{
                    component: element,
                    onSubmit: handleSubmit && handleSubmit
                }}
                sx={sx}
            >

                {title && <DialogTitle sx={{ m: 0, py: 1, px: 2, fontSize: theme.typography.pxToRem(28) }} id="customized-dialog-title">
                    {title}
                </DialogTitle>}
                <IconButton
                    title='close'
                    aria-label="close"
                    onClick={loading ? undefined : handleClose}
                    disabled={loading}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 8,
                        color: 'red',
                    }}
                >
                    <IoClose />
                </IconButton>

                {children}

            </BootstrapDialog>
        </>
    )
}

export default Modal