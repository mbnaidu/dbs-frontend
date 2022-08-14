import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { presentLanguage } from '../../../res/Values';

export default function PaymentForm(props) {
	const [OpenErrorDialog, setOpenErrorDialog] = useState(false);
	const [BIC, setBIC] = useState("");
	const [BankName, setBankName] = useState("");
	const [SenderData, setSenderData] = useState([]);
	const [amount, setAmount] = useState(0);
	const [currency, setCurrency] = useState("IND");
	const currencies = [
		{
			value: 'IND',
			label: '₹',
			change: 1,
		},
		{
			value: 'USD',
			label: '$',
			change: 79.55,
		},
		{
			value: 'EURO',
			label: '€',
			change: 81.41,
		},
		{
			value: 'GBP',
			label: '£',
			change: 102,
		},
		{
			value: 'JPY',
			label: '¥',
			change: 0.59,
		},
	];
	useEffect(() => {
		Axios.post(`http://localhost:8081/bank/get/${BIC}`)
			.then((response) => {
				setBankName(response.data ? response.data.bankName : "")
			})
			.catch((error) => console.log(error))
	}, [BIC]);
	useEffect(() => {
		Axios.post(`http://localhost:8081/customer/get/${props.SenderAccNo}`)
			.then((response) => setSenderData(response.data))
			.catch((error) => console.log(error))
	}, [props.SenderAccNo]);
	useEffect(() => {
		if (SenderData.blnc < parseInt(amount) * 1.0025) {
			if (!SenderData.od) {
				setOpenErrorDialog(true)
			}
		}
		props.setAmountValue(parseInt(amount) * 1.0025, BIC, BankName)
	}, [amount, SenderData, currency, props, SenderData.blnc, BIC, BankName]);
	const getValues = (change, amount) => {
		setAmount(change * amount)
	}
	const handleCurrency = (e) => {
		setCurrency(e.value);
		getValues(e.change, amount);
	}
	return (
		<React.Fragment>
			<Dialog
				open={OpenErrorDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{presentLanguage.word_Insufficient_Balance_in_your_account}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{presentLanguage.word_No_Overdraft_access_Please_contact_Help}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setOpenErrorDialog(false); setAmount(0) }} autoFocus>
						{presentLanguage.word_Ok}
					</Button>
				</DialogActions>
			</Dialog>
			<Typography variant="h6" gutterBottom>
				{presentLanguage.word_Payment_Information}
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField label={presentLanguage.word_BIC_Code} variant="standard" value={BIC || ""} onChange={(event) => setBIC(event.target.value)} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label={presentLanguage.word_Bank_Name} variant="standard" value={BankName || ""} disabled />
				</Grid>
			</Grid>
			<br />
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField id="standard-basic" label={presentLanguage.word_Amount} variant="standard" disabled={!BankName} value={amount} type="number" onChange={(event) => setAmount(event.target.value)} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="standard-select-currency"
						select
						variant="standard"
						label={presentLanguage.word_Select}
						value={currency}
						disabled={!amount}
						helperText={presentLanguage.word_Please_select_currency_to_transfer}
					>
						{currencies.map((option) => (
							<MenuItem key={option.value} value={option.value} onClick={() => handleCurrency(option)}>
								{option.label}{' '}{option.value}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
