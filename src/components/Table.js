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
        const modifiedUsers = users.filter((record) => record.id !== contactId)
        setUsers(modifiedUsers)
        setFilteredUsersList(modifiedUsers);
        setRecords(modifiedUsers.slice(firstIndex, lastIndex))
    }

    const deleteSelectedUsers = () => {
        const updatedData = filteredUsersList.filter((user) => !user.checked);
        const updatedUserData = users.filter((user)=> !user.checked);
        console.log(updatedUserData)
        setUsers(updatedUserData)
        setFilteredUsersList(updatedData)
        setRecords(updatedData.slice(firstIndex, lastIndex))
    }

    const handleCheckboxChange = (event, userId) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return {
                    ...user,
                    checked: event.target.checked,
                };
            }
            return user;
        })
        const updatedFilteredList = filteredUsersList.map((user) => {
            if (user.id === userId) {
                return {
                    ...user,
                    checked: event.target.checked,
                };
            }
            return user;
        })
        setUsers(updatedUsers)
        setFilteredUsersList(updatedFilteredList);
        setRecords(updatedFilteredList.slice(firstIndex, lastIndex));
    }

    const selectAllRecords = (event)=>{
       
        const updatedData = records.map((user)=>({
            ...user,
            checked: event.target.checked
        }))

        const checkedData = users.map((user) => {
            return {
              ...user,
              ...updatedData.find((checkedUsers) => checkedUsers.id === user.id),
            };
          });

        const chekedAllFilteredData = filteredUsersList.map((user) => {
            return {
              ...user,
              ...updatedData.find((checkedUsers) => checkedUsers.id === user.id),
            };
          });

        setUsers(checkedData)
        setFilteredUsersList(chekedAllFilteredData);
        setRecords(chekedAllFilteredData.slice(firstIndex, lastIndex));
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
                        <th><input type='checkbox' onChange={selectAllRecords}/></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className='action'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => <TableBody
                        checked={record.checked}
                        handleCheckboxChange={handleCheckboxChange}
                        id={record.id} name={record.name}
                        email={record.email}
                        role={record.role}
                        handleDeleteUser={handleDeleteUser}
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
