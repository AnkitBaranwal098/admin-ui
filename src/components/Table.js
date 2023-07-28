import React, { useEffect, useState } from 'react'
import axios from "axios"
import { url, recordsPerPage } from "../config/config";
import "./Table.css"
import TableBody from './TableBody';
import Pagination from './Pagination';

const Table = () => {

    const [users, setUsers] = useState([]);
    const [records, setRecords] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const [lastIndex, setLastIndex] = useState(currentPage*recordsPerPage);
    const [firstIndex, setFirstIndex] = useState(lastIndex-recordsPerPage);
    // const lastIndex = currentPage*recordsPerPage;
    // const firstIndex = lastIndex-recordsPerPage;

    const fetchDataFromUrl = async () => {
        try {
            const data = await axios.get(url)
            return data.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFromUrl();
            setUsers(data);
            setRecords(data.slice(firstIndex, lastIndex))
        }
        fetchData();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th><input type='checkbox' /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className='action'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => <TableBody name={record.name} email={record.email} role={record.role} key={record.id} />)}
                </tbody>
            </table>
            <Pagination 
            users={users} 
            setRecords={setRecords}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLastIndex={setLastIndex}
            setFirstIndex={setFirstIndex}
            />
        </>
    )
}

export default Table
