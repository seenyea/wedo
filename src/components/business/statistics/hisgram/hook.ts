import MathLibs from '@src/libs/math/math'
import { countData } from '@src/libs/stat/stat'
const { min, max } = MathLibs;

const quantileMap: any = [
    '0.05', '0.1', '0.125', '0.25', '0.5', '0.75', '0.875', '0.9', '0.95'
]


export const genChartOption = (data: any) => {
    if (!data) return null;
    const info = {
        lens: 0,
        d1: {
            min: Infinity,
            max: -Infinity
        },
        d2:{
            min: Infinity,
            max: -Infinity
        }
    }

    info.lens = data.length;

    const { maps, gps } = countData(data);
    const d1 = Object.keys(maps).map((key: string) => {
        const value = maps[key];
        info.d1.min = value < info.d1.min ? value : info.d1.min;
        info.d1.max = value > info.d1.max ? value : info.d1.max;
        return {key, value}
    }).sort((a: any, b: any) => a.key - b.key);

    const d2 = Object.keys(gps).map((index: string) => {
        const value = gps[index];
        const _min = min(value);
        const _max = max(value);
        const key = `${_min}-${_max}`;
        const lens = value.length;
        info.d2.min = lens < info.d1.min ? lens : info.d1.min;
        info.d2.max = lens > info.d1.max ? lens: info.d1.max;
        return { key, value: lens, index };
    }).sort((a: any, b: any) => a.index - b.index);

    const option1: any = {
        grid: {
            top: 20,
            bottom: 30
        },
        xAxis: {
            type: 'category',
            data: d1.map((e: any) => e.key)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: d1.map((e: any) => e.value),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    const option2: any = {
        grid: {
            top: 20,
            bottom: 30
        },
        xAxis: {
            type: 'category',
            data: d2.map((e: any) => e.key)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: d2.map((e: any) => e.value),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    return {
        option1,
        option2,
        info
    };
}