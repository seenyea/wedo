import React, { useCallback, useState } from 'react';

import { DataViewItem } from '@src/model/data/model';
import DataItem from '@src/components/composite/items/data-item/DataItem';

interface DataListProperty{
    lists: DataViewItem[]
}
export default (dataListProperty: DataListProperty) => {
    const { lists } = dataListProperty;

    const [data, setData] = useState(lists);

    const onDataItemClick = useCallback((value: string) => {
        const d = data.map(e => {
           e.isSelected = e.id === value;
           return e;
        })
        setData([...d]);
    }, []);
    
    return <div className="data-list-wrapper pure-u-1">
        {lists.map((e: DataViewItem) => {
            const {
                id,
                title,
                description,
                type,
                properties,
                isSelected
            } = e;
            const { imgSrc }= type;
            const { main, subject } = title;

            return <DataItem data={e} imgSrc={imgSrc} description={description} main={main} subject={subject} isSelected={isSelected} onDataItemClick={onDataItemClick
} />
        })}
    </div>
}