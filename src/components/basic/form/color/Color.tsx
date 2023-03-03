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

export default ({ defaultValue, disabled}: any) => {
    const inputProps = useInput(defaultValue);
    return <div className="color-input-wrapper">
        <input type="color" {...inputProps} disabled={disabled}  />
    </div>
}