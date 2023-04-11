import React, { useCallback } from 'react';
import { DataViewItemProperty } from '@src/model/portal/model';
import './style.scss';

interface PropertyItemProps{
    data: DataViewItemProperty,
    onItemClick?: any
}

export default (props: PropertyItemProps) => {
    const { 
        data, onItemClick,
    } = props;
    const { isSelected, name, type  } = data;
    const wrapperCls = ['property-item', 'pure-g'];
    if (isSelected){
        wrapperCls.push('property-item-selected');
    }

    const onClickEvent = useCallback((e: any) => {
        onItemClick(data.id);
    }, []);

    return (
        <div className={wrapperCls.join(' ')} key={data.id} onClick={onClickEvent}>
            <div>属性名: {name}</div>
            <div>属性类型: {type}</div>
            <div><a href="#">自定义分析</a></div>
        </div>
    );
};