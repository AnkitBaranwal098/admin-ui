import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import "./TableBody.css"

const TableBody = ({ name, email, role }) => {
    return (
        <tr>
            <td>
                <input type="checkbox" />
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td style={{ textTransform: "capitalize" }}>{role}</td>
            <td>
                <span className='icon-container'>
                    <EditOutlinedIcon className='icon'/>
                    <DeleteOutlineOutlinedIcon style={{ color: "red" }} className='icon'/>
                </span>
            </td>
        </tr>
    )
}

export default TableBody
