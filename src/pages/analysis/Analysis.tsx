import React from "react"

import { Container, Section, Bar } from '@src/components/basic/layout/simple-resizer'
import List from '@src/components/business/analysis/list/List'
import StatisticBasic from "@src/components/business/statistics/basic/StatisticBasic"
import RecommendPanel from '@src/components/business/analysis/recommend-panel/RecommendPanel'

export default (props: any) => {
  return (
    <Container style={{ height: '100%' }}>
      <Section style={{ background: '#d3d3d3', overflow: 'auto' }} minSize={100}>
        <StatisticBasic />
        <RecommendPanel />
      </Section>
    </Container>
  )
} 