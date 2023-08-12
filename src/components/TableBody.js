import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import "./TableBody.css"

const TableBody = ({ checked, handleCheckboxChange, id, name, email, role, handleDeleteUser }) => {

    return (
        <tr className={checked ? "highlight-row" : ""}>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => handleCheckboxChange(event, id)}
                />
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td style={{ textTransform: "capitalize" }} >
                <span className={`${role==="member"?"member":"admin"} pillStyle`}>
                    {role}
                </span>
            </td>
            <td>
                <span className='icon-container'>
                    <EditOutlinedIcon className='icon' />
                    <DeleteOutlineOutlinedIcon style={{ color: "red" }} className='icon' onClick={() => handleDeleteUser(id)} />
                </span>
            </td>
        </tr>
    )
}

export default TableBody
