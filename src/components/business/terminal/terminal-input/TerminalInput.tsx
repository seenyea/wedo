import React, { useEffect, useState } from "react"


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

export default ({ onExcutedCommand }: any) => {
    const inputDefault = useInput('');

    const onSendCommand = (e: any) => {
        if (inputDefault.value){
            onExcutedCommand(inputDefault.value);
        }
    }

    useEffect(() => {

        const keyPress = (e: any) => {
            if (e.key === "Enter") {
                onSendCommand(e);
            }
        }

        document.addEventListener("keypress", keyPress);
        return () => {
            document.removeEventListener("keypress", keyPress);
        }
    }, [inputDefault.value]);

    return <div className="terminal-line">
        <div className="field has-addons">
            <p className="control">
                <input className="input" type="text" placeholder="输入命令" {...inputDefault} />
            </p>
            <p className="control">
                <p className="control" onClick={onSendCommand}>
                    <button className="button" >
                        <span>➜</span>
                    </button>
                </p>
            </p>
            <p className="control">
                <p className="control">
                    <button className="button">
                        <span>+</span>
                    </button>
                </p>
            </p>
        </div>
    </div>
}
