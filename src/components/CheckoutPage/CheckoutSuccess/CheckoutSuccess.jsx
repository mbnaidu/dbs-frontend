import React, { useEffect, useState } from 'react';
import { Fab, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Axios from 'axios';

function CheckoutSuccess(props) {
	const [MessageInstruction, setMessageInstruction] = useState("");
	useEffect(() => {
		Axios.post(`http://localhost:8081/messages/get/${props.MessageType}`)
			.then((response) => setMessageInstruction(response.data.messageInstruction))
			.catch((error) => console.log(error))
	}, [props])
	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				Transaction Successful.
			</Typography>
			<div className="row" style={{ textAlign: 'center' }}>
				<div>
					Transaction number is <strong>{props.transId}</strong>.
					<br />
					{MessageInstruction}
				</div>
				<Fab color="primary" aria-label="add" onClick={() => { props.resetActionState() }} style={{
					width: 100,
					margin: 10,
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
