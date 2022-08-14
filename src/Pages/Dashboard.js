import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import DeveloperOtions from '../Contents/DeveloperOptions';
import { presentLanguage } from '../res/Values';

export default function Dashboard() {
    const [AllCustomers, setAllCustomers] = useState([]);
    const [AllBanks, setAllBanks] = useState([]);
    const [IsDeveloperModeOn, setIsDeveloperModeOn] = React.useState(localStorage.getItem("developerMode") === 'true' ? true : false);
    const columns = [
        { label: presentLanguage.word_Name, name: 'accName' },
        { label: presentLanguage.word_Debited, name: 'debited' },
    ];
    const bankColumns = [
        { label: presentLanguage.word_Bank_Name, name: 'bankName' },
        { label: presentLanguage.word_Total_Amount, name: 'bankAmount' },
    ];
    React.useEffect(() => { localStorage.getItem("developerMode") === 'true' ? setIsDeveloperModeOn(true) : setIsDeveloperModeOn(false); }, [])
    useEffect(() => {
        Axios.get("http://localhost:8081/customer/list")
            .then((response) => setAllCustomers(response.data))
            .catch((error) => console.log(error))
        Axios.get("http://localhost:8081/bank/list")
            .then((response) => setAllBanks(response.data))
            .catch((error) => console.log(error))
    }, []);
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: 20, width: '48%' }}>
                    <MUIDataTable
                        title={presentLanguage.word_Top_5_Customer_Transactions}
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
                <div style={{ margin: 20, width: '48%' }}>
                    <MUIDataTable
                        title={presentLanguage.word_Top_5_Bank_Transactions}
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
            <div>
                {IsDeveloperModeOn && <DeveloperOtions />}
            </div>
        </div>
        // <div style={{ flexDirection: 'row', display: 'flex' }}>
        //     <div style={{ display: 'flex', margin: 'auto' }}>
        //     </div>
        //     <div style={{ display: 'flex', margin: 'auto' }}>
        //         {IsDeveloperModeOn && <DeveloperOtions />}
        //     </div>
        // </div>
    )
}
