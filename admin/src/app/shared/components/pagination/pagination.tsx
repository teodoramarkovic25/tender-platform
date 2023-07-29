import React from "react";

export function Pagination({ paginationData, onPageChange }) {
    const { page, totalPages } = paginationData;

    const handlePageChange = (index) => {
        onPageChange(index);
    };

    const numbersArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <ul className="pagination justify-content-center">
            <li className={`page-item previous ${page === 1 ? 'disabled' : ''}`}>
                <span className="page-link page-text" onClick={() => handlePageChange(page - 1)}>Previous</span>
            </li>
            {totalPages && numbersArray.map((item) => (
                <li key={item} className={`page-item ${item === page ? 'active' : ''}`}>
                    <span className="page-link page-text" onClick={() => handlePageChange(item)}>{item}</span>
                </li>
            ))}
            <li className={`page-item next ${page === totalPages ? 'disabled' : ''}`}>
                <span className="page-link page-text" onClick={() => handlePageChange(page + 1)}>Next</span>
            </li>
        </ul>
    );
}