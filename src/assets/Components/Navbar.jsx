import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    return (
        <div>
            <AppBar expand="lg" className="my-nav" sticky="top">
                <Toolbar>
                    <IconButton color='inherit'>
                        <MenuIcon/>
                    </IconButton>
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