import React from "react"
import './style.scss';

export const GroupLayout = () => {
    return <div className="group-layout">

    </div>
}

export const GroupDashBorderLayout = ({ children }: any) => {
    return <div className="group-dash-border-layout">
        {children}
    </div>
}