import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { navigate } from '@store'
import { stylesButton } from './Navbar.module.css';
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

    const handleAddHospitalClick = () => {
        navigate('/addhospital')
    };

    const hadleUpdateHospitalClick = () => {
        navigate('/updatehospital')
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

    const handleExamenesClick = () => {
        navigate('/examenes')
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
                        <Button className={stylesButton} onClick={handleMenuClick} variant="text" color="inherit">{user.correo}</Button> : 
                        <Button className={stylesButton} onClick={handleMenuClick} variant="text" color="inherit"> Perfil </Button>
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
                        {user.isLoggedIn ? <MenuItem onClick={handleAddHospitalClick}>Agregar hospital</MenuItem> : null} 
                        {user.isLoggedIn && user.tipo === 'manager' ? <MenuItem onClick={hadleUpdateHospitalClick}>Actualizar hospital</MenuItem> : null}
                    </Menu>
                    <Typography variant="h5" flexGrow={1}>
                        MedicEasy
                    </Typography>
                    <Button className={stylesButton} variant="text" color="inherit" onClick={handleExamenesClick}>
                        Exámenes
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar