import React, { useState, useEffect } from 'react';
import {getTenders} from "../shared/services/tender.service";
import ModalComponent from "../modals/ModalComponent";
import TenderProposals from "./vendors/TenderProposals";


export function HelperTender() {
    const [tenders, setTenders] = useState([]);
    const [isOpen,setIsOpen]=useState(false);
    const[selectedRow,setSelectedRow]=useState(null);
    const toggle=()=>setIsOpen(!isOpen);
    const [offers, setOffers] = useState([]);

    const handleClose=()=>{setIsOpen(false)};
    const handleShow=(tender)=>{

        setSelectedRow(tender);
        setIsOpen(true);
    };

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
                        <td><button onClick={()=>handleShow(tender)}>evaluate</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ModalComponent show={isOpen} onHide={toggle}>

                {/*pozvati komponentu koju zelite, i u tu komponentu tj. njenu funkciju u parametre ubaciti {tender}*/}
                {/*promijeniti velicinu modala, stilizovati, i upisati podatke s modala u bazu*/}

            </ModalComponent>
        </div>
    );
}
export default HelperTender;




