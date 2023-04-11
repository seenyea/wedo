import React, { useCallback, useEffect, useState } from 'react';

import { DataViewItemProperty } from '@src/model/portal/model';
import PropertyItem from '@src/components/composite/items/property-item/PropertyItem';
import { bindUpdateToStore, callUpdateToStroe } from '@src/model/share-store';

import { statisticBasic, statisticGraph, linearRegression } from '@src/pages/portal/module';

interface PropertyListProps {
    lists?: DataViewItemProperty[],
    mId: string,
    onFilterData: any
}

let _dataId: any = '-1';
export default (propertyListProps: PropertyListProps) => {
    const { mId, onFilterData } = propertyListProps;
    const [data, setData] = useState(null);
    console.log('PropertyList render', _dataId, data);

    const onItemClick = useCallback((value: string) => {
        console.log('property onItemClick', _dataId, data);
        const newData = onFilterData(_dataId, value);
        setData({ ...newData })
        const { key } = newData;
        callUpdateToStroe(statisticBasic, '1', [_dataId, key]);
        callUpdateToStroe(statisticGraph, '1', [_dataId, key]);
        callUpdateToStroe(linearRegression, '1', [_dataId, key]);
    }, []);

    useEffect(() => {

        bindUpdateToStore(mId, '1', (d: any) => {
            
            const [dataId, propertyId] = d;
            const newData = onFilterData(dataId, propertyId);
            _dataId = dataId;
            setData({ ...newData })
            
        })

    }, []);

    return <div className="property-list-wrapper pure-u-1">
        {data && data.properties.map((e: DataViewItemProperty) => {
            return <PropertyItem data={e} onItemClick={onItemClick} />
        })}
    </div>
}
