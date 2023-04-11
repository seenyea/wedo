import Matrix from '@src/libs/matrix/matrix'
import { invStudentT, studentTProb } from '@src/libs/distribution/student'
import { mean, } from '@src/libs/stat/stat'
import MathLibs from '@src/libs/math/math'
const { sqrt } = MathLibs;

/**
 * 
 * @param xarr 
 * @param yarr 
 * @returns 
 */
export const linearRegressionBasic = (xarr: any, yarr: any) => {

    const hasConstant: any = !!xarr.reduce((a: number, b: number[]) => a * (b[0] === 1 ? 1 : 0), 1)

    const n = xarr.length;
    const paramNums = xarr[0].length;
    const regressionDF = paramNums - hasConstant * 1;
    const residualDF = n - regressionDF - 1;

    const tValue = invStudentT(residualDF, 0.05).twoTailed

    const x = new Matrix(xarr);
    const y = new Matrix(yarr);
    const tx = x.transpose();
    const xx = tx.mutiply(x); //transpose
    const b = tx.mutiply(y.transpose());

    const invXX = xx.inverseExact().invMatrix;

    //The n × n matrix H = X(X′X)−1X′ is usually called the “hat” matrix because it maps the vector of observed values into a vector of fitted values.
    const P = x.mutiply(invXX).mutiply(tx);

    const H = P.matrix.map((h: any, i: number) => {
        return h[i];
    })

    const res = xx.solveEqutionsByLU(b.transpose().matrix[0]);

    const { matrix } = res.X;

    //estimated parameters
    const theltas = matrix[0];

    //An array caches the predicted points
    const predictions = xarr.map((e: any) => {
        let sum = 0;
        e.forEach((a: number, i: number) => {
            sum += a * theltas[i];
        });
        return sum;
    })

    //An array caches the difference between a differences value and a predicted point
    const residuals: any = [];
    //Sum of Squares Total, The sum of squared differences between individual data points (yi) and the mean of the response variable (y)
    let SST = 0;
    // Sum of Squares Error, The sum of squared differences between predicted data points (ŷi) and observed data points (yi)
    let SSE = 0;
    //The prediction sum of squares is a model validation method used to assess a model's predictive ability that can also be used to compare regression models
    let PRESS = 0;
    const my = mean(yarr);
    yarr.forEach((y: any, i: number) => {
        const e = y - predictions[i];
        residuals.push(e);
        SSE += e * e;
        SST += (y - my) * (y - my);
        PRESS += e * e / (1 - H[i]);
    })
    //the Sum of Squares Regression, the sum of squared differences between predicted data points (ŷi) and the mean of the response variable(y).
    const SSR = SST - SSE;

    const ss = SSE / residualDF;
    //compute all the properties' mean;
    const mx: any = [];
    xarr.forEach((x: any) => {
        x.forEach((m: any, i: number) => {
            mx[i] = mx[i] || 0;
            mx[i] += m;
        })
    });
    mx.forEach((m: any, i: number) => {
        mx[i] = mx[i] / n;
    })

    //
    const RR = 1 - SSE / SST;
    const RRA = 1 - (n - 1) / residualDF * (1 - RR);
    const RRPred = 1 - PRESS / SST;
    const s = sqrt(ss);
    const F = (SSR / regressionDF) / ss;

    const stdTheltasVatiance: any = [];
    const studentTTheltas: any = [];
    theltas.forEach((e: any, i: number) => {
        stdTheltasVatiance[i] = s * sqrt(invXX.matrix[i][i]);
        studentTTheltas[i] = e / stdTheltasVatiance[i];
    })

    const studentTTheltasProbs = studentTTheltas.map((x: number) => studentTProb(residualDF, x))
    const studentTTheltasIntevals = theltas.map((thelta: number, i: number) => {
        const t = studentTTheltas[i];
        const s = stdTheltasVatiance[i];
        const m = tValue;
        const c = m * s;
        return [thelta - c, thelta + c];
    })

    const FitSStdEs: any = [];
    const PredictStdSEs: any = [];
    xarr.forEach((x: any) => {
        const xm = new Matrix(x);
        const b = xm.mutiply(invXX).mutiply(xm.transpose());
        const fitse = Math.sqrt(ss * b.matrix[0][0]);
        const predictse = Math.sqrt(ss * (1 + b.matrix[0][0]))
        FitSStdEs.push(fitse);
        PredictStdSEs.push(predictse);
    })

    const confidenceIntervals: any = [];
    const predictionIntervals: any = [];
    predictions.forEach((fitY: any, i: number) => {
        const m = tValue;
        const c1 = FitSStdEs[i] * m;
        const c2 = PredictStdSEs[i] * m;
        const ci = [fitY - c1, fitY + c1];
        const pi = [fitY - c2, fitY + c2];
        confidenceIntervals.push(ci);
        predictionIntervals.push(pi);
    })

    const predictFn = (x: any) => {
        const xm = new Matrix(x);
        const b = xm.mutiply(invXX).mutiply(xm.transpose());
        let predict = 0;
        x.forEach((a: any, i: number) => {
            predict += a * theltas[i];
        });
        const fitse = Math.sqrt(ss * b.matrix[0][0]);
        const predictse = Math.sqrt(ss * (1 + b.matrix[0][0]))

        const m = tValue;
        const c1 = fitse * m;
        const c2 = predictse * m;
        const confidenceIntervals = [predict - c1, predict + c1];
        const predictionIntervals = [predict - c2, predict + c2];

        return {
            predict,
            fitse,
            predictse,
            tValue,
            confidenceIntervals,
            predictionIntervals
        }
    }

    const StandardizedResiduals: any = [];
    const StudentizedResiduals: any = [];
    const RStundets: any = [];
    const CooksDistances: any = [];
    const rankP = H.reduce((a: any, b: any) => a + b, 0);
    let dwUp = 0;
    let dwDown = 0;

    residuals.forEach((r: any, i: number) => {
        dwDown += r * r;
        if (i > 0) {
            dwUp += (r - residuals[i - 1]) * (r - residuals[i - 1]);
        }
        const a = H[i];
        const b = 1 - H[i];
        const sr = r / s;
        const str = sr / Math.sqrt(b);
        const si = (SSE - r * r / b) / (residualDF - 1);
        const rst = r / Math.sqrt(si * b);
        const cooksDistance = str * str / rankP * a / b;
        StandardizedResiduals.push(sr);
        StudentizedResiduals.push(str);
        RStundets.push(rst);
        CooksDistances.push(cooksDistance);
    });

    const dw = dwUp / dwDown;
    const k = regressionDF + 1;
    const C = Math.log(ss);
    const AIC = C + (1 + 2 * k / n);
    const AICc = C + (n + k) / (n - k - 2);
    const AICp = n * Math.log(SSE / n) + 2 * paramNums;
    const AICcp = AICp + 2 * (paramNums + 2) * (paramNums + 3) / (n - paramNums - 3);
    const BIC = C + k * Math.log(n) / n;
    const BICp = n * Math.log(SSE / n) + paramNums * Math.log(n);
    const Cp = SSE / ss + (2 * paramNums - n);

    return {
        n,
        regressionDF,
        theltas,
        stdTheltasVatiance,
        studentTTheltas,
        studentTTheltasProbs,
        studentTTheltasIntevals,
        PredictStdSEs,
        FitSStdEs,
        F,
        SSE,
        SST,
        SSR,
        dw,
        residualDF,
        predictions,
        confidenceIntervals,
        predictionIntervals,
        ss,
        s,
        mx,
        my,
        P,
        H,
        paramNums,
        rankP,
        PRESS,
        RR,
        RRA,
        RRPred,
        AIC,
        AICc,
        AICp,
        AICcp,
        BIC,
        BICp,
        Cp,
        CooksDistances,
        residuals,
        StandardizedResiduals,
        StudentizedResiduals,
        RStundets,
        predictFn
    };

}


