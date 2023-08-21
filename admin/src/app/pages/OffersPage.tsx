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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        // @ts-ignore
        const formattedDate = date.toLocaleDateString(options);
        return formattedDate;
    }

    const handleShow = (tender) => {
        setSelectedRow(tender);
        setIsOpen(true);
    };

    const fetchTenders = async () => {
        try {
            const [pagination, allTenders] = await getTenders();
            setTenders(allTenders);
            {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                currentUser?.id
            }
            console.log(allTenders);
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
            <div className='table-responsive'>
                <table className="table table-striped gy-7 gs-7 table-bordered border-4">
                    <thead className="text-center bg-primary text-white fw-bold">
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
                            <td>{formatDate(tender.deadline)}</td>
                            <td>{tender.criteria}</td>
                            <td>{tender.weightage}</td>
                            <td>
                                <ModalComponent show={isOpen} onHide={toggle}>
                                    <TenderProposals tender={selectedRow} user={currentUser}/>
                                </ModalComponent>

                                <button className='mb-3 btn btn-sm w-70' onClick={() => handleShow(tender)}>Create
                                    offer
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default OffersPage;




