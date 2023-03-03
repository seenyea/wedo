import React from "react"
import Accordions from '@src/components/composite/accordions/Accordions'
import ChartFormPanel from '@src/components/business/panels/chart-form-panel/ChartFormPanel'
import LegendFormPanel from '@src/components/business/panels/legend-form-panel/LegendFormPanel'
import SeriesFormPanel from '@src/components/business/panels/series-form-panel/SeriesFormPanel'
import AxisFormPanel from '@src/components/business/panels/Aixs-form-panel/AxisFormPanel'
import NavigatorFormPanel from '@src/components/business/panels/navigator-form-panel/NavigatorFormPanel'


const data = {
    title: '图表配置',
    items: [
        { id: '1', name: 'Chart', AccordionItem: ChartFormPanel, isSelected: true},
        { id: '2', name: 'Legend', AccordionItem: LegendFormPanel },
        { id: '3', name: 'Series', AccordionItem: SeriesFormPanel },
        { id: '4', name: 'Axis', AccordionItem: AxisFormPanel },
        { id: '5', name: 'Navigator', AccordionItem: NavigatorFormPanel }
    ]
}

export default () => {
    return <nav className="panel" style={{boxShadow: 'none'}}>
        <Accordions data={data} />
    </nav>
}