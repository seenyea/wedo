import {
    data_ssq
} from './data/ssq'
import {
    data_dlt
} from './data/dlt'


let lists: any = null;
const tempData = {
    selectedDataId: '-1',
    selectedPropertyId: '-1',
    selectedDataKey: 'r1',
    selectedAnalysisType: '1'
};

const init = () => {
    const data = getDataLists();
    
}

export const getDataLists = () => {
    lists = lists || [data_ssq, data_dlt];
    return lists;
}

export const filterDataItemById = (dataId: string) => {
    if(!lists){
        getDataLists();
    }
    if (!lists) {
        return null;
    }

    let selectedData: any = null;
    lists.forEach((d: any) => {
        const isSelected = d.id === dataId;
        d.isSelected = isSelected
        if (isSelected)
            selectedData = d;
    });

    if (!selectedData) return null;

    const {
        id,
        properties,
        originData,
    } = selectedData;

    return {
        id,
        properties,
        originData,
        lists
    }
}

export const filterPropertyListByProprtyId = (dataId: string, proprtyId: string) => {

    const selectedData = filterDataItemById(dataId);
    if (!selectedData) return null;

    const { 
        id,
        properties,
        originData,
    } = selectedData;
    let key = 'r1';
    properties.forEach((e: any) => {
        const isSelected = e.id === proprtyId;
        e.isSelected = isSelected;
        if (isSelected){
            key = e.key;
        }
        return e;
    });
    return {
        dataId,
        proprtyId,
        properties,
        key
    }
}

export const filterDataset = (dataId: string, key: string) => {
    const selectedData = filterDataItemById(dataId);
    if (!selectedData) return null;
    const {
        originData,
    } = selectedData;
    const selectedDataset = originData.map((d: any) => d[key] * 1);
    return selectedDataset;
}