import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
    const [AllCustomers, setAllCustomers] = useState([]);
    const [AllBanks, setAllBanks] = useState([]);
    const columns = [
        { label: 'Name', name: 'accName' },
        { label: 'Debited', name: 'debited' },
    ];
    const bankColumns = [
        { label: 'Bank Name', name: 'bankName' },
        { label: 'Total Amount', name: 'bankAmount' },
    ];
    useEffect(() => {
        Axios.get("http://localhost:8081/customer/list")
            .then((response) => setAllCustomers(response.data))
            .catch((error) => console.log(error))
        Axios.get("http://localhost:8081/bank/list")
            .then((response) => setAllBanks(response.data))
            .catch((error) => console.log(error))
    }, []);
    return (
        <div style={{ display: 'flex', margin: 'auto' }}>
            <div style={{ margin: 20, width: '100%' }}>
                <MUIDataTable
                    title={"Top 5 Customer Transactions"}
                    data={AllCustomers}
                    columns={columns}
                    options=
                    {{
                        paging: false,
                        count: 5,
                        filterType: "multiselect",
                        print: false,
                        expandableRows: false,
                        selectableRows: false,
                        rowsPerPageOptions: [0],
                    }}
                />
            </div>
            <div style={{ margin: 20, width: '100%' }}>
                <MUIDataTable
                    title={"Top 5 Bank Transactions"}
                    data={AllBanks}
                    columns={bankColumns}
                    options=
                    {{
                        paging: false,
                        count: 5,
                        filterType: "multiselect",
                        print: false,
                        expandableRows: false,
                        selectableRows: false,
                        rowsPerPageOptions: [0],
                    }}
                />
            </div>
        </div>
    )
}
