
import { responsiveFontSizes } from '@mui/material';
import { cyan } from '@mui/material/colors';
import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
	palette: {
		type: 'dark',
		primary: cyan,
		secondary: cyan
	}
});

theme = responsiveFontSizes(theme);

const useStyle = makeStyles(() => ({
	root: {
		height: 200,
		width: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	}
}));

export { theme, useStyle };
