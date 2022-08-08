import React, { useState } from 'react';

import PaymentForm from './Forms/PaymentForm';
import CheckoutSuccess from './CheckoutSuccess';
import { styled } from '@mui/material/styles';

import useStyles from './styles';
import SenderForm from './Forms/SenderForm';
import ReceiverForm from './Forms/ReceiverForm';
import { Fab, Step, StepLabel, Stepper, Typography } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import SavingsIcon from '@mui/icons-material/Savings';
import TransferTypeForm from './Forms/TransferTypeForm';
import Axios from 'axios';

const steps = ["Transfer Type", 'Sender Details', 'Receiver Details', 'Payment Details'];

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

	const [SenderAccNo, setSenderAccNo] = useState("");
	const [ReceiverAccNo, setReceiverAccNo] = useState("");
	const [TransferTypeData, setTransferTypeData] = useState("");
	const [IsSenderInfoDone, setIsSenderInfoDone] = useState(false);
	const [IsReceiverInfoDone, setIsReceiverInfoDone] = useState(false);
	const [IsTransferTypeDone, setIsTransferTypeDone] = useState(false);
	function _sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	// useEffect(() => { console.log(IsReceiverInfoDone, IsSenderInfoDone); _handleSubmit() }, [IsReceiverInfoDone, IsSenderInfoDone]);
	function _renderStepContent(step) {
		switch (step) {
			case 0:
				return <TransferTypeForm TransferTypeInfo={TransferTypeInfo} />;
			case 1:
				return <SenderForm senderInfo={senderInfo} />;
			case 2:
				return <ReceiverForm receiverInfo={receiverInfo} SenderAccNo={SenderAccNo} />;
			case 3:
				return <PaymentForm SenderAccNo={SenderAccNo} ReceiverAccNo={ReceiverAccNo} />;
			default:
				return <div>Not Found</div>;
		}
	}
	const senderInfo = (isSenderDone, senderAccNo) => {
		setSenderAccNo(senderAccNo)
		setIsSenderInfoDone(isSenderDone);
	}
	const receiverInfo = (isReceiverDone, receiverAccNo) => {
		setIsReceiverInfoDone(isReceiverDone);
		setReceiverAccNo(receiverAccNo);
	}
	const TransferTypeInfo = (isTransferTypeDone, transferType) => {
		setIsTransferTypeDone(isTransferTypeDone);
		setTransferTypeData(transferType);
	}
	async function _submitForm(values) {
		await _sleep(1000);
		setActiveStep(activeStep + 1);
	}
	const makeTransaction = () => {
		var today = new Date(),
			date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		const data = {
			"empName": "madhu",
			"senderNo": SenderAccNo,
			"receiverNo": ReceiverAccNo,
			"transType": TransferTypeData,
			"transId": date.toString().replace('-', ''),
			"transAmount": 20,
			"transDate": date.toString()
		}
		Axios.post("http://localhost:8081/transaction/add", data)
			.then((response) => console.log(response))
			.catch((error) => console.log(error))
	}
	function _handleSubmit(values, actions) {
		if (isLastStep) {
			makeTransaction();
			_submitForm(values, actions);
		} else {
			if (IsTransferTypeDone) {
				setActiveStep(1)
			}
			if (IsSenderInfoDone) {
				setActiveStep(2)
			}
			if (IsReceiverInfoDone) {
				setActiveStep(3)
			}
		}
	}

	function ColorlibStepIcon(props) {
		const { active, completed, className } = props;

		const icons = {
			1: <AccountBalanceIcon />,
			2: <GroupRemoveIcon />,
			3: <GroupAddIcon />,
			4: <SavingsIcon />,
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
							<div className={classes.wrapper}>
								<Fab color="primary" aria-label="add" onClick={_handleSubmit} style={{
									backgroundImage:
										'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
									boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
								}}>
									{isLastStep ? <CheckIcon /> : <ArrowForwardIcon />}
								</Fab>
							</div>
						</div>
					</div>
				)}
			</React.Fragment>
		</React.Fragment>
	);
}
