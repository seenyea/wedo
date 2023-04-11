import React, { useCallback, useEffect, useState } from 'react';

import { DataViewItem } from '@src/model/data/model';
import DataItem from '@src/components/composite/items/data-item/DataItem';
import { bindUpdateToStore, callUpdateToStroe, } from '@src/model/share-store';
import DataWaiting from '@src/components/composite/loading/data-waiting/DataWaiting'
import { propertyLists, statisticBasic, statisticGraph, linearRegression } from '@src/pages/portal/module';

interface DataListProperty{
    lists?: DataViewItem[],
    mId: string,
    onFilterData: any
}
export default (dataListProperty: DataListProperty) => {
    const { mId, onFilterData } = dataListProperty;

    const [data, setData] = useState(null);

    const onDataItemClick = useCallback((value: string) => {
        const { id, lists } = onFilterData(value);
        setData([...lists]);

        callUpdateToStroe(propertyLists, '1', [id, '1']);

        callUpdateToStroe(statisticBasic, '1', [id, 'r1']);
        callUpdateToStroe(statisticGraph, '1', [id, 'r1']);
        callUpdateToStroe(linearRegression, '1', [id, 'r1']);

    }, [data]);

    useEffect(() => {

        bindUpdateToStore(mId, '1', (data: any) => {
            const { lists } = onFilterData(data);
            setData([...lists]);
        })

    }, []);
    
    return <div className="data-list-wrapper pure-u-1">
        {!data && <DataWaiting />}
        {data && data.map((e: DataViewItem) => {
            const {
                id,
                title,
                description,
                type,
                isSelected
            } = e;
            const { imgSrc }= type;
            const { main, subject } = title;

            return <DataItem data={e} imgSrc={imgSrc} description={description} main={main} subject={subject} isSelected={isSelected} onDataItemClick={onDataItemClick
} />
        })}
    </div>
}