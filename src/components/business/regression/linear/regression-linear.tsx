import React from 'react'

import './style.scss'

interface StatisticRegressionLinearProps {
}


export default (statisticRegressionLinearProps: StatisticRegressionLinearProps) => {
    return <div className="statistic-regression-linear">
        <div className="content is-medium">
            <h5>线性预测结果</h5>
            <p>计算结果是: y = 0.2 * x + 0.7</p>
        </div>
    </div>
}