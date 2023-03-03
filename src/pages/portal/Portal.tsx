import React from 'react';

import { DataListColumn, PropertyListColumn, AnalysisResultColumn, PortalLayout, AnalysisResultColumnContent, AnalysisResultColumnContentBody, AnalysisResultColumnContentHeader, ChartPropertyContainer } from '@src/components/basic/layout/pages/portal-layout/PortalLayout';

import StatisticBasic from '@src/components/business/statistics/basic/StatisticBasic';
import StatisticGraph from '@src/components/business/statistics/hisgram/StatisticGraph';
import DataList from '@src/components/business/lists/data-list/DataList';
import PropertyList from '@src/components/business/lists/property-list/PropertyList';
import RecommendPanel from '@src/components/business/analysis/recommend-panel/RecommendPanel';
import ChartPropertyPanel from '@src/components/business/panels/chart-property-panel/ChartPropertyPanel';



export default () => {

    const lists = [{
        id: '1', 
        type: {
            imgSrc: '/public/imgs/common/andrew-avatar.png',
            content: ''
        },
        title: {
            main: '数据一',
            subject: 'GDP',
        },
        description: 'GDP',
        isSelected: true
    },{
            id: '2',
            type: {
                imgSrc: '/public/imgs/common/andrew-avatar.png',
                content: ''
            },
            title: {
                main: '数据一',
                subject: 'GDP',
            },
            description: 'GDP',
            isSelected: false
        }];
    return (
        <PortalLayout>
            <ChartPropertyContainer>
                <ChartPropertyPanel />
            </ChartPropertyContainer>
            <DataListColumn>
                <DataList lists={lists} />
            </DataListColumn>
            <PropertyListColumn>
                <PropertyList lists={lists} />
            </PropertyListColumn>
            <AnalysisResultColumn>
                <AnalysisResultColumnContentHeader>
                    <RecommendPanel />
                </AnalysisResultColumnContentHeader>
                <AnalysisResultColumnContent>
                    <AnalysisResultColumnContentBody>
                        
                        <StatisticBasic />
                        <StatisticGraph />
                    </AnalysisResultColumnContentBody>
                </AnalysisResultColumnContent>
            </AnalysisResultColumn>
        </PortalLayout>
    );
};