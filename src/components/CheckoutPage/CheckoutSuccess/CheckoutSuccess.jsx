import React from 'react';
import { Fab, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

function CheckoutSuccess(props) {
	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				Thank you for your order.
			</Typography>
			<div className="row">
				<Typography variant="subtitle1">
					Your order number is {props.transId}. We have emailed your order confirmation,
					and will send you an update when your order has shipped.
				</Typography>
				<Fab color="primary" aria-label="add" onClick={() => { props.resetActionState() }} style={{
					width: 100,
					backgroundImage:
						'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
					boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
				}}>
					<CachedIcon />
				</Fab>
			</div>
		</React.Fragment>
	);
}

export default CheckoutSuccess;
