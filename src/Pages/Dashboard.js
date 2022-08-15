import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import DeveloperOtions from '../Contents/DeveloperOptions';
import { presentLanguage } from '../res/Values';
import { CloudDownload } from '@mui/icons-material';
import { IconButton } from '@mui/material';

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

    // gets from all the data the selected rows
    const getRowsToBeDownloaded = (selectedRows, data) => {
        return data.filter(row => selectedRows.data.some(selected => selected.dataIndex === row.dataIndex)).map(row => row.data);
    }

    // this function return the csv string
    const getCsvStringFromArrayOfStrings = (columns, data) => {
        // maps through the columns array and generates the csv header
        const csvHeader = columns.map(column => `"${column.label}"`).join();
        // maps through each row and adds a new line so the next row can be generated
        const csvBody = data.map(row => row.map(cell => cell !== null ? `"${cell}"` : '""').join()).join('\n');
        // joins together the csv header and body and puts a new line in between of them
        return `${csvHeader}\n${csvBody}`;
    };

    // i know it is disgusting but dont judge me
    // creates an artificial link, clicks it automatically so it downloads immediately and it removes it 
    const saveCsvStringAsFile = (csvString, fileName) => {
        const url = window.URL.createObjectURL(new Blob([csvString]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName.replace(' ', '')}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    const downloadRowsAsCSV = (rows, columns, fileName) => {
        // generate the csv string
        const csvString = getCsvStringFromArrayOfStrings(columns, rows);

        // some disgusting way of downloading the csv but it works i guess
        saveCsvStringAsFile(csvString, fileName);
    }

    const SelectedRowsToolbar = ({ selectedRows, data, columns, datatableTitle }) => {
        return (
            <div>
                <IconButton onClick={() => downloadRowsAsCSV(getRowsToBeDownloaded(selectedRows, data), columns, datatableTitle)}>
                    <CloudDownload />
                </IconButton>
            </div>
        );
    }
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
                            download: false,
                            filterType: "multiselect",
                            print: false,
                            expandableRows: false,
                            rowsPerPageOptions: [0],
                            customToolbarSelect: (selectedRows, data) =>
                                <SelectedRowsToolbar
                                    selectedRows={selectedRows}
                                    data={data}
                                    columns={columns}
                                    datatableTitle={presentLanguage.word_Top_5_Customer_Transactions}
                                />,
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
                            download: false,
                            filterType: "multiselect",
                            print: false,
                            expandableRows: false,
                            rowsPerPageOptions: [0],
                            customToolbarSelect: (selectedRows, data) =>
                                <SelectedRowsToolbar
                                    selectedRows={selectedRows}
                                    data={data}
                                    columns={bankColumns}
                                    datatableTitle={presentLanguage.word_Top_5_Bank_Transactions}
                                />,
                        }}
                    />
                </div>
            </div>
            <div>
                {IsDeveloperModeOn && <DeveloperOtions />}
            </div>
        </div>
    )
}
