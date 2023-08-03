import React from 'react';
import {useLocation} from "react-router-dom";

const EvaluateOffers = () => {

    const location = useLocation();
    console.log(location.state);

    return (

        <div>
            evaluate offer page
        </div>
    )

};

export default EvaluateOffers;