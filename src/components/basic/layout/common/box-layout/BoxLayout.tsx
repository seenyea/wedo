import React from "react"

export const BoxLayout = ({children, cls}: any) => {
    const _tcls = ['box'];
    if(cls){
        _tcls.push(cls);
    }
    return <div className={_tcls.join(' ')}>
        {children}
    </div>
}

