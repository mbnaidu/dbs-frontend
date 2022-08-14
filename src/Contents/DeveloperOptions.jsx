import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TranslateIcon from '@mui/icons-material/Translate';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Slide, TextField } from '@mui/material';
import { presentLanguage } from '../res/Values';

const actions = [
    { icon: <TranslateIcon />, name: 'Language' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeveloperOtions() {
    const [open, setOpen] = React.useState(false);
    const [openLanguageModal, setOpenLanguageModal] = React.useState(false);
    const [currency, setCurrency] = React.useState(localStorage.getItem('currentLanguage') || 'en');
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
            default:
                break;
        }
    }
    return (
        <>
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
                            bgcolor: 'red',
                            '&:hover': {
                                bgcolor: 'black',
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
