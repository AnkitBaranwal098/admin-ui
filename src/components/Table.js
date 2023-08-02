import React, { useEffect, useState } from 'react'
import axios from "axios"
import { url, recordsPerPage } from "../config/config";
import "./Table.css"
import TableBody from './TableBody';
import Pagination from './Pagination';
import { useSnackbar } from "notistack";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Table = ({ searchText }) => {

    const [users, setUsers] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([])
    const [records, setRecords] = useState([])
    const [chekedUsersList, setCheckedUsersList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [lastIndex, setLastIndex] = useState(currentPage * recordsPerPage);
    const [firstIndex, setFirstIndex] = useState(lastIndex - recordsPerPage);
    const { enqueueSnackbar } = useSnackbar();

    const fetchDataFromUrl = async () => {
        try {
            const data = await axios.get(url)
            return data.data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const triggerSnackbar = (message, variantType) => {
        enqueueSnackbar(message, {
            variant: variantType,
            preventDuplicate: true,

            autoHideDuration: 2000,
        });
    };

    const handleDeleteUser = (contactId) => {
        triggerSnackbar(`User with id ${contactId} deleted successfully.`, "success");
        const modifiedUsers = users.filter((record) => record.id != contactId)
        setUsers(modifiedUsers)
        setFilteredUsersList(modifiedUsers);
        setRecords(modifiedUsers.slice(firstIndex, lastIndex))
    }

    const deleteSelectedUsers = () => {
        const idToDelete = new Set(chekedUsersList);

        if (chekedUsersList.length != 0) {
            triggerSnackbar(`Checked users deleted successfully.`, "success");
            const newArray = filteredUsersList.filter((user) => {
                return !idToDelete.has(user.id)
            })
            // setUsers(newArray);
            setFilteredUsersList(newArray)
            setRecords(newArray.slice(firstIndex, lastIndex));
        }
        else{
            triggerSnackbar(`Please check users to delete.`, "warning");
        }
    }

    useEffect(() => {
        const fitleredUser = users.filter((user) => {
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
                    {records.map((record) => <TableBody
                        id={record.id} name={record.name}
                        email={record.email}
                        role={record.role}
                        handleDeleteUser={handleDeleteUser}
                        chekedUsersList={chekedUsersList}
                        setCheckedUsersList={setCheckedUsersList}
                        key={record.id} />)}
                </tbody>
            </table>
            <div className='delete-btn-container'>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteSelectedUsers}>
                    Delete
                </Button>
                <Pagination
                    filteredUsersList={filteredUsersList}
                    setRecords={setRecords}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setLastIndex={setLastIndex}
                    setFirstIndex={setFirstIndex}
                />
            </div>
        </>
    )
}

export default Table
