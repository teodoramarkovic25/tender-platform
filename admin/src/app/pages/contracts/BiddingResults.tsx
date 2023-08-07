import React, {useState, useEffect} from 'react';
import {getOffers} from "../../shared/services/offer.service";
import Card from 'react-bootstrap/Card';

const BiddingResults = () => {

    const [error, setError] = useState('');
    const [state, setState] = useState('');
    const [data, setData] = useState('');
    useEffect(() => {
        setState('loading');
        const data = getOffers();
    }, []);

//radim na offerima, jer nemam jos pullovan kod za evaluations
    const display = getOffers();

    console.log('data:');
    console.log(display);


    return (
        <div>
            <h1>Select winning bid aa</h1>
            <Card>
                {Object.values(display).map((items) => (
                    <Card.Title key={items.id}>${items.offer}</Card.Title>
                ))}
            </Card>
        </div>

    );
}

export default BiddingResults;