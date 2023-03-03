import React, { useCallback } from 'react';
import './style.scss';

interface DataItemProps{
    data: any,
    imgSrc: string,
    main: string, 
    subject: string, 
    description: string, 
    isSelected: boolean,
    onDataItemClick?: any
}

export default (props: DataItemProps) => {
    const { 
        data, imgSrc, main, subject, description, isSelected, onDataItemClick
    } = props;
    const wrapperCls = ['data-item', 'pure-g'];
    if (isSelected){
        wrapperCls.push('data-item-selected');
    }

    const onClickEvent = useCallback((e: any) => {
        onDataItemClick(data.id);
    }, []);

    return (
        <div className={wrapperCls.join(' ')} onClick={onClickEvent}>
            <div className="pure-u">
                <img width="32" height="32" alt={main} title={main} className="data-avatar" src={imgSrc} />
            </div>

            <div className="pure-u-3-4">
                <h5 className="data-name">{main}</h5>
                <h4 className="data-subject">{subject}</h4>
                <p className="data-desc">
                    {description}
                </p>
            </div>
        </div>
    );
};