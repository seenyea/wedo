import React from 'react'
import Chart from '@src/components/composite/chart/Chart'
import { BoxLayout } from '@src/components/basic/layout/common/box-layout/BoxLayout';


import './style.scss';

const data = [120, 200, 150, 80, 70, 110, 130];

const option: any = {
  xAxis: {
    type: 'category',
    data: data.map((d, index) => index + 1)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
    }
  ]
};

export default () => {
  return <section className="business-statistic-basic">
    <BoxLayout>
      <h3>数据基本信息</h3>
      <div className="content">
        <Chart option={option} />
      </div>
      <div className="content">
        <h5>描述</h5>
        <ol>
          <li>均值: 50, 通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>方差: 30 通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>最大值: 30, 通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好，通过数据均值和方差来看，整个数据是稳定较好，通过数据均值和方差来看，整个数据是稳定较好，通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>最小值: 30 通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好， 通过数据均值和方差来看，整个数据是稳定较好</li>
          <li>
            <p>按照大小排序后，我们能得到如下的分位数</p>
            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">1/8分位数</p>
                  <p className="title">3,456</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">1/4分位数</p>
                  <p className="title">123</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">1/2分位数</p>
                  <p className="title">456K</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">3/4分位数</p>
                  <p className="title">789</p>
                </div>
              </div>
            </nav></li>
        </ol>
      </div>
    </BoxLayout>
  </section>
}