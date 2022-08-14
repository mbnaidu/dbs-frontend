import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TranslateIcon from '@mui/icons-material/Translate';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Slide, TextField } from '@mui/material';
import { presentLanguage } from '../res/Values';
import PaletteIcon from '@mui/icons-material/Palette';
import { firstTheme, secondTheme } from '../Globals/GlobalValues';

const actions = [
    { icon: <TranslateIcon />, name: 'Language' },
    { icon: <PaletteIcon />, name: 'Theme' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeveloperOtions() {
    const [open, setOpen] = React.useState(false);
    const [openLanguageModal, setOpenLanguageModal] = React.useState(false);
    const [openThemeModal, setOpenThemeModal] = React.useState(false);
    const [currency, setCurrency] = React.useState(localStorage.getItem('currentLanguage') || 'en');
    const [theme1Color, setTheme1Color] = React.useState("");
    const [theme2Color, setTheme2Color] = React.useState("");
    const handleChange = (event) => {
        setCurrency(event.target.value);
        localStorage.setItem('currentLanguage', event.target.value);
        window.location.reload();
    };
    const currencies = [
        {
            value: 'tel',
            label: 'Telugu',
        },
        {
            value: 'en',
            label: 'English',
        },
        {
            value: 'hi',
            label: 'Hindi',
        },
    ];
    const handleCloseNavMenu = (event) => {
        switch (event.name) {
            case "Language":
                setOpenLanguageModal(true);
                break;
            case "Theme":
                setOpenThemeModal(true);
                break;
            default:
                break;
        }
    }
    // const handleTheme = () => {
    //     localStorage.setItem('firstTheme', theme1Color);
    //     localStorage.setItem('secondTheme', theme2Color);
    // }
    const handleTheme1 = (ev) => {
        const color = ev.target.value
        setTheme1Color(color)
        const r = parseInt(color.substr(1, 2), 16)
        const g = parseInt(color.substr(3, 2), 16)
        const b = parseInt(color.substr(5, 2), 16)
        localStorage.setItem('firstTheme', `rgb(${r}, ${g}, ${b})`);
    }
    const handleTheme2 = (ev) => {
        const color = ev.target.value
        setTheme2Color(color)
        const r = parseInt(color.substr(1, 2), 16)
        const g = parseInt(color.substr(3, 2), 16)
        const b = parseInt(color.substr(5, 2), 16)
        localStorage.setItem('secondTheme', `rgb(${r}, ${g}, ${b})`);
    }
    return (
        <>
            <Dialog
                open={openThemeModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { setOpenThemeModal(false); }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Change Application Theme</DialogTitle>
                <DialogContent
                    sx={{
                        width: 500,
                    }}>
                    <div>
                        <div style={{ display: 'flex' }}>
                            <h2 style={{ color: theme1Color }}>Theme 1 Color : </h2>
                            <TextField type="color" style={{ width: 100 }} value={theme1Color} onChange={(e) => handleTheme1(e)} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h2 style={{ color: theme2Color }}>Theme 2 Color : </h2>
                            <TextField type="color" style={{ width: 100 }} value={theme2Color} onChange={(e) => handleTheme2(e)} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenThemeModal(false); window.location.reload() }}>Agree</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openLanguageModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { setOpenLanguageModal(false) }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{presentLanguage.word_Change_APP_Language}</DialogTitle>
                <DialogContent
                    sx={{
                        width: 500,
                    }}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label={presentLanguage.word_Select}
                        value={currency}
                        onChange={handleChange}
                        helperText={presentLanguage.word_Please_select_APP_language}
                        variant="standard"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenLanguageModal(false) }}>Agree</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ height: 400, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    open={open}
                    onClick={() => setOpen(!open)}
                    direction={'down'}
                    FabProps={{
                        sx: {
                            bgcolor: firstTheme,
                            '&:hover': {
                                bgcolor: secondTheme,
                            }
                        }
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => handleCloseNavMenu(action)}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
}
