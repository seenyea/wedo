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

export default ({ defaultValue }: any) => {
    const rangeProps = useInput(defaultValue);
    return <div className="input-range-wrapper">
        <input type="range" min="0" max="11" {...rangeProps} />
    </div>
}