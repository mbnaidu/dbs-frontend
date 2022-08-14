import React, { useState } from 'react';

import PaymentForm from './Forms/PaymentForm';
import CheckoutSuccess from './CheckoutSuccess';
import { styled } from '@mui/material/styles';

import useStyles from './styles';
import SenderForm from './Forms/SenderForm';
import ReceiverForm from './Forms/ReceiverForm';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Slide, Step, StepLabel, Stepper } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import SavingsIcon from '@mui/icons-material/Savings';
import TransferTypeForm from './Forms/TransferTypeForm';
import Axios from 'axios';
import './Styles.css';
import { presentLanguage } from '../../res/Values';
import { bgColor } from '../../Globals/GlobalValues';

const steps = [presentLanguage.word_Transfer_Type, presentLanguage.word_Sender_Details, presentLanguage.word_Receiver_Details, presentLanguage.word_Payment_Details];

var today = new Date(),
	date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
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
			bgColor,
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			bgColor,
	}),
}));
export default function CheckoutPage() {
	const classes = useStyles();
	const [IsWeekend, setIsWeekend] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const isLastStep = activeStep === steps.length - 1;
	const [SenderAccNo, setSenderAccNo] = useState("");
	const [ReceiverAccNo, setReceiverAccNo] = useState("");
	const [TransferTypeData, setTransferTypeData] = useState("");
	const [amount, setAmount] = useState(0);
	const [IsSenderInfoDone, setIsSenderInfoDone] = useState(false);
	const [IsReceiverInfoDone, setIsReceiverInfoDone] = useState(false);
	const [IsTransferTypeDone, setIsTransferTypeDone] = useState(false);
	const [MessageType, setMessageType] = React.useState('');
	const [BankCode, setBankCode] = React.useState("");
	const [BankName, setBankName] = React.useState("");

	function _sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});
	function _renderStepContent(step) {
		switch (step) {
			case 0:
				return <TransferTypeForm TransferTypeInfo={TransferTypeInfo} date={date} MessageTypeInfo={MessageTypeInfo} />;
			case 1:
				return <SenderForm senderInfo={senderInfo} />;
			case 2:
				return <ReceiverForm receiverInfo={receiverInfo} SenderAccNo={SenderAccNo} />;
			case 3:
				return <PaymentForm setAmountValue={setAmountValue} SenderAccNo={SenderAccNo} />;
			default:
				return <div>Not Found</div>;
		}
	}
	const setAmountValue = (amount, bic, bankName) => {
		setAmount(amount);
		setBankCode(bic);
		setBankName(bankName);
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
	const MessageTypeInfo = (messageType) => {
		setMessageType(messageType)
	}
	async function _submitForm() {
		await _sleep(1000);
		setActiveStep(activeStep + 1);
	}
	const resetActionState = () => {
		setActiveStep(0);
	}
	const makeTransaction = () => {
		const data = {
			"empName": localStorage.getItem("session"),
			"senderNo": SenderAccNo,
			"receiverNo": ReceiverAccNo,
			"transType": TransferTypeData,
			"transId": date.toString().replace(/-|:/g, ''),
			"transAmount": amount,
			"transDate": date.toString(),
			"bankCode": BankCode,
			"bankName": BankName,
			"messageCode": MessageType,
		}
		Axios.post("http://localhost:8081/transaction/add", data)
			.then((response) => {
				if (response.data === "saved") {
					_submitForm()
				}
			})
			.catch((error) => console.log(error))
	}
	function _handleSubmit() {
		if (isLastStep) {
			makeTransaction();
			// _submitForm(values, actions);
		} else {
			if (IsTransferTypeDone && MessageType) {
				if (today.getDay() === 6 || today.getDay() === 0) {
					setIsWeekend(true);
				}
				else {
					setActiveStep(1);
				}
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
			<Dialog
				open={IsWeekend}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{presentLanguage.word_Its_WEEKEND}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{presentLanguage.word_Unable_to_do_any_transactions_on_weekdays}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setIsWeekend(false) }}>{presentLanguage.word_Ok}</Button>
				</DialogActions>
			</Dialog>
			<div className="modalHeader" >
				{presentLanguage.word_PAYMENT}
			</div>
			<Stepper activeStep={activeStep} className={classes.stepper}>
				{steps.map(label => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<React.Fragment>
				{activeStep === steps.length ? (
					<CheckoutSuccess transId={date.toString().replace(/-|:/g, '')} resetActionState={resetActionState} MessageType={MessageType} />
				) : (
					<div>
						{_renderStepContent(activeStep)}
						<div className={classes.buttons}>
							<div className={classes.wrapper}>
								<Fab color="info" aria-label="add" onClick={_handleSubmit} style={{
									backgroundImage:
										bgColor,
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
