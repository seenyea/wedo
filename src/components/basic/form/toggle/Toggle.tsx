import React from "react"
import './style.scss'
export default () => {
    return <div className="toggle-wrapper">
        <input className="tgl tgl-light" id="cb1" type="checkbox" />
        <label className="tgl-btn" htmlFor="cb1"></label>
    </div>
}