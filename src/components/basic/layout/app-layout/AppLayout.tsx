import React from "react"
import './style.scss';

export const AppHeaderLayout = ({ children }: any) => {
    return <div className="app-layout-header">
        {children}
    </div>
}

export const AppContentLayout = ({ children }: any) => {
    return <div className="app-layout-content">
        {children}
    </div>
}

export const AppLayout = ({ children }: any) => {
    return <div className="light app-layout app-wrapper">
        {children}
    </div>
}