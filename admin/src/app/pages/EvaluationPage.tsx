import React, {useState, useEffect} from 'react';
import {getTenders} from "../shared/services/tender.service";
import {useNavigate, useLocation} from 'react-router-dom';


export function EvaluationPage() {
    const [tenders, setTenders] = useState([]);
    const navigate = useNavigate();


    const navigateToOffer = (offer) => {
        navigate(`/evaluate-offers/${offer.id}`, {state: {offer}});
    }

    const fetchTenders = async () => {
        try {
            const query={populate:'offers'};
            const [pagination,allTenders] = await getTenders(query);
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
                <thead className="bg-danger text-white">
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