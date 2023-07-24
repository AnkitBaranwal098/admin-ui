import React from 'react'
import "./Admin.css"
import Table from './Table'
import Header from './Header'
const Admin = () => {

  return (
    <>
    {/* <Header/> */}
    <section className='table-container'>
      <input type='search' placeholder='Search by name, email, role' className='search-bar'/>
      <Table />
    </section>
    </>
  )
}

export default Admin
