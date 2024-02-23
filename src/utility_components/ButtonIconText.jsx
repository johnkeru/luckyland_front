import { Box, Button, CircularProgress } from '@mui/material'
import React from 'react'

const ButtonIconText = ({
    size = 'small',
    color = 'info',
    variant = 'contained',
    disabled = false,
    loading = false,
    loadingText,
    Icon, // required
    text = 'Button', // required
    onClick,

    getRootProps = () => { }, // not much important (only use for upload image button)
    getInputProps = null, // not much important (only use for upload image button)
}) => {
    return (
        <Button
            sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
            size={size}
            color={color}
            variant={variant}
            onClick={onClick}
            {...getRootProps()}
            disabled={disabled}
        >
            <Box sx={{ fontSize: '1rem', display: 'flex', }}>
                {loading ? <CircularProgress size={20} color="inherit" /> : Icon}
            </Box>
            {getInputProps ? <input {...getInputProps()} /> : undefined} {/* optional when there's an image. */}
            {loadingText && loading ? loadingText : text}
        </Button>
    )
}

export default ButtonIconText