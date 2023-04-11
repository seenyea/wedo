import MathLibs from '@src/libs/math/math'
import { mean, covariance, min, max, quantile } from '@src/libs/stat/stat'

const quantileMap: any = [
    '0.05', '0.1', '0.125', '0.25', '0.5', '0.75', '0.875', '0.9', '0.95'
]

export const genChartOption = (data: any) => {
    const sortData = data ? [...data].sort((a, b) => a - b) : null;
    const m = data ? mean(data) : null;
    const ms = data ? data.map((d: any) => m) : null;
    const stdV = data ? MathLibs.sqrt(covariance(data, data)) : 0;
    const upperLines = data ? data.map((d: any) => m + 3 * stdV) : null;
    const lowerLines = data ? data.map((d: any) => max(m - 3 * stdV, 1)) : null;

    const defaultOption: any = data ? {
        tooltip: {},
        grid: {
            top: 20,
            bottom: 30
        },
        xAxis: {
            type: 'category',
            data: data.map((d: any, index: number) => index + 1)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '原始数据',
                data,
                type: 'line',
            },
            {
                name: '排序数据',
                data: sortData,
                type: 'line',
            },
            {
                name: '均值线',
                data: ms,
                type: 'line', 
            },
            {
                name: '上限线',
                data: upperLines,
                type: 'line',
            },
            {
                name: '下限线',
                data: lowerLines,
                type: 'line',
            },
        ]
    }: null;

    return defaultOption;
}

export const getStatInfo = (data: any[]) => {
    const sortData = data ? [...data].sort((a, b) => a - b) : null;
    const m = data ? mean(data) : 0;
    const stdVariance = data ? MathLibs.sqrt(covariance(data, data)) : 0;
    const _min = data ? min(data) : 0;
    const _max = data ? max(data) : 0;
    const upper = data ? min(m + 3 * stdVariance, _max) : 0;
    const lower = data ? max(m - 3 * stdVariance, _min) : 0;
    return data ? {
        mean: m,
        variance: covariance(data, data),
        stdVariance,
        min: _min,
        max: _max,
        upper, 
        lower,
        quantiles: quantileMap.map((p: any) => {
            const value = MathLibs.ceil(quantile(sortData, p * 1));
            const key = `${p * 100}%`;
            return {
                key, value
            }
        })
    }: null
}