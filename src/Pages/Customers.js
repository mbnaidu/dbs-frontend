import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';

export default function Customers() {
    const [AllCustomers, setAllCustomers] = useState([]);
    const columns = [
        { label: 'Number', name: 'accNo' },
        { label: 'Name', name: 'accName' },
        { label: 'Balance', name: 'blnc' },
        { label: 'Debited', name: 'debited' },
    ];
    useEffect(() => {
        Axios.get("http://localhost:8081/customer/list")
            .then((response) => setAllCustomers(response.data))
            .catch((error) => console.log(error))
    }, []);
    return (
        <div style={{ margin: 'auto', margin: 20 }}>
            <MUIDataTable
                title={"All Customers list"}
                data={AllCustomers}
                columns={columns}
                options=
                {{
                    filterType: "multiselect",
                    print: false,
                    expandableRows: true,
                }}
            />
        </div>
    )
}
