import { Box, Button } from '@mui/material'
import React from 'react'

const ButtonIconText = ({ size = 'sm', color = 'info', variant = 'contained', disabled = false, getRootProps = () => { }, getInputProps = null, Icon, text = '', onClick }) => {
    return (
        <Button sx={{ display: 'flex', gap: 1 }} size={size} color={color} variant={variant} onClick={onClick} {...getRootProps()} disabled={disabled}>
            <Box sx={{ fontSize: '1rem' }}>
                {Icon}
            </Box>
            {getInputProps ? <input {...getInputProps()} /> : undefined} {/* optional when there's an image. */}
            {text}
        </Button>
    )
}

export default ButtonIconText