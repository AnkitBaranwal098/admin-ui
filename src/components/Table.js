import React, { useEffect, useState } from 'react'
import axios from "axios"
import { url, recordsPerPage } from "../config/config";
import "./Table.css"
import TableBody from './TableBody';
import Pagination from './Pagination';

const Table = ({searchText}) => {

    const [users, setUsers] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([])
    const [records, setRecords] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [lastIndex, setLastIndex] = useState(currentPage*recordsPerPage);
    const [firstIndex, setFirstIndex] = useState(lastIndex-recordsPerPage);


    const fetchDataFromUrl = async () => {
        try {
            const data = await axios.get(url)
            return data.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDeleteUser = (contactId)=>{
        console.log(`User with id ${contactId} deleted successfully`)
        const modifiedUsers = users.filter((record)=> record.id!=contactId)
        setUsers(modifiedUsers)
        setFilteredUsersList(modifiedUsers);
        setRecords(modifiedUsers.slice(firstIndex, lastIndex))
    }

    useEffect(()=>{
        const fitleredUser = users.filter((user)=>{
            return user.name.includes(searchText) || user.email.includes(searchText) || user.role.includes(searchText)
        })
        setFilteredUsersList(fitleredUser);
        setRecords(fitleredUser.slice(firstIndex, lastIndex))
    }, [searchText])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDataFromUrl();
            setUsers(data);
            setFilteredUsersList(data);
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
                    {records.map((record) => <TableBody id={record.id} name={record.name} email={record.email} role={record.role} handleDeleteUser={handleDeleteUser} key={record.id} />)}
                </tbody>
            </table>
            <Pagination 
            filteredUsersList={filteredUsersList} 
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
