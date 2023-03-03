import React from "react"

export const BoxLayout = ({ children, cls }: any) => {
    const _tcls = ['panel'];
    if (cls) {
        _tcls.push(cls);
    }
    return <div className={_tcls.join(' ')}>
        {children}
    </div>
}