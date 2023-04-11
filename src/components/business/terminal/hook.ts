import { useState } from "react";

import { parseTerminalCommand } from '@src/libs/parse-terminal-command'

export function getTerminalListsHook(defaultValue: any) {
    const [lists, setLists] = useState(defaultValue);
    const updateLists = (s: string) => {
    
        const newItem = parseTerminalCommand(s);
        const newLists = [...lists, newItem];

        setLists(newLists);
    }
    return {
        lists,
        updateLists,
    };
}