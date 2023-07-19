import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ModalComponent from "../modals/ModalComponent";
import EvaluateTender from "./evaluators/EvaluateTender";
import {EvaluatorModel} from "../shared/models/pomocni_evaluation.model";

const EvaluateOffers = () => {
    const location = useLocation();
    // @ts-ignore
    const {offer} = location.state || {};
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleShow = () => {
        setIsOpen(true);
    };


    return (
        <div>
            <Card className='text-center w-75 '>
                <Card.Title>
                    Offer details
                </Card.Title>
                <Card.Body>
                    <h1>Offered Money: </h1>
                    <br/>
                    {offer.offer} $
                    <br/>
                    <br/>
                    <h1>Documents: </h1>
                    <br/>
                    <br/>
                    <button className='btn btn-lg w-100 mb-5' onClick={() => handleShow()}>Evaluate offer</button>
                </Card.Body>
            </Card>
            <ModalComponent show={isOpen} onHide={toggle}>

                <EvaluateTender offerId={offer.id}/>

            </ModalComponent>
        </div>
    );
};

export default EvaluateOffers;