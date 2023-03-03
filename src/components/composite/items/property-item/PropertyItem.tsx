import React, { useCallback } from 'react';
import './style.scss';

interface PropertyItemProps{
    data: any,
    imgSrc: string,
    main: string, 
    subject: string, 
    description: string, 
    isSelected: boolean,
    onItemClick?: any
}

export default (props: PropertyItemProps) => {
    const { 
        data, onItemClick
    } = props;
    const { isSelected } = data;
    const wrapperCls = ['property-item', 'pure-g'];
    if (isSelected){
        wrapperCls.push('property-item-selected');
    }

    const onClickEvent = useCallback((e: any) => {
        onItemClick(data.id);
    }, []);

    return (
        <div className={wrapperCls.join(' ')} key={data.id} onClick={onClickEvent}>
                <div>属性名: x1</div>
                <div>属性类型: 数字</div>
                <div>属性描述
                    <p>轮子尺寸</p>
                </div>
                <div>
                    单位：cm
                </div>
                <div><a href="#">自定义分析</a></div>
        </div>
    );
};