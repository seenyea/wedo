import React from 'react'
import Chart from '@src/components/composite/chart/Chart'
import List from '@src/components/business/analysis/list/List'


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
  return <section className="business-statistic-graph">
    <div className="box">
      <div className="content is-medium">
        <h5>数据基本统计信息</h5>
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">均值</p>
              <p className="title">4.5</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">方差</p>
              <p className="title">30</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">标准方差</p>
              <p className="title">5.5</p>
            </div>
          </div>
        </nav>
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">数据总条数</p>
              <p className="title">1</p>
            </div>
            <div>
              <p className="heading">1/4分位数</p>
              <p className="title">1</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">数据累加</p>
              <p className="title">30,000</p>
            </div>
            <div>
              <p className="heading">1/4分位数</p>
              <p className="title">30,000</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">最小值</p>
              <p className="title">1</p>
            </div>
            <div>
              <p className="heading">1/2分位数</p>
              <p className="title">30,000</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">最大值</p>
              <p className="title">30,000</p>
            </div>
            <div>
              <p className="heading">3/4分位数</p>
              <p className="title">30,000</p>
            </div>
          </div>
        </nav>
      </div>
      <div className="content is-medium" style={{ marginTop: '0.5rem', flexDirection: 'column' }}>
        <h5>数据直方图</h5>
        <Chart option={option} />
      </div>
    </div>
  </section>
}