import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { presentLanguage } from '../res/Values';


export default function Transactions() {
    const [AllTransactions, setAllTransactions] = useState([]);
    const columns = [
        { label: presentLanguage.word_Employee_Name, name: 'empName' },
        { label: presentLanguage.word_Sender_Acc_No, name: 'senderNo' },
        { label: presentLanguage.word_Receiver_Acc_No, name: 'receiverNo' },
        { label: presentLanguage.word_Transaction_ID, name: 'transId' },
        { label: presentLanguage.word_Transaction_Type, name: 'transType' },
        { label: presentLanguage.word_Transaction_Amount, name: 'transAmount' },
        { label: presentLanguage.word_Transaction_Date, name: 'transDate' },
        { label: presentLanguage.word_Bank_Code, name: 'bankCode' },
        { label: presentLanguage.word_Bank_Name, name: 'bankName' },
    ];
    useEffect(() => {
        Axios.get("http://localhost:8081/transaction/list")
            .then((response) => setAllTransactions(response.data))
            .catch((error) => console.log(error))
    }, []);
    return (
        <div style={{ margin: 20 }}>
            <MUIDataTable
                title={presentLanguage.word_All_Transactions_list}
                data={AllTransactions}
                columns={columns}
                options=
                {{
                    filterType: "multiselect",
                    print: false,
                    selectableRows: false,
                }}
            />
        </div>
    )
}
