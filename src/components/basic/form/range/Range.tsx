import React, { useState } from "react"

import './style.scss'

function useInput(defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    function onChange(e: any) {
        setValue(e.target.value);
    }
    return {
        value,
        onChange,
    };
}

export default ({ defaultValue, min = 0, max = 11 }: any) => {
    const rangeProps = useInput(defaultValue);
    return <div className="input-range-wrapper">
        <input type="range" min={min} max={max} {...rangeProps} />
    </div>
}