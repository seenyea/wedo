import React, { useCallback, useEffect, useRef, useState } from "react"

interface SelectProps{
    options: any[]
}

export default (selectProps: SelectProps) => {
    const { options } = selectProps;
    let [list, setList] = useState(options);
    let [selectedItem, setSelectedItem] = useState(list.filter(d => d.isSelected)[0]);
    let [isOpen, setOpen] = useState(false);
    const domRef = useRef(null);

    const toggleList = useCallback(() => {
        console.log(isOpen);
        isOpen = !isOpen;
        console.log(isOpen);
        setOpen(isOpen);
    }, []);

    useEffect(() => {
        window.addEventListener('click', (e: any) => {
            if (!e.target.closest(".dropdown")){
                isOpen = false;
                setOpen(isOpen);
            }
        }, false)
    }, []);

    const onSelected = useCallback((value: string, item: any) => {
        console.log(value)
        if (selectedItem.value === value){
            return;
        }

        console.log(selectedItem)
        
        list.forEach(d => {
            d.isSelected = (d.value === value);
            if (d.isSelected){
                selectedItem = { ...d }
            }
        })

    
        setList([...list]);
        isOpen = false;
        setOpen(false);
        setSelectedItem({...selectedItem});

    }, []);

    const currentCls = ['dropdown'];
    if(isOpen){
        currentCls.push('is-active');
    }
    return <div className={currentCls.join(' ')} style={{width: '100%'}}>
        <div className="dropdown-trigger" style={{ width: '100%' }} onClick={toggleList}>
            <button className="button" style={{ width: '100%' }} aria-haspopup="true" aria-controls="dropdown-menu">
                <span>{selectedItem.name}</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div className="dropdown-menu" style={{ width: '100%'} } role="menu">
            <div className="dropdown-content" style={{ width: '100%' }}>
                {list.map((option, key) => {
                    const { value, name, isSelected } = option;
                    const cls = ['dropdown-item'];
                    if (isSelected){
                        cls.push('is-active');
                    }
                    return <a key={key} onClick={(e: any) => {
                        e.preventDefault();
                        onSelected(value, option)
                    }} href="#" className={cls.join(' ')}>
                        {name}
                    </a>
                })}
            </div>
        </div>
    </div>
}