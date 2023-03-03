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
    const inputProps = useInput(defaultValue);
    return <div className="text-input-wrapper">
        <input type="text" {...inputProps} />
    </div>
}