import React from "react"
import { useLocation, Location } from 'react-router-dom'
import "./style.scss";

export default (props: any) => {

    const location: Location = useLocation();
    const { pathname } = location

    return <p className="not-found-page">
        <h1>{pathname} NOT found</h1>
    </p>
}