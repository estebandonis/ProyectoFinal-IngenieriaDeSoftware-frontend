import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { navigate } from '@store'
import { useStoreon } from 'storeon/react'

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {dispatch, user } = useStoreon('user')

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

    return (
        <div>
            <AppBar expand="lg" className="my-nav" sticky="top">
                <Toolbar>
                    <IconButton color='inherit' onClick={handleMenuClick}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {
                            user.isLoggedIn ? null : <MenuItem onClick={handleLoginClick}>Iniciar sesión</MenuItem>
                        }
                        {
                            user.isLoggedIn ? null : <MenuItem onClick={handleregisterClick}>Registrarse</MenuItem>
                        }
                        {
                            user.isLoggedIn ? <MenuItem onClick={handleLogoutClick}>Cerrar sesión</MenuItem> : null
                        }
                    </Menu>
                    <Typography variant="h5" flexGrow={1}>
                        MedicEasy
                    </Typography>

                    {
                        user.isLoggedIn ? <Button onClick={handleUserClick} variant="text" color="inherit">{user.correo}</Button> : null
                    }
                    <Button variant="text" color="inherit">
                        Exámenes
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar