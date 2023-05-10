import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { navigate } from '@store'
const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLoginClick = () => {
        navigate('/login')
    };

    const handleregisterClick = () => {
        navigate('/signin')
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
                        <MenuItem onClick={handleLoginClick}>Iniciar sesión</MenuItem>
                        <MenuItem onClick={handleregisterClick}>Registrarse</MenuItem>
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