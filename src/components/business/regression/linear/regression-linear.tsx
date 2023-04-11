import React, { useEffect, useState } from 'react'
import Chart from '@src/components/composite/chart/Chart'
import { BoxLayout } from '@src/components/basic/layout/common/box-layout/BoxLayout';
import { genChartOption } from './hook';

import './style.scss';
import { bindUpdateToStore } from '@src/model/share-store';

interface LinearRegressionProps {
    mId: string,
    onFilterData: any
}

export default (linearRegressionProps: LinearRegressionProps) => {
    const { mId, onFilterData } = linearRegressionProps;

    const [option, setOption] = useState(genChartOption(null));

    useEffect(() => {

        bindUpdateToStore(mId, '1', (d: any) => {
            const [dataId, key] = d;
            const data = onFilterData(dataId, key);
            setOption(genChartOption(data));
        })

    }, []);

    return <section className="business-statistic-basic">
        {option && <BoxLayout>
            <h3>线性回归</h3>
            <div className="content is-medium" style={{ marginTop: '0.5rem', flexDirection: 'column' }}>
                <Chart option={option.option} />
            </div>
            <div className="content">
                <h5>描述</h5>
                <ol>
                    <li>
                        <p>线性模型: {option.info.expression}</p>
                    </li>
                    <li>
                        <p>残差分位数:</p>
                        <nav className="level">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">分位数</p>
                                    <p className="title">数值</p>
                                </div>
                            </div>
                            {option.info.quantileLists.map((quantile: any) => {
                                const { key, value } = quantile;
                                return <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">{key}</p>
                                        <p className="title">{value}</p>
                                    </div>
                                </div>
                            })}
                        </nav>
                    </li>
                    <li>
                        <p>Multiple R-squared: {option.info.RR}</p>
                        <p>Adjusted R-squared: {option.info.RRA}</p>
                    </li>
                    <li>
                        Residual standard error: {Math.sqrt(option.info.ss)} on {option.info.residualDF} degrees of freedom
                    </li>
                    <li>
                        F-statistic: {option.info.F} on {option.info.regressionDF} and {option.info.residualDF} degrees of freedom
                    </li>
                    
                </ol>
            </div>
        </BoxLayout>}
    </section>
}