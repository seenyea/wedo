import React from "react"


export const AccordionLayout = ({ children, cls }: any) => {
    const _tcls = ['accordion'];
    if (cls) {
        _tcls.push(cls);
    }
    return <section className={_tcls.join(' ')}>
        {children}
    </section>
}


export const AccordionsLayout = ({children}: any) => {
    return <section className="accordions">
        {children}
    </section>
}