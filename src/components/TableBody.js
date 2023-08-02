import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import "./TableBody.css"

const TableBody = ({id, name, email, role, handleDeleteUser, chekedUsersList, setCheckedUsersList }) => {

    
    const handleCheckUser = ()=>{
        
        const newCheckedUsersList = [...chekedUsersList];
        const index = newCheckedUsersList.findIndex((userId)=> userId==id)
        if(index==-1)
            newCheckedUsersList.push(id)
        else
            newCheckedUsersList.splice(index,1);
        setCheckedUsersList(newCheckedUsersList)
    }

    return (
        <tr>
            <td>
                <input type="checkbox" onChange={handleCheckUser}/>
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td style={{ textTransform: "capitalize" }}>{role}</td>
            <td>
                <span className='icon-container'>
                    <EditOutlinedIcon className='icon'/>
                    <DeleteOutlineOutlinedIcon style={{ color: "red" }} className='icon' onClick={()=>handleDeleteUser(id)}/>
                </span>
            </td>
        </tr>
    )
}

export default TableBody
