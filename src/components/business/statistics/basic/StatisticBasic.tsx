import React, { useEffect, useState } from 'react'

import Chart from '@src/components/composite/chart/Chart'
import { BoxLayout } from '@src/components/basic/layout/common/box-layout/BoxLayout'
import Toggle from '@src/components/basic/form/toggle/Toggle'
import RangeWithNumber from '@src/components/composite/form/range-with-number/RangeWithNumber'

import { bindUpdateToStore } from '@src/model/share-store';

import { genChartOption, getStatInfo } from './hook'


import './style.scss';

interface StatisticBasicProps{
  mId: string,
  onFilterData: any
}

export default (statisticBasicProps: StatisticBasicProps) => {
  const { mId, onFilterData } = statisticBasicProps;
  const [option, setOption] = useState(genChartOption(null));
  const [statInfo, setStatInfo] = useState(getStatInfo(null));

  useEffect(() => {

    bindUpdateToStore(mId, '1', (d: any) => {
      const [dataId, key] = d;
      const data = onFilterData(dataId, key);
      setOption(genChartOption(data));
      setStatInfo(getStatInfo(data));
    })

  }, []);

  return <section className="business-statistic-basic">
    {option && <BoxLayout>
      <h3>数据基本信息</h3>
      <div className="content">
        <Chart option={option} />
      </div>
      <div className="content">
        <h5>描述</h5>
        <ol>
          <li>
            <div className="field is-grouped">
              <p className="control is-expanded">
                均值: {statInfo.mean}
              </p>
              <p className="control">
                <Toggle />
              </p>
            </div>
          </li>
          <li>方差: {statInfo.variance}, 标准差:{statInfo.stdVariance}</li>
          <li>
            <RangeWithNumber label="数据范围" min={statInfo.min + ''} max={statInfo.max + ''} defaultValue={statInfo.min + ''} disabled={false} />
          </li>
          <li>下限值: {statInfo.lower}, 上限值: {statInfo.upper}</li>
          <li>
            <p>按照大小排序后，我们能得到如下的分位数</p>
            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">分位数</p>
                  <p className="title">数值</p>
                </div>
              </div>
              {statInfo.quantiles.map((quantile: any) => {
                const { key, value } = quantile;
                return <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">{key}</p>
                    <p className="title">{value}</p>
                  </div>
                </div>
              })}
            </nav></li>
        </ol>
      </div>
    </BoxLayout>}
  </section>
}