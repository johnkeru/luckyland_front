import { Button } from '@mui/material'
import React from 'react'

const SimpleButtonWTextIcon = ({ Icon, text, color = 'info', onClick }) => {
    return (
        <Button variant='outlined' color={color} startIcon={Icon} onClick={onClick}>
            {text}
        </Button>
    )
}

export default SimpleButtonWTextIcon
