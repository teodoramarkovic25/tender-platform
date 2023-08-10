import React from "react";
import Meeting from "./meeting.jpeg";
import Meeting1 from "./meeting1.jpg"
import Contract1 from "./contract.jpg"
import Contract from "./contract1.jpg"


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faSearch, faChartLine} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {useAuth} from "../../modules/auth/core/Auth";


export function Dashboard() {

    const {currentUser, logout} = useAuth()

        return(
            <div></div>    

    );



}
