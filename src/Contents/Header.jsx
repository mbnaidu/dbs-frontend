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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { presentLanguage } from '../res/Values';
import { bgColor } from '../Globals/GlobalValues';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Header = () => {
    let navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const pages = [
        { title: presentLanguage.word_Dashboard, route: "/dashboard" },
        { title: presentLanguage.word_Customers, route: "/customers" },
        { title: presentLanguage.word_Transactions, route: "/transactions" },
        { title: presentLanguage.word_Transaction, route: "/transaction" },
        { title: presentLanguage.word_Logout, route: "/logout" },
    ];
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
                    localStorage.removeItem("session");
                    localStorage.removeItem("developerMode");
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
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Developer Mode"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please PRESS on OK to go developer mode.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { localStorage.removeItem("developerMode"); setOpen(false); window.location.reload(); }}>No</Button>
                    <Button onClick={() => { localStorage.setItem("developerMode", true); setOpen(false); window.location.reload(); }}>Ok</Button>
                </DialogActions>
            </Dialog>
            <AppBar position="static" style={{ background: bgColor }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters style={{ height: 80 }}>
                        <img src={HeaderLogo} alt="headerLogo" width="300" height="80" style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
                        {MobileView()}
                        {DesktopView()}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};
export default Header;
