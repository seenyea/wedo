import React, { useCallback, useState } from 'react';

import { DataViewItem } from '@src/model/data/model';
import PropertyItem from '@src/components/composite/items/property-item/PropertyItem';

interface PropertyListProps {
    lists: DataViewItem[]
}
export default (propertyListProps: PropertyListProps) => {
    const { lists } = propertyListProps;

    const [data, setData] = useState(lists);

    const onItemClick = useCallback((value: string) => {
        const d = data.map(e => {
            e.isSelected = e.id === value;
            return e;
        })
        setData([...d]);
    }, []);

    return <div className="property-list-wrapper pure-u-1">
        {lists.map((e: DataViewItem) => {
            const {
                id,
                title,
                description,
                type,
                properties,
                isSelected
            } = e;
            const { imgSrc } = type;
            const { main, subject } = title;

            return <PropertyItem data={e} imgSrc={imgSrc} description={description} main={main} subject={subject} isSelected={isSelected} onItemClick={onItemClick
            } />
        })}
    </div>
}
