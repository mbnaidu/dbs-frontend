import React, { useEffect, useState } from 'react';
import { Fab, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Axios from 'axios';
import { presentLanguage } from '../../../res/Values';
import { bgColor } from '../../../Globals/GlobalValues';

function CheckoutSuccess(props) {
	const [MessageInstruction, setMessageInstruction] = useState("");
	useEffect(() => {
		Axios.post(`http://localhost:8081/messages/get/${props.MessageType}`)
			.then((response) => setMessageInstruction(response.data.messageInstruction))
			.catch((error) => console.log(error))
	}, [props])// eslint-disable-next-line 
	return (
		<React.Fragment>
			<Typography variant="h5" gutterBottom>
				{presentLanguage.word_Transaction_Successful}
			</Typography>
			<div className="row" style={{ textAlign: 'center' }}>
				<div>
					{presentLanguage.word_Transaction_number_is} <strong>{props.transId}</strong>.
					<br />
					{MessageInstruction}
				</div>
				<Fab color="primary" aria-label="add" onClick={() => { props.resetActionState() }} style={{
					width: 100,
					margin: 10,
					backgroundImage:
						bgColor,
					boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
				}}>
					<CachedIcon />
				</Fab>
			</div>
		</React.Fragment>
	);
}

export default CheckoutSuccess;
