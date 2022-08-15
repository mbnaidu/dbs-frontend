import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { presentLanguage } from '../res/Values';
import { CloudDownload } from '@mui/icons-material';
import { IconButton } from '@mui/material';


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
        // { label: presentLanguage.word_Bank_Name, name: 'bankName' },
        { label: presentLanguage.word_Message_code, name: 'messageCode' },
    ];
    useEffect(() => {
        Axios.get("http://localhost:8081/transaction/list")
            .then((response) => setAllTransactions(response.data))
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
        <div style={{ margin: 20 }}>
            <MUIDataTable
                title={presentLanguage.word_All_Transactions_list}
                data={AllTransactions}
                columns={columns}
                options=
                {{
                    paging: false,
                    count: 10,
                    download: false,
                    rowsPerPageOptions: [0],
                    filterType: "multiselect",
                    print: false,
                    customToolbarSelect: (selectedRows, data) =>
                        <SelectedRowsToolbar
                            selectedRows={selectedRows}
                            data={data}
                            columns={columns}
                            datatableTitle={presentLanguage.word_All_Customers_list}
                        />,
                }}
            />
        </div>
    )
}
