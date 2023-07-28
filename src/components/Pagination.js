import React from 'react'
import "./Pagination.css"
import { recordsPerPage } from '../config/config';
import { useState } from 'react';

const Pagination = ({ users, setRecords, currentPage, setCurrentPage, setLastIndex, setFirstIndex }) => {

    const numberOfPages = Math.ceil(users.length / recordsPerPage);
    const paginationNumber = [...Array(numberOfPages + 1).keys()].slice(1);

    const createNextRecords = (n) => {
        const newLastIndex = n * recordsPerPage
        const newFirstIndex = newLastIndex - recordsPerPage
        setLastIndex(newLastIndex)
        setFirstIndex(newFirstIndex)

        return users.slice(newFirstIndex, newLastIndex);
    }

    const setActivePage = (n)=>{
        const isActivePage = document.getElementById(currentPage);
        isActivePage.classList.remove('active');
        const setActivePage = document.getElementById(n);
        setActivePage.classList.add('active');
    }

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

    const previousPage = () => {
        if (currentPage !== 1) {
            setRecords(createNextRecords(currentPage - 1))
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCurrentPage = (n) => {
        setCurrentPage(n);
        setRecords(createNextRecords(n));
    }

    const firstPage = ()=>{
        setRecords(createNextRecords(1));
        console.log(currentPage)
        setActivePage(1);
    }
    const lastPage = ()=>{
        setRecords(createNextRecords(numberOfPages));
        setActivePage(numberOfPages);
    }
    return (
        <div className='pagination-wrapper'>
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
