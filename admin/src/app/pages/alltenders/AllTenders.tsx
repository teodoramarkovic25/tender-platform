import React, { useState, useEffect } from 'react';

import {getTenders} from "../../shared/services/tender.service";

export function AllTenders() {
    const [tenders, setTenders] = useState([]);
    const fetchTenders = async () => {
        try {
            const allTenders = await getTenders();
            setTenders(allTenders);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTenders();
    }, []);

    return (
        <div>
            <h1>All active tenders</h1>
            <table className="table table-striped table-hover">
                <thead className="bg-danger text-white">
                <tr className="fw-bold fs-6 border-bottom border-gray-200">
                    <th className="text-white">Title</th>
                    <th className="text-white">Description</th>
                    <th className="text-white">Deadline date</th>
                    <th className="text-white">Evaluation criteria</th>
                    <th className="text-white">Weightage</th>
                </tr>
                </thead>
                <tbody className="table-striped border table-hover">
                {tenders.map((tender) => (
                    <tr key={tender._id}>
                        <td>{tender.title}</td>
                        <td>{tender.description}</td>
                        <td>{tender.deadline}</td>
                        <td>{tender.criteria}</td>
                        <td>{tender.weightage}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    );
}

export default AllTenders;
