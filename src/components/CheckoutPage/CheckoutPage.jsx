import React, { useState } from 'react';

import PaymentForm from './Forms/PaymentForm';
import CheckoutSuccess from './CheckoutSuccess';
import { styled } from '@mui/material/styles';

import useStyles from './styles';
import SenderForm from './Forms/SenderForm';
import ReceiverForm from './Forms/ReceiverForm';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const steps = ['Sender Details', 'Receiver Details', 'Payment Details'];

function _renderStepContent(step) {
	switch (step) {
		case 0:
			return <SenderForm />;
		case 1:
			return <ReceiverForm />;
		case 2:
			return <PaymentForm />;
		default:
			return <div>Not Found</div>;
	}
}
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));
export default function CheckoutPage() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const isLastStep = activeStep === steps.length - 1;

	function _sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function _submitForm(values) {
		console.log("Submit")
		await _sleep(1000);
		// alert(JSON.stringify(values, null, 2));

		setActiveStep(activeStep + 1);
	}

	function _handleSubmit(values, actions) {
		if (isLastStep) {
			_submitForm(values, actions);
		} else {
			setActiveStep(activeStep + 1);
		}
	}

	function _handleBack() {
		setActiveStep(activeStep - 1);
	}
	function ColorlibStepIcon(props) {
		const { active, completed, className } = props;

		const icons = {
			1: <GroupRemoveIcon />,
			2: <GroupAddIcon />,
			3: <AccountBalanceIcon />,
		};

		return (
			<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
				{icons[String(props.icon)]}
			</ColorlibStepIconRoot>
		);
	}
	return (
		<React.Fragment>
			<Typography component="h1" variant="h4" align="center">
				Payment
			</Typography>
			<Stepper activeStep={activeStep} className={classes.stepper}>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<React.Fragment>
				{activeStep === steps.length ? (
					<CheckoutSuccess />
				) : (
					<div>
						{_renderStepContent(activeStep)}
						<div className={classes.buttons}>
							{activeStep !== 0 && (
								<Button onClick={_handleBack} className={classes.button}>
									Back
								</Button>
							)}
							<div className={classes.wrapper}>
								<Button
									variant="contained"
									color="primary"
									onClick={_handleSubmit}
									className={classes.button}
								>
									{isLastStep ? 'Fund Transfer' : 'Next'}
								</Button>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		</React.Fragment>
	);
}
