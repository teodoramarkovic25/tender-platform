import React, {useState, useEffect} from 'react';
import {getTenders} from "../shared/services/tender.service";
import {useNavigate, useLocation} from 'react-router-dom';
import {updateOffer} from "../shared/services/offer.service";
import ModalComponent from "../modals/ModalComponent";
import {sendWinningOfferEmail} from "../shared/services/offer.service";
import {getUser} from "../shared/services/user.service";
import {getTender} from "../shared/services/tender.service";
import {getOffers} from "../shared/services/offer.service";
import {getCompany} from "../shared/services/company.service";

export function EvaluationPage() {
    const [tenders, setTenders] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');

    const toggle = () => setIsOpen(!isOpen);
    const navigateToOffer = (offer) => {
        navigate(`/evaluate-offers/${offer.id}`, {state: {offer}});
    }

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

    const confirmSelectOffer = async (offer) => {
        try {
            if (selectedOffer) {
                /* const offerData = {
                     isSelected: true
                 }*/
                setSelectedOffer(offer);
                //  await updateOffer(offer.id, offerData);
                //setRefresh(offer.tender);
                //  console.log(offer.tender);

                const user = await getUser(offer.createdBy);

                //console.log('selected Offer', offer);
                await sendWinningOfferEmail(offer);

                //  console.log('user email', user.email);

                const tender = await getTender(offer.tender);
                const filters = {
                    createdBy: '',
                    tender: ''
                }
                const offers = await getOffers(filters);

                for (var i = 0; i < offers.length; i++) {
                    // @ts-ignore
                    if (offers[i].tender === tender.id) {
                        console.log('tender checking', offers[i].tender, ' tender id: ', tender);

                        if (offers[i].isSelected === true) {
                            break;
                        } else if (offers[i].isSelected === false && offers[i].id === selectedOffer.id) {
                            const updateOfferData = {
                                isSelected: true
                            };
                            await updateOffer(offers[i].id, updateOfferData);
                        }
                    }
                }

                toggle();
            }
        } catch (error) {
            console.error(error);
        }
    }


    const selectWinningOffer = async (offer) => {
        try {
            setSelectedOffer(offer);
            const user = await getUser(offer.createdBy);
            setFirstName(user.firstName);
            setLastName(user.lastName);

            console.log('user', user);
            if (user.role === 'vendor') {
                console.log('user company:', user.company)

                const company = await getCompany(user.company);

                setCompany(company.name);
            }

            toggle();
        } catch (error) {
            console.error(error);
        }
    }


    const fetchTenders = async () => {
        try {
            const query = {populate: 'offers'};
            const [pagination, allTenders] = await getTenders(query);
            setTenders(allTenders);
            //    console.log(allTenders);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        console.log('evaluationpage');
        fetchTenders();
    }, []);
    return (
        <div>
            <div className='table-responsive'>
                <table className="table table-striped gy-7 gs-7 table-bordered border-4">
                    <thead className="text-center bg-primary text-white fw-bold">
                    <tr className="fw-bold fs-6 border-bottom border-gray-200">
                        <th className="text-white">Title</th>
                        <th className="text-white">Description</th>
                        <th className="text-white">Deadline date</th>
                        <th className="text-white">Evaluation criteria</th>
                        <th className="text-white">Weightage</th>
                        <th className="text-white">Offers</th>
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
                            <td className=''>
                                {tender.offers.length > 0 ? (
                                    tender.offers.map((offer) => (
                                        <div>
                                            <div className='border-4'>
                                                <div key={offer.id}>
                                                    <div className='d-flex flex-column flex-column-fluid '>
                                                        <span className='text-center'>{offer.offer}$</span>
                                                    </div>
                                                    <div className='d-flex flex-column flex-column-fluid '>
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

                                                <div className='d-flex flex-column flex-column-fluid '>
                                                    <button
                                                        className='d-flex flex-column flex-column-fluid mb-3 btn btn-sm w-70'
                                                        onClick={() => {
                                                            selectWinningOffer(offer)
                                                        }
                                                        }
                                                    >Select winning offer!
                                                    </button>
                                                    <br/>
                                                    <hr/>
                                                </div>
                                                <ModalComponent
                                                    show={isOpen}
                                                    onHide={toggle}
                                                >
                                                    <div className='text-center'>
                                                        <h1>Select winning offer!</h1>
                                                        <hr/>
                                                        <div>
                                                            <h2 className='text-primary'>Tender Details</h2>
                                                            <b>Tender Title:</b> {tender.title} <br/>
                                                            <b>Tender Description:</b> {tender.description} <br/>
                                                            <b>Tender Criteria:</b> {tender.criteria} <br/>
                                                            <b>Tender Weightage:</b> {tender.weightage} <br/>
                                                            <hr/>
                                                            <h2 className='text-primary'>Offer Details</h2>
                                                            <b>Offered Money: </b> {offer.offer} $ <br/>
                                                            <b>Vendor: </b> {firstName} {lastName} <br/>
                                                            <b>Company: </b> {company}
                                                        </div>
                                                        <br/>
                                                        <h6> Are you sure you want to select this offer for the
                                                            winner?</h6>
                                                        <br/>
                                                        <button className='btn me-3'
                                                                onClick={() => confirmSelectOffer(selectedOffer)}>Yes
                                                        </button>
                                                        <button
                                                            className='btn btn-secondary'
                                                            onClick={toggle}>No
                                                        </button>
                                                    </div>
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
        </div>
    );
}

export default EvaluationPage;