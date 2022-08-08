import { IconButton, Paper, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import Axios from 'axios';
import MUIDataTable, { TableBody, TableHead } from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import { CloudDownload } from '@mui/icons-material/CloudDownload';
import BasicTable from '../Contents/Tables';

export default function Customers() {
    const [AllCustomers, setAllCustomers] = useState([]);
    const columns = [
        { label: 'Account Number', name: 'accNo' },
        { label: 'Account Name', name: 'accName' },
        { label: 'Account Balance', name: 'blnc' },
    ];
    const handleRowClick = (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
    };
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
    useEffect(() => {
        Axios.get("http://localhost:8081/customer/list")
            .then((response) => setAllCustomers(response.data))
            .catch((error) => console.log(error))
    }, []);
    const SelectedRowsToolbar = ({ selectedRows, data, columns, datatableTitle }) => {
        return (
            <div>
                <IconButton onClick={() => downloadRowsAsCSV(getRowsToBeDownloaded(selectedRows, data), columns, datatableTitle)}>
                    <CloudDownload />
                </IconButton>
            </div>
        );
    }
    const renderExtraData = (data1, data2) => {
        return (
            <React.Fragment>
                <tr>
                    <td colSpan={6}>
                        <BasicTable customerNum={data1[0]} />
                    </td>
                </tr>
            </React.Fragment>
        )
    }
    return (
        <div>
            <MUIDataTable
                title={"All Customers list"}
                data={AllCustomers}
                columns={columns}
                options=
                {{
                    filterType: "multiselect",
                    print: false,
                    expandableRows: true,
                    selectableRows: false,
                    customToolbarSelect: (selectedRows, data) =>
                        <SelectedRowsToolbar
                            selectedRows={selectedRows}
                            data={data}
                            columns={columns}
                            datatableTitle="StudentData"
                        />,
                    renderExpandableRow: (rowData, rowMeta) => {
                        return (
                            renderExtraData(rowData, rowMeta.dataIndex)
                        );
                    },
                }}
            />
        </div>
    )
}
