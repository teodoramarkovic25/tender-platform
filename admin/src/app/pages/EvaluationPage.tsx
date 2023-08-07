import React, {useState, useEffect} from 'react';
import {getTenders} from "../shared/services/tender.service";
import {useNavigate, useLocation} from 'react-router-dom';
import {getOffer, updateOffer} from "../shared/services/offer.service";
import {useAuth} from "../modules/auth";
import ModalComponent from "../modals/ModalComponent";

export function EvaluationPage() {
    const [tenders, setTenders] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const navigateToOffer = (offer) => {
        navigate(`/evaluate-offers/${offer.id}`, {state: {offer}});
    }

    const selectWinningOffer = async (offer) => {

        try {
            const selectedOffer = await getOffer(offer.id);


            const offerData = {
                isSelected: true
            }
            const updatedOffer = await updateOffer(offer.id,offerData);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchTenders = async () => {
        try {
            const query = {populate: 'offers'};
            const [pagination, allTenders] = await getTenders(query);
            setTenders(allTenders);
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
            <table className="table table-striped table-hover">
                <thead className="bg-primary text-white">
                <tr className="fw-bold fs-6 border-bottom border-gray-200">
                    <th className="text-white">Title</th>
                    <th className="text-white">Description</th>
                    <th className="text-white">Deadline date</th>
                    <th className="text-white">Evaluation criteria</th>
                    <th className="text-white">Weightage</th>
                    <th className="text-white">Offers</th>
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
                        <td className=''>
                            {tender.offers.length > 0 ? (
                                tender.offers.map((offer) => (
                                    <div>
                                    <div className='d-flex' key={offer.id}>
                                        <div className='d-flex flex-column flex-column-fluid '>
                                            <span className='text-center mt-3'>{offer.offer}$</span>
                                        </div>
                                        <div className=' '>
                                            <button
                                                className=' d-flex flex-column flex-column-fluid  mb-3 btn btn-sm w-70'
                                                onClick={() => {
                                                    navigateToOffer(offer);
                                                }}
                                            >
                                                Evaluate
                                            </button>
                                        </div>
                                    </div>

                                <div>
                                    <button
                                        className=' d-flex flex-column flex-column-fluid  mb-3 btn btn-sm w-70'
                                        onClick={() => {
                                            selectWinningOffer(offer);

                                        }
                                        }
                                    >Select winning offer!
                                    </button>
                                    <ModalComponent show={isOpen} onHide={toggle}>
                                        Are you sure you want to select this offer for the winner?
                                    </ModalComponent>
                                </div>
                                    </div>
                                ))
                            ) : (
                                <div className='border flex'>
                                    <h4 className='text-center'>No offers</h4>
                                </div>
                            )}


                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default EvaluationPage;