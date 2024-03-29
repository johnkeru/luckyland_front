import { Button } from '@mui/material'
import React from 'react'
import Login from '../components/landing/login/Login'
import { useNavigate } from 'react-router'


const LandingPage = () => {
    const nav = useNavigate();
    return (
        <div>
            <Login />
            <Button onClick={() => nav('/reservation')}>Reservation</Button>
        </div>
    )
}

export default LandingPage