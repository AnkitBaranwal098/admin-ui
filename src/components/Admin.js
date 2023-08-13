import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Admin.css"
import Table from './Table'
const Admin = () => {

  const [searchText, setSearchText] = useState("");

  const searchInput = (event)=>{
    event.preventDefault();
    const searchItem = event.target.value.toLowerCase();
    setSearchText(searchItem);
  }

  return (
    <>
    <section className='table-container'>
      <div className='search-container'>
      <input type='search' placeholder='Search by name, email, role' className='search-bar' value={searchText} onChange={(event)=>searchInput(event)}/>
      </div>
      <Table searchText={searchText}/>
    </section>
    </>
  )
}

export default Admin
