import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'

const Navbar = ({ showBackButton }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { dispatch, user } = useStoreon('user')

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLoginClick = () => {
        navigate('/login')
    };

    const handleregisterClick = () => {
        navigate('/signin')
    };

    const handleLogoutClick = () => {
        dispatch('user/logout')
        navigate('/')
    };

    const handleUserClick = () => {
        navigate('/info_user')
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleBackButtonClick = () => {
        navigate('/')
    };

    return (
        <div>
            <AppBar expand="lg" className="my-nav" sticky="top">
                <Toolbar>
                    {showBackButton && (
                        <IconButton onClick={handleBackButtonClick} color="inherit">
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    {user.isLoggedIn ? 
                        <Button onClick={handleMenuClick} variant="text" color="inherit">{user.correo}</Button> : 
                        <Button onClick={handleMenuClick} variant="text" color="inherit"> Perfil </Button>
                    }
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {user.isLoggedIn ? null : <MenuItem onClick={handleLoginClick}>Iniciar sesión</MenuItem>}
                        {user.isLoggedIn ? null : <MenuItem onClick={handleregisterClick}>Registrarse</MenuItem>}
                        {user.isLoggedIn ? <MenuItem onClick={handleUserClick}>Ver perfil</MenuItem> : null}
                        {user.isLoggedIn ? <MenuItem onClick={handleLogoutClick}>Cerrar sesión</MenuItem> : null} 
                    </Menu>
                    <Typography variant="h5" flexGrow={1}>
                        MedicEasy
                    </Typography>
                    <Button variant="text" color="inherit">
                        Exámenes
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar