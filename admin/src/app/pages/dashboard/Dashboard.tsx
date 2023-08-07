import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faSearch, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useAuth} from "../../modules/auth/core/Auth";
import DashBoardCard from "./DashboarcCard";
import {getStats} from "../../shared/services/statsService";

export function Dashboard() {

    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [offersCount, setOffersCount] = useState(0);
    useEffect(()=>{
        //fetching all the data
        getStats()
            .then(data =>{
                setActiveCount(data.activeTenders);
                setInactiveCount(data.inactiveTenders);
                setOffersCount(data.offers);
            })


    },[]);

    return (
        <div>
            <div className="row row-cols-4 card-group ">
                <DashBoardCard  number = {activeCount} name = "Active Tenders"></DashBoardCard>
                <DashBoardCard  number = {inactiveCount} name = "Inactive Tenders"></DashBoardCard>
                <DashBoardCard  number = {offersCount} name = "Offers"></DashBoardCard>

            </div>
        </div>
    );


}
