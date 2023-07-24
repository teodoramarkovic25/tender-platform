import React from "react";

export function Pagination({paginationData, onPageChange, onLimitChange}) {
    const {page, totalPages, limit} = paginationData;

    const handlePageChange = (index) => {
        onPageChange(index);
    };
    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        onLimitChange(newLimit);
    };

    const numbersArray = Array.from({length: totalPages}, (_, index) => index + 1);


    return (
        <div>
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
            <div className="justify-content-end">
                <p>Limit:</p>
                <select value={limit} onChange={handleLimitChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
}
