import MathLibs from '@src/libs/math/math'
import { quantile } from '@src/libs/stat/stat'
import { linearRegressionBasic } from '@src/libs/linear-regression/linear-regression'
const { abs, min, max } = MathLibs;

const quantileMap: any = [
    0.25, 0.5, 0.75
]

export const genChartOption = (data: any, isConstant?: false) => {
    if (!data) return null;

    let x = data.map((d: any, i: number) => [1, i + 1]);
    let y = [...data];

    const info: any = linearRegressionBasic(x, y);

    const { predictionIntervals, predictions, theltas, residuals } = info;
    const expressArr = ['Y = '];
    theltas.forEach((t: number, i: number) => {
        expressArr[i] = expressArr[i] || '';
        if(i === 0){
            expressArr[i] += t;
        }else{
            expressArr[i] = t !== 0  ? `${t > 0 ? (' + ' + t) : (' - ' + abs(t)) }X${i}` : '';
        }
    })

    info.expression = expressArr.join('');
    info.quantileLists = [];
    info.quantileLists[0] = { key: 'Min', value: min(residuals)}
    quantileMap.forEach((d: number) => {
        const key: string = `${d * 100}%`;
        const value = quantile(residuals, d);
        info.quantileLists.push({ key, value });
    });
    info.quantileLists.push({ key: 'Max', value: max(residuals) })

    const lowerLiines: any = [];
    const upperLiines: any = [];
    predictionIntervals.forEach((d: number[]) => {
        const [p1, p2] = d;
        upperLiines.push(p1);
        lowerLiines.push(p2);
    })

    const option: any = {
        grid: {
            top: 20,
            bottom: 30
        },
        xAxis: {
            type: 'category',
            data: x.map((e: any, i: number) => i + 1)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '观测值',
                data: [...y],
                type: 'line'
            },
            {
                name: '预测下限',
                data: lowerLiines,
                type: 'line'
                
            },
            {
                name: '预测上限',
                data: upperLiines,
                type: 'line'

            },
            {
                name: '预测值',
                data: predictions,
                type: 'line'
            }
        ]
    };


    return {
        option,
        info
    };
}