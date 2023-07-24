//MODAL

import React, {useState, useEffect} from 'react';
import {getTenders} from "../shared/services/tender.service";
import ModalComponent from "../modals/ModalComponent";
import TenderProposals from "./vendors/TenderProposals";
import {useAuth} from "../modules/auth/core/Auth";

export function OffersPage() {
    const [tenders, setTenders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const toggle = () => setIsOpen(!isOpen);
    const {currentUser, logout} = useAuth();

    const handleShow = (tender) => {
        setSelectedRow(tender);
        setIsOpen(true);
    };

    const fetchTenders = async () => {
        try {
            const allTenders = await getTenders();
            setTenders(allTenders);
            {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                currentUser?.id
            }

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
                    <th></th>
                </tr>
                </thead>
                <tbody className="table-striped border table-hover">
                {tenders.map((tender) => (
                    <tr key={tender.id}>
                        <td>{tender.title}</td>
                        <td>{tender.description}</td>
                        <td>{tender.deadline}</td>
                        <td>{tender.criteria}</td>
                        <td>{tender.weightage}</td>
                        <td>
                            <button className='mb-3 btn btn-sm w-70' onClick={() => handleShow(tender)}>Create an
                                offer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ModalComponent show={isOpen} onHide={toggle}>

                <TenderProposals tender={selectedRow} user={currentUser}/>

            </ModalComponent>
        </div>
    );
}

export default OffersPage;




