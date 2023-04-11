import React, { useEffect } from 'react';

import { DataListColumn, PropertyListColumn, AnalysisResultColumn, PortalLayout, AnalysisResultColumnContent, AnalysisResultColumnContentBody, AnalysisResultColumnContentHeader, ChartPropertyContainer } from '@src/components/basic/layout/pages/portal-layout/PortalLayout';

import StatisticBasic from '@src/components/business/statistics/basic/StatisticBasic';
import StatisticGraph from '@src/components/business/statistics/hisgram/StatisticGraph';
import DataList from '@src/components/business/lists/data-list/DataList';
import PropertyList from '@src/components/business/lists/property-list/PropertyList';
import RecommendPanel from '@src/components/business/analysis/recommend-panel/RecommendPanel';
import LinearRegressionPanel from '@src/components/business/regression/linear/regression-linear'
//import ChartPropertyPanel from '@src/components/business/panels/chart-property-panel/ChartPropertyPanel';

import { callUpdateToStroe, } from '@src/model/share-store';


import { dataLists, propertyLists, statisticBasic, statisticGraph, linearRegression } from './module';
import { filterDataItemById, filterPropertyListByProprtyId, filterDataset } from './api';

/**
 * <ChartPropertyContainer>
                <ChartPropertyPanel />
            </ChartPropertyContainer>
 */

export default () => {

    useEffect(() => {
        callUpdateToStroe(dataLists, '1', '1');
        callUpdateToStroe(propertyLists, '1', ['1', '1']);
        callUpdateToStroe(statisticBasic, '1', ['1', 'r1'])
        callUpdateToStroe(statisticGraph, '1', ['1', 'r1'])
        callUpdateToStroe(linearRegression, '1', ['1', 'r1'])
    }, [])

    return (
        <PortalLayout>
            <DataListColumn>
                <DataList mId={dataLists} onFilterData={filterDataItemById} />
            </DataListColumn>
            <PropertyListColumn>
                <PropertyList mId={propertyLists} onFilterData={filterPropertyListByProprtyId} />
            </PropertyListColumn>
            <AnalysisResultColumn>
                <AnalysisResultColumnContentHeader>
                  <RecommendPanel />
              </AnalysisResultColumnContentHeader>
                 <AnalysisResultColumnContent>
                     <AnalysisResultColumnContentBody>
                        <StatisticBasic mId={statisticBasic} onFilterData={filterDataset} />
                        <StatisticGraph mId={statisticGraph} onFilterData={filterDataset}  />
                        <LinearRegressionPanel mId={linearRegression} onFilterData={filterDataset} />
                     </AnalysisResultColumnContentBody>
                 </AnalysisResultColumnContent>
             </AnalysisResultColumn>
        </PortalLayout>
    );
};