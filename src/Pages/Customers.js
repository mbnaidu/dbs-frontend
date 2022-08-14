import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { presentLanguage } from '../res/Values';

export default function Customers() {
    const [AllCustomers, setAllCustomers] = useState([]);
    const columns = [
        { label: presentLanguage.word_Number, name: 'accNo' },
        { label: presentLanguage.word_Name, name: 'accName' },
        { label: presentLanguage.word_Balance, name: 'blnc' },
        { label: presentLanguage.word_Debited, name: 'debited' },
    ];
    useEffect(() => {
        Axios.get("http://localhost:8081/customer/list")
            .then((response) => setAllCustomers(response.data))
            .catch((error) => console.log(error))
    }, []);
    return (
        <div style={{ margin: 20 }}>
            <MUIDataTable
                title={presentLanguage.word_All_Customers_list}
                data={AllCustomers}
                columns={columns}
                options=
                {{
                    filterType: "multiselect",
                    print: false,
                }}
            />
        </div>
    )
}
