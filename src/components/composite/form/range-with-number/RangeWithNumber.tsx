import React, { useState } from "react"

function useInput(defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    function onInput(e: any) {
        setValue(e.target.value);
    }
    return {
        value,
        onInput,
    };
}

interface RangeWithNumberProps{
    defaultValue: string, 
    label: string,
    min?: string,
    max?: string,
    disabled: boolean
}

export default (rangeWithNumberProps: RangeWithNumberProps) => {
    const { defaultValue, label, min = 0, max = 100, disabled = false } = rangeWithNumberProps;
    let { value, onInput } = useInput(defaultValue);
    return <div className="field is-grouped">
        {label}
        <p className="control is-expanded" style={{paddingLeft: 8 }}>
            <input type="range" disabled={disabled} style={{ width: '100%' }} min={min} max={max} value={value} onChange={onInput} />
        </p>
        <p className="control">
            <input type="text" disabled={disabled} style={{width: 80}} value={value} onChange={onInput}/>
        </p>
    </div>
}