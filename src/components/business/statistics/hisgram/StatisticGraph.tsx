import React from 'react'
import Chart from '@src/components/composite/chart/Chart'
import { BoxLayout } from '@src/components/basic/layout/common/box-layout/BoxLayout';


import './style.scss';

const option: any = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};

export default () => {
  return <section className="business-statistic-basic">
    <BoxLayout>
      <h3>数据统计信息</h3>
      <div className="content is-medium" style={{ marginTop: '0.5rem', flexDirection: 'column' }}>
        <Chart option={option} />
      </div>
      <div className="content">
        <h5>描述</h5>
        <ol>
          <li>通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好，通过数据均值和方差来看，整个数据是稳定较好，通过数据均值和方差来看，整个数据是稳定较好，通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>通过数据均值和方差来看，整个数据是稳定较好</li>
        </ol>
      </div>
    </BoxLayout>
  </section>
}