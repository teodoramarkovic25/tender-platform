import React from "react";
import {useAuth} from "../../modules/auth/core/Auth";

export function Dashboard() {

    const {currentUser, logout} = useAuth()

    return (
        <div>
            <h1>Welcome {currentUser?.firstName}!</h1>
        </div>
    )

}
