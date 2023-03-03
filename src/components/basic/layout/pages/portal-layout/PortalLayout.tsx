/**
 * layout: 
 *  *************************************************
 *  *     Data    * Property *       Analysis       *  
 *  *     list    *   list   *        result        *
 *  *************************************************
 * 
 */

import React from "react"
import './style.scss'

export const ChartPropertyContainer = ({ children }: any) => {
    return <div className="chart-property-container">
        {children}
    </div>
}

export const DataListColumn = ({ children }: any) => {
    return <div className="data-list-column">
        {children}
    </div>
}

export const PropertyListColumn = ({ children }: any) => {
    return <div className="property-list-column">
        {children}
    </div>
}

export const AnalysisResultColumn = ({ children }: any) => {
    return <div className="analysis-result-column pure-u-1">
        {children}
    </div>
}

export const AnalysisResultColumnContent = ({ children }: any) => {
    return <div className="analysis-result-column-content">
        {children}
    </div>
}

export const AnalysisResultColumnContentHeader = ({ children }: any) => {
    return <div className="analysis-result-column-content-header">
        {children}
    </div>
}

export const AnalysisResultColumnContentBody = ({ children }: any) => {
    return <div className="analysis-result-column-content-body">
        {children}
    </div>
}

export const PortalLayout = ({children}: any) => {
    return <div className="portal-layout content pure-g">
        {children}
    </div>
}