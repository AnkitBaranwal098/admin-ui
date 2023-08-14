import React, { useEffect, useState } from 'react'
import axios from "axios"
import { url, recordsPerPage } from "../config/config";
import "./Table.css"
import TableBody from './TableBody';
import Pagination from './Pagination';
import { useSnackbar } from "notistack";
import EditableRow from './EditableRow';

const Table = ({ searchText }) => {

    //Here we store the entire users list fetched from the api
    const [users, setUsers] = useState([]);
    //Here we store the users list fetched from api till it is filtered depending on name, role, email
    const [filteredUsersList, setFilteredUsersList] = useState([])
    //Here we store the users list based on pagination
    const [records, setRecords] = useState([])

    // State variables for the Pagination UI
    const [currentPage, setCurrentPage] = useState(1);
    const [lastIndex, setLastIndex] = useState(currentPage * recordsPerPage);
    const [firstIndex, setFirstIndex] = useState(lastIndex - recordsPerPage);

    //If editUserId is null it signifies that the user is not editing any row 
    const [editUserId, setEditUserId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    })
    const { enqueueSnackbar } = useSnackbar();

    //Function to fetch data from the specified url using the axios library
    const fetchDataFromUrl = async () => {
        try {
            const data = await axios.get(url)
            return data.data;
        }
        catch (err) {
            triggerSnackbar("Error loading data", "error");
        }
    }

    //Function to trigger snackbar when and where needed
    const triggerSnackbar = (message, variantType) => {
        enqueueSnackbar(message, {
            variant: variantType,
            preventDuplicate: true,

            autoHideDuration: 2000,
        });
    };

    //Function to handle delete operation. Deletes the user with the given userId and updates the list
    const handleDeleteUser = (contactId) => {
        triggerSnackbar(`User with id ${contactId} deleted successfully.`, "success");
        const modifiedUsers = users.filter((record) => record.id !== contactId)
        setUsers(modifiedUsers)
        setFilteredUsersList(modifiedUsers);
        setRecords(modifiedUsers.slice(firstIndex, lastIndex))
    }

    //Function to handle delete operation based on the condition if the user's check box is checked or not
    const deleteSelectedUsers = () => {

        const { checkedUsers, notCheckedUsers } = users.reduce((acc, user) => {
            if (user.checked) {
                acc.checkedUsers.push(user);
            } else {
                acc.notCheckedUsers.push(user);
            }
            return acc;
        }, { checkedUsers: [], notCheckedUsers: [] });

        const { checkedFilteredUsers, notCheckedFilteredUsers } = filteredUsersList.reduce((acc, user) => {
            if (user.checked) {
                acc.checkedFilteredUsers.push(user);
            } else {
                acc.notCheckedFilteredUsers.push(user);
            }
            return acc;
        }, { checkedFilteredUsers: [], notCheckedFilteredUsers: [] });

        if (checkedUsers.length === 0 || checkedFilteredUsers.length === 0) {
            triggerSnackbar(`Please select user's checkbox to delete.`, "warning");
        }
        else {
            triggerSnackbar(`Selected users deleted successfully.`, "success");
            setUsers(notCheckedUsers)
            setFilteredUsersList(notCheckedFilteredUsers)
            setRecords(notCheckedFilteredUsers.slice(firstIndex, lastIndex))
        }

    }

    //Function to handle checkbox change based on user's click
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

    //Function to set all user's checkboxes as checked
    const selectAllRecords = (event) => {

        const updatedData = records.map((user) => ({
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

    //Function to toggle between the editable table row and read only table row
    const handleEditEvent = (event, id) => {
        setEditUserId(id);
    }

    //Function handles the update of user data in the form fields inside the Editable row component.
    const updateUserData = (event) => {

        //Extracts the field name and value from event.target
        const inputFieldName = event.target.getAttribute('name');
        const inputFieldValue = event.target.value;

        const updatedUserData = { ...formData }
        updatedUserData[inputFieldName] = inputFieldValue;

        setFormData(updatedUserData);

    }

    //Function to validate user's role
    const validateUserData = () => {
        let role = formData.role.toLocaleLowerCase();
        console.log(role)
        if (role === "member" || role === "admin")
            return true;
        return false;
    }

    //Function updates the user's data for which edit button is clicked
    const modifyUsersList = () => {
        if (validateUserData()) {
            const usersIndex = users.findIndex((user) => user.id == editUserId)
            const filteredUsersIndex = filteredUsersList.findIndex((user) => user.id == editUserId)

            let tempUsers = [...users];
            tempUsers[usersIndex] = { ...formData, id: editUserId }

            let tempFilteredUsersList = [...filteredUsersList];
            tempFilteredUsersList[filteredUsersIndex] = { ...formData, id: editUserId }

            setUsers(tempUsers);
            setFilteredUsersList(tempFilteredUsersList);
            setRecords(tempFilteredUsersList.slice(firstIndex, lastIndex))
            triggerSnackbar(`User with id ${editUserId} updated succesfully.`, "success")
        }else{
            triggerSnackbar("User role is invalid.","error")
        }
        setEditUserId(null)
    }

    //Re-renders the component whenever search text changes.Also filters the list
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
                        <th><input type='checkbox' onChange={selectAllRecords} /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className='action'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) =>
                    (<React.Fragment key={record.id}>
                        {/* if the editUserId is equal to the record's id 
                            then it will show the editable row component else will show the TableBody component */}
                        {editUserId == record.id ? <EditableRow
                            record={record}
                            setEditUserId={setEditUserId}
                            formData={formData}
                            setFormData={setFormData}
                            updateUserData={updateUserData}
                            modifyUsersList={modifyUsersList}
                            checked={record.checked}
                            handleCheckboxChange={handleCheckboxChange}
                        /> : <TableBody
                            checked={record.checked}
                            handleCheckboxChange={handleCheckboxChange}
                            id={record.id}
                            name={record.name}
                            email={record.email}
                            role={record.role}
                            handleDeleteUser={handleDeleteUser}
                            handleEditEvent={handleEditEvent}
                        />}
                    </React.Fragment>)
                    )}
                </tbody>
            </table>
            <div className='delete-btn-container'>
                <Pagination
                    filteredUsersList={filteredUsersList}
                    setRecords={setRecords}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setLastIndex={setLastIndex}
                    setFirstIndex={setFirstIndex}
                    deleteSelectedUsers={deleteSelectedUsers}
                />
            </div>
        </>
    )
}

export default Table
