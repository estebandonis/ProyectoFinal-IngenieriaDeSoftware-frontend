import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { navigate } from '@store'
import estilos from './Navbar.module.css';
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

    const handleLogoutClick = () => {
        dispatch('user/logout')
        navigate('/')
    };

    const handleAddHospitalClick = () => {
        navigate('/addhospital')
    };

    const handleUpdateHospitalClick = () => {
        navigate('/updatehospital')
    };

    const handleHospitalReviewsClick = () => {
        navigate('/managereviews')
    };

    const handleUserClick = () => {
        navigate('/info_user')
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    };
    
    const handleBackButtonClick = () => {
        window.history.back();
    };
    

    const handleExamenesClick = () => {
        navigate('/examenes')
    };

    return (
        <div>
            <AppBar expand="lg" className={estilos.styles} sticky="top">
                <Toolbar>
                    {showBackButton && (
                        <IconButton onClick={handleBackButtonClick} color="inherit">
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Box display="flex" justifyContent="start" width="33%">
                        {user.isLoggedIn ? 
                            <Button className={estilos.stylesButton} onClick={handleMenuClick} variant="text" color="inherit" >{user.correo}</Button> : 
                            <Button className={estilos.stylesButton} onClick={handleMenuClick} variant="text" color="inherit"> Perfil </Button>
                        }
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {user.isLoggedIn ? null : <MenuItem onClick={handleLoginClick}>Ingresar</MenuItem>}
                            {user.isLoggedIn ? <MenuItem onClick={handleUserClick}>Ver perfil</MenuItem> : null}
                            {user.isLoggedIn ? <MenuItem onClick={handleLogoutClick}>Cerrar sesión</MenuItem> : null} 
                            {user.isLoggedIn ? <MenuItem onClick={handleAddHospitalClick}>Agregar hospital</MenuItem> : null} 
                            {user.isLoggedIn && user.tipo === 'manager' ? <MenuItem onClick={handleUpdateHospitalClick}>Actualizar hospital</MenuItem> : null}
                            {user.isLoggedIn && user.tipo === 'manager' ? <MenuItem onClick={handleHospitalReviewsClick}>Reseñas de hospitales</MenuItem> : null}
                        </Menu>
                    </Box>
                    <Box display="flex" justifyContent="center" flexBasis="33%">
                        <Typography variant="h5">
                            MedicEasy
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="end" flexBasis="33%">
                        <Button className={estilos.stylesButton} variant="text" color="inherit" onClick={handleExamenesClick}>
                            Exámenes
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar