import { Grid, TextField, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PaymentForm(props) {
	const [BIC, setBIC] = useState("");
	const [BankName, setBankName] = useState("");
	const [amount, setAmount] = useState(0);
	useEffect(() => {
		Axios.post(`http://localhost:8081/bank/get/${BIC}`)
			.then((response) => {
				setBankName(response.data ? response.data.bank_name : "")
			})
			.catch((error) => console.log(error))
	}, [BIC]);
	useEffect(() => {
		props.setAmountValue(BankName.length > 0 ? true : false, parseInt(amount))
	}, [amount]);
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Payment Information
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField label="BIC Code" variant="standard" value={BIC} onChange={(event) => setBIC(event.target.value)} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Bank Name" variant="standard" value={BankName} disabled />
				</Grid>
			</Grid>
			<br />
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField id="standard-basic" label="Amount" variant="standard" disabled={!BankName} value={amount} type="number" onChange={(event) => setAmount(event.target.value)} />
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
