import { DialogActions } from '@mui/material'
import React from 'react'

const CommonFooter = ({ children }) => {
    return (
        <DialogActions sx={{ my: .5 }}>{children}</DialogActions>
    )
}

export default CommonFooter