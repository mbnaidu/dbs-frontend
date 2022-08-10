import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';


export default function Transactions() {
    const [AllTransactions, setAllTransactions] = useState([]);
    const columns = [
        { label: 'Employee Name', name: 'empName' },
        { label: 'Sender Acc No', name: 'senderNo' },
        { label: 'Receiver Acc No', name: 'receiverNo' },
        { label: 'Transaction ID', name: 'transId' },
        { label: 'Transaction Type', name: 'transType' },
        { label: 'Transaction Amount', name: 'transAmount' },
        { label: 'Transaction Date', name: 'transDate' },
        { label: 'Bank Code', name: 'bankCode' },
        { label: 'Bank Name', name: 'bankName' },
    ];
    useEffect(() => {
        Axios.get("http://localhost:8081/transaction/list")
            .then((response) => setAllTransactions(response.data))
            .catch((error) => console.log(error))
    }, []);
    return (
        <div style={{ margin: 'auto', margin: 20 }}>
            <MUIDataTable
                title={"All Transactions list"}
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
