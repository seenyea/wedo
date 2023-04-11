import React from 'react'

import './layout.scss'

export const TerminalHeader = ({ children }: any) => {
    return <div className="terminal-header">
        {children}
    </div>
}

export const TerminalBody = ({ children }: any) => {
    return <div className="terminal-body">
        {children}
    </div>
}

export const TerminalFooter = ({ children }: any) => {
    return <div className="terminal-footer">
        {children}
    </div>
}

export const TerminalWrapper = ({ children }: any) => {
    return <div className="terminal-wrapper">
        {children}
    </div>
}