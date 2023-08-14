import React, { useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const EditableRow = ({ record, formData, setFormData, updateUserData, modifyUsersList, setEditUserId, handleCheckboxChange, checked }) => {

    // Method to cancel editing the user
    const cancelEdit = () => {
        setEditUserId(null);
    }

    // Initializes the formData state variable with values from a record when the component mounts.
    // Here we pass the initial values in that table row .i.e. helps in pre-populating the form
    useEffect(() => {
        setFormData({
            name: record.name,
            email: record.email,
            role: record.role
        })
    }, [])

    return (
        <tr>
            <td><input
                type="checkbox"
                checked={checked}
                onChange={(event) => handleCheckboxChange(event, record.id)}
            /></td>
            <td>
                <input
                    type='text'
                    placeholder='Enter name'
                    required
                    name='name'
                    onChange={updateUserData}
                    value={formData.name}
                />
            </td>
            <td>
                <input
                    type='text'
                    placeholder='Enter email'
                    required
                    name='email'
                    onChange={updateUserData}
                    value={formData.email}
                />
            </td>
            <td>
                <input
                    type='text'
                    placeholder='Enter role'
                    required
                    name='role'
                    onChange={updateUserData}
                    value={formData.role}
                />
            </td>
            <td>
                <span className='icon-container'>
                    <DoneIcon className='icon' onClick={modifyUsersList} />
                    <CloseIcon style={{ color: "red" }} className='icon' onClick={cancelEdit} />
                </span>
            </td>
        </tr>
    )
}

export default EditableRow
