import MathLibs from '@src/libs/math/math'
const { sqrt, min, max, floor} = MathLibs;

export { min, max };
export const sum = (data: any[]) => {
    let s = 0;
    data.forEach(d => {
        s += d;
    })
    return s;
};

export const mean = (data: any[]) => {
    let s:any = sum(data);
    return s / data.length;
}

export const minusMean = (data: any[])  => {
    const m = mean(data);
    return data.map((d: number) => d - m);
}

export const covariance = (x: any[], y: any[]) => {
    const minusX = minusMean(x);
    const minusY = minusMean(y);
    const n = minusX.length - 1;
    let s = 0;
    minusX.forEach((x: number, i: number) => {
        s += x * minusY[i];
    })

    return s / n;
}

export const corelation = (x: any[], y: any[]) => {
    const minusX = minusMean(x);
    const minusY = minusMean(y);
    const n = minusX.length - 1;
    let covS = 0;
    let smx = 0;
    let smy = 0;
    minusX.forEach((x: number, i: number) => {
        const y = minusY[i];
        covS += x * y;
        smx += x * x;
        smy += y * y;
    })

    const s = sqrt(smx * smy);

    return covS / s;
}

export const getAutoConvariance = (data: any[], k: number) => {
    const minusData = minusMean(data);
    let totalK = 0;
    const lens = minusData.length;
    for (let i = 0, l = lens - k; i < l; i++) {
        totalK += minusData[i] * minusData[i + k];
    }
    return totalK / lens;
}

export const getAutoCorrelationLag = (data: any[], lag = parseInt((data.length / 2).toString())) => {
    const corrs = [];
    for (let i = 0, l = lag + 1; i < l; i++) {
        const r = i > 0 ? getAutoCorrelation(data, i) : 1;
        corrs.push(r);
    }
    return corrs;
}

export const getAutoCorrelation = (data: any[], k = parseInt((data.length / 2).toString())) => {
    const minusData = minusMean(data);
    const total = minusData.reduce((a: number, b: number) => a + b * b, 0)
    let totalK = 0;
    const lens = minusData.length;
    for (let i = 0, l = lens - k; i < l; i++) {
        totalK += minusData[i] * minusData[i + k];
    }
    return totalK / total;
}

export const getPartialCorrelation = (data: any[], k = parseInt((data.length / 2).toString())) => {
    const r1 = getAutoCorrelation(data, 1);
    const corrs = [0, r1];
    const tempCorrs = [[0], [r1]];
    if (k === 1) return { lists: tempCorrs, value: tempCorrs[k][k - 1] };
    for (let i = 2; i <= k; i++) {
        corrs[i] =getAutoCorrelation(data, i);
        const lastCorrs = tempCorrs[i - 1];
        const currentCorrs = [];
        const l = lastCorrs.length;
        let upSum = 0;
        let downSum = 0;
        for (let j = 0; j < l; j++) {
            const flag = j + 1;
            upSum += lastCorrs[j] * corrs[i - flag];
            downSum += lastCorrs[j] * corrs[flag];
        }

        currentCorrs[i - 1] = (corrs[i] - upSum) / (1 - downSum);

        for (let m = 0; m < l; m++) {
            currentCorrs[m] = lastCorrs[m] - currentCorrs[i - 1] * lastCorrs[l - m - 1];
        }
        tempCorrs.push(currentCorrs);
    }
    return { lists: tempCorrs, value: tempCorrs[k][k - 1] };
}

export const quantile = (x: any[], p: number) => {
    const position = 1 + (x.length - 1) * p;
    const realPosition = floor(position);
    const index = realPosition - 1;//因为数组下标是从0开始的

    return x[index] + (x[index + 1] - x[index]) * (position - realPosition)

}

const getHistogram = (data: any, cnt = 10) => {
    const start = Math.min(...data)
    const end = Math.max(...data)

    const gap = end - start;
    const span = gap / cnt;
    const gs: any = {};

    for (let i = 0; i < cnt; i++) {
        const gmin = start + span * i;
        const gend = gmin + span;
        gs[i] = { min: gmin, max: gend };
    }

    const gps: any = {};

    data.forEach((d: any) => {
        var key: any = -1;
        for (let p in gs) {
            const {
                min,
                max
            } = gs[p];
            if (d >= min && d <= max) {
                key = p;
                gps[key] = gps[key] || [];
                gps[key].push(d);
                break;
            }
        }
    })

    for (let p in gps) {
        gps[p].p = gps[p].length / data.length;
    }

    return {
        gps,
        gs
    };
}

export const countData = (data:any) => {
    const maps: any = {}
    data.forEach((key: any) => {
        maps[key] = maps[key] || 0;
        maps[key]++;
    })

    const { gps } = getHistogram(data);
    return {
        gps,
        maps
    }
}

