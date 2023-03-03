import React, { useCallback, useState } from "react"
import './style.scss';

interface AccordionsProps{
    data?: any
}

function accordionsInput(d: any) {
    const [obj, setObj] = useState(d);
    function onClick(id: string) {
        console.log(id)
        const lastId = obj.items.filter((o: any) => {
            return o.isSelected;
        })[0].id;
        if (lastId === id) return;
        obj.items.forEach((o: any) => {
            o.isSelected = o.id === id;
        })
        console.log(obj)
        setObj({ ...obj, items: [...obj.items]});
    }
    return {
        obj,
        onClick,
    };
}


export default (accordionsProps: AccordionsProps) => {

    const { obj, onClick } = accordionsInput(accordionsProps.data);

    return <section className="accordions">
        <header className="accordion">
            <label htmlFor="acc-close" className="accordion-title">{obj.title}</label>
        </header>
        {
            obj.items.map((o: any) => {
                const _cls = ['accordion']
                const { id, name, AccordionItem, isSelected } = o;
                if (isSelected){
                    _cls.push('selected')
                }
                return <section className={_cls.join(' ')}>
                        <label className="accordion-title arrows" onClick={(e: any) => {
                        onClick(id)
                    }} htmlFor={name}>{name}</label>
                        <div className="accordion-content">
                        {AccordionItem ? <AccordionItem /> : '暂无内容'}
                        </div>
                    </section>
            })
        }
    </section>
}