import React, { useEffect, useState } from 'react'
import axios from "axios"
import url from "../config/config";

import "./Table.css"
import TableBody from './TableBody';

const Table = () => {

    const [users,setUsers] = useState([]);

    const fetchDataFromUrl = async()=>{
        try{
            const data = await axios.get(url)
            return data.data;
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async()=>{
            const data = await fetchDataFromUrl();
            console.log(data)
            setUsers(data);
        }
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th><input type='checkbox'/></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className='action'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=> <TableBody name={user.name} email={user.email} role={user.role} key={user.id}/>)}
            </tbody>
        </table>
    )
}

export default Table
