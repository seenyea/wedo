import { useState } from 'react'
import { data_ssq } from './data/ssq'
import { data_dlt } from './data/dlt'

export const changeLists = () => {
    const [lists, setLists] = useState([data_ssq, data_dlt]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    return {
        selectedIndex,
        setSelectedIndex,
        lists,
        setLists
    }
}