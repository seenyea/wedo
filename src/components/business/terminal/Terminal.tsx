import React from 'react'
import { TerminalHeader, TerminalBody, TerminalFooter, TerminalWrapper } from './layout';

import TerminalInput from '@src/components/business/terminal/terminal-input/TerminalInput'
import { getTerminalListsHook } from './hook'

import './style.scss'
import './terminal.scss'

export default () => {

    const terminalObj = getTerminalListsHook([])

    const onExcutedCommand = (value: string) => {
        console.log(value);
        
        terminalObj.updateLists(value);
    }

    return <TerminalWrapper>
        <TerminalHeader>
            <h5 className="title">命令框</h5>
        </TerminalHeader>
        <TerminalBody>
            <div className="fakeScreen">
                <div className="terminal-window primary-bg">
                    <div className="terminal-output">
                        {terminalObj.lists.map((d: any) => {
                            const { orginValue, type } = d;
                            return <div className="terminal-line">
                                <span className={type}>➜</span>{orginValue}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </TerminalBody>
        <TerminalFooter>
            <TerminalInput onExcutedCommand={onExcutedCommand} />
        </TerminalFooter>
    </TerminalWrapper>
}