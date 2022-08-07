import { Grid, TextField, Typography } from '@mui/material';
import React from 'react'

export default function PaymentForm() {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Payment Information
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField id="standard-basic" label="Amount" variant="standard" />
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
