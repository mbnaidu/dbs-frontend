import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import HeaderLogo from '../Assets/headerlogo.png';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const pages = [
    { title: 'Dashboard', route: "/dashboard" },
    { title: 'Customers', route: "/customers" },
    { title: 'Transactions', route: "/transactions" },
    { title: 'Transaction', route: "/transaction" },
    { title: 'Logout', route: "/logout" },
];

const Header = () => {
    let navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {

        const data = {
            empName: localStorage.getItem("session")
        }
        Axios.post("http://localhost:8081/employee/logout", data)
            .then((response) => {
                if (response.data === "logged Out") {
                    localStorage.clear();
                    window.location.reload();
                }
            })
            .catch((err) => { console.log(err) })
    }
    const DesktopView = () => {
        return (
            <div>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page.title}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', px: 10 }}
                        >
                            <div
                                onClick={() => page.route === '/logout' ? handleLogout() : navigate(page.route)}
                                style={{
                                    fontSize: 20,
                                    backgroundColor: 'transparent',
                                    borderWidth: 0,
                                    color: 'white',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}>
                                {page.title}
                            </div>
                        </Button>
                    ))}
                </Box>
            </div>
        )
    }
    const MobileView = () => {
        return (
            <div>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                <div style={{ fontSize: 20 }} onClick={() => page.route === '/logout' ? handleLogout() : navigate(page.route)}>{page.title}</div>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </div>
        )
    }
    return (
        <AppBar position="static" style={{ background: 'linear-gradient(10deg, rgb(0, 0, 0) 0%, rgb(216, 17, 43) 50%, rgb(0, 0, 0) 100%)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={HeaderLogo} alt="headerLogo" width="300" height="80" />
                    {MobileView()}
                    {DesktopView()}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