/*const linearRegressionAdvance = (x, y) => {
    const groupY = {};
    x.forEach((key, i) => {
        groupY[key] = groupY[key] || [];
        groupY[key].push(y[i]);
    })
    const newX = x.map(e => [1, e])
    const pred = linearRegressionBasic(newX, y);
    const {
        SSE
    } = pred;
    const c = Object.keys(groupY).length;
    const n = y.length;
    const SSTO = stat_uitls.minusMean(y).reduce((a, b) => a + b * b, 0);
    const SSPE = Object.keys(groupY).map(key => {
        const my = groupY[key];
        return stat_uitls.minusMean(my).reduce((a, b) => a + b * b, 0);
    }).reduce((a, b) => a + b, 0);
    const SSLF = SSE - SSPE;
    const SSPE_DF = n - c;
    const SSLF_DF = c - 2;
    const LACK_OF_FIT_F = SSLF / SSPE * SSPE_DF / SSLF_DF;
    const MAXRR = 1 - SSPE / SSTO;

    const lackoffit = {
        SSTO,
        SSPE,
        c,
        n,
        SSLF,
        SSPE_DF,
        SSLF_DF,
        LACK_OF_FIT_F,
        MAXRR,
        groupY
    };

    const bartlettTest = {
        maps: [],
        v: [],
        m: -1,
        se: SSPE / SSPE_DF,
        sv: SSPE_DF,
        B: 0,
        C: 0
    }

    const groupArr = Object.keys(groupY).sort((a, b) => a - b).map(key => {
        return { key, lists: groupY[key] }
    }).filter(e => e.lists.length > 1).sort((a, b) => a.key - b.key);

    bartlettTest.m = groupArr.length;
    bartlettTest.maps = groupArr.map(e => {
        const { lists, key } = e;
        const v = lists.length - 1;
        const s = stat_uitls.minusMean(lists).reduce((a, b) => a + b * b, 0) / v;
        bartlettTest.v.push(v);
        bartlettTest.C += 1 / v;
        bartlettTest.B += v * Math.log(s);
        return { key, s, v };
    })
    bartlettTest.C -= 1 / bartlettTest.sv;
    bartlettTest.C /= 3 * (bartlettTest.m - 1);
    bartlettTest.C += 1;

    bartlettTest.B = bartlettTest.m * Math.log(bartlettTest.se) - bartlettTest.B;
    bartlettTest.B /= bartlettTest.C;

    return {
        bartlettTest,
        lackoffit,
        pred
    }
}

const weightedLeastSquares = (xarr, yarr) => {

    const ols = linearRegressionBasic(xarr, yarr);
    const {
        residuals
    } = ols;
    const n = xarr.length;

    const rols = linearRegressionBasic(xarr, residuals.map(r => Math.abs(r)));
    const {
        predictions
    } = rols;

    const w = [];
    const weights = [];
    for (let i = 0; i < n; i++) {
        w[i] = [];
        let weight = predictions[i];
        weight = weight * weight;
        weight = 1 / weight;
        weights.push(weight);
        for (let j = 0; j < n; j++) {
            w[i][j] = i === j ? weight : 0;
        }
    }

    const x = new Matrix(xarr);
    const y = new Matrix(yarr);
    const tx = x.transpose();
    const wm = new Matrix(w);

    const newXM = x.transpose().mutiply(wm).mutiply(x);
    const newYM = x.transpose().mutiply(wm).mutiply(y.transpose()).transpose();

    const invXX = newXM.inv();

    //The n × n matrix H = X(X′X)−1X′ is usually called the “hat” matrix because it maps the vector of observed values into a vector of fitted values.
    const P = x.mutiply(invXX).mutiply(tx);

    const H = P.matrix.map((h, i) => {
        return h[i];
    })

    const res = newXM.solveEqutionsByLU(newYM.matrix[0]);
    const {
        matrix
    } = res.X;
    const theltas = matrix[0];
    const olsWeight = {
        theltas,
        invXX,
        weights
    };
    return {
        newXM,
        newYM,
        ols,
        rols,
        olsWeight
    }
}

const weightedLeastSquares2 = (xarr, yarr) => {

    const ols = linearRegressionBasic(xarr, yarr);
    const {
        residuals
    } = ols;
    const n = xarr.length;

    const rols = linearRegressionBasic(xarr, residuals.map(r => Math.abs(r)));
    const predictions = residuals.map(r => Math.abs(r));

    const w = [];
    const weights = [];
    for (let i = 0; i < n; i++) {
        w[i] = [];
        let weight = predictions[i];
        weight = weight * weight;
        weight = 1 / weight;
        weights.push(weight);
        for (let j = 0; j < n; j++) {
            w[i][j] = i === j ? weight : 0;
        }
    }

    const x = new Matrix(xarr);
    const y = new Matrix(yarr);
    const tx = x.transpose();
    const wm = new Matrix(w);

    const newXM = x.transpose().mutiply(wm).mutiply(x);
    const newYM = x.transpose().mutiply(wm).mutiply(y.transpose()).transpose();

    const invXX = newXM.inv();

    //The n × n matrix H = X(X′X)−1X′ is usually called the “hat” matrix because it maps the vector of observed values into a vector of fitted values.
    const P = x.mutiply(invXX).mutiply(tx);

    const H = P.matrix.map((h, i) => {
        return h[i];
    })

    const res = newXM.solveEqutionsByLU(newYM.matrix[0]);
    const {
        matrix
    } = res.X;
    const theltas = matrix[0];
    const olsWeight = {
        theltas,
        invXX,
        weights
    };
    return {
        newXM,
        newYM,
        ols,
        rols,
        olsWeight
    }
}

const weightedLeastSquares3 = (xarr, yarr) => {

    const ols = linearRegressionBasic(xarr, yarr);
    const {
        residuals
    } = ols;
    const n = xarr.length;

    const rols = linearRegressionBasic(xarr, residuals.map(r => Math.abs(r)));
    const predictions = residuals.map(r => Math.abs(r));

    const w = [];
    const weights = [];
    for (let i = 0; i < n; i++) {
        w[i] = [];
        let weight = predictions[i];
        weight = weight * weight;
        weight = 1 / weight;
        weights.push(weight);
        for (let j = 0; j < n; j++) {
            w[i][j] = i === j ? weight : 0;
        }
    }

    const x = new Matrix(xarr);
    const y = new Matrix(yarr);
    const tx = x.transpose();
    const wm = new Matrix(w);

    const newXM = x.transpose().mutiply(wm).mutiply(x);
    const newYM = x.transpose().mutiply(wm).mutiply(y.transpose()).transpose();

    const invXX = newXM.inv();

    //The n × n matrix H = X(X′X)−1X′ is usually called the “hat” matrix because it maps the vector of observed values into a vector of fitted values.
    const P = x.mutiply(invXX).mutiply(tx);

    const H = P.matrix.map((h, i) => {
        return h[i];
    })

    const res = newXM.solveEqutionsByLU(newYM.matrix[0]);
    const {
        matrix
    } = res.X;
    const theltas = matrix[0];
    const olsWeight = {
        theltas,
        invXX,
        weights
    };
    return {
        newXM,
        newYM,
        ols,
        rols,
        olsWeight
    }
}

const getStdVal = s => {
    const ms = stat_uitls.minusMean(s);
    const a = Math.sqrt(ms.reduce((a, b) => a + b * b, 0) / (ms.length - 1));
    return ms.map(d => d / a);
}

const varianceInflationFactor = (x) => {
    const lens = x[0].length;
    const rows = x.length;
    const vifs = [];
    const olses = [];
    for (let i = 0; i < lens; i++) {
        const newX = [];
        const y = [];
        for (let j = 0; j < rows; j++) {
            const d = x[j];
            const item = [1, ...d.filter((e, k) => i !== k)];
            newX.push(item);
            y.push(d[i]);
        }
        const ols = linearRegressionBasic(newX, y);
        olses.push(ols);
        vifs.push(1 / (1 - ols.RR));
    }
    const mvif = mean(vifs);
    return {
        vifs,
        mvif,
        olses
    };
}

const standardizedLinearRegression = (x, y) => {
    let m_x = new Matrix(x).transpose();
    let stdX = m_x.matrix.map(s => {
        return [...getStdVal(s)];
    })

    stdX = new Matrix(stdX).transpose().matrix;
    const stdY = getStdVal(y);
    const ols = linearRegressionBasic(stdX, stdY);

    return ols;
}*/