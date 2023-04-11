import React, { useEffect, useState } from 'react'
import Chart from '@src/components/composite/chart/Chart'
import { BoxLayout } from '@src/components/basic/layout/common/box-layout/BoxLayout';
import { genChartOption } from './hook';

import './style.scss';
import { bindUpdateToStore } from '@src/model/share-store';

interface StatisticGraphProps{
  mId: string,
  onFilterData: any
}

export default (statisticGraphProps: StatisticGraphProps) => {
  const { mId, onFilterData } = statisticGraphProps;

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
      <h3>数据统计信息</h3>
      <div className="content is-medium" style={{ marginTop: '0.5rem', flexDirection: 'column' }}>
        <Chart option={option.option1} />
      </div>
      <div className="content is-medium" style={{ marginTop: '0.5rem', flexDirection: 'column' }}>
        <Chart option={option.option2} />
      </div>
    </BoxLayout>}
  </section>
}