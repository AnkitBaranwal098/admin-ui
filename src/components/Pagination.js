import React from 'react'
import "./Pagination.css"
import { recordsPerPage } from '../config/config';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Pagination = ({ filteredUsersList, setRecords, currentPage, setCurrentPage, setLastIndex, setFirstIndex, deleteSelectedUsers }) => {

    // Logic to calculate the number of pages for pagination based on users passed and recordsPerPage
    const numberOfPages = Math.ceil(filteredUsersList.length / recordsPerPage);
    // Logic to generate an array of Pagination number
    const paginationNumber = [...Array(numberOfPages + 1).keys()].slice(1);

    // Method to create a subset of record for the next page of Pagination and n is the page number
    const createNextRecords = (n) => {
        const newLastIndex = n * recordsPerPage
        const newFirstIndex = newLastIndex - recordsPerPage
        setLastIndex(newLastIndex)
        setFirstIndex(newFirstIndex)

        return filteredUsersList.slice(newFirstIndex, newLastIndex);
    }

    //Function to set an indicator which page are we in
    const setActivePage = (n) => {
        const isActivePage = document.getElementById(currentPage);
        isActivePage.classList.remove('active');
        const setActivePage = document.getElementById(n);
        setActivePage.classList.add('active');
    }

    //Function to move to the next page
    const nextPage = () => {
        if (currentPage !== numberOfPages) {
            setRecords(createNextRecords(currentPage + 1));
            setCurrentPage(currentPage + 1);
        }
        else {
            setRecords(createNextRecords(1));
            setCurrentPage(1);
        }
    }

    //Function to move to the previous page
    const previousPage = () => {
        if (currentPage !== 1) {
            setRecords(createNextRecords(currentPage - 1))
            setCurrentPage(currentPage - 1);
        }
    }

    //Function to set the current page we are in pagination UI and display the records for that page
    const changeCurrentPage = (n) => {
        setCurrentPage(n);
        setRecords(createNextRecords(n));
    }

    //Function to display the records for the first page and also make the 1st page as the active page
    const firstPage = () => {
        setRecords(createNextRecords(1));
        setCurrentPage(1);
        setActivePage(1);
    }

    // Function to display the records for the last page and also make the last page as the active page
    const lastPage = () => {
        setRecords(createNextRecords(numberOfPages));
        setCurrentPage(numberOfPages)
        setActivePage(numberOfPages);
    }

    return (
        <div className='pagination-wrapper'>
           <div>
           <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteSelectedUsers} >
                Delete
            </Button>
           </div>
            <nav className='pagination'>
                <a href="#" onClick={firstPage}>&laquo;</a>
                <a href="#" onClick={previousPage}>&lt;</a>
                {paginationNumber.map((n, i) =>
                (<a href="#" className={currentPage === n ? 'active' : ''} id={n} key={i} onClick={() => changeCurrentPage(n)}>
                    {n}
                </a>))}
                <a href="#" onClick={nextPage}>&gt;</a>
                <a href="#" onClick={lastPage}>&raquo;</a>
            </nav>
        </div>
    )
}

export default Pagination
