import MathLibs from '@src/libs/math/math'
const { abs } = MathLibs;

const delta = 1e-10;

const withoutElementAtIndex = (arr: any, index: number) => [...arr.filter((d: any, i: number) => i !== index)];
const sum = (arr: any) => arr.reduce((acc: any, value: any) => acc + value, 0);


let genArray = (rows: number, cols: number, e = delta) => {
    let mar: any = [];

    for (let i = 0; i < rows; i++) {
        mar[i] = mar[i] ? mar[i] : [];
        for (let j = 0; j < cols; j++) {
            mar[i][j] = e;
        }
    }

    return new Matrix(mar);
};

let initValue = (A: any) => {
    if (!(A instanceof Array)) throw ('A is not Array');

    let temp = JSON.parse(JSON.stringify(A));

    if (!(A[0] instanceof Array)) {
        temp = [temp];
    }
    return temp;
}

let computeError = (a: any, b: any) => {
    const rows = a.length;
    let s = 0;
    for (let i = 0; i < rows; i++) {
        let d = a[i][i] - b[i][i];
        d = d * d;
        s += d;
    }
    return Math.sqrt(s);
}

let computeVecError = (a: any, b: any) => {
    const rows = a.length;
    let s = 0;
    for (let i = 0; i < rows; i++) {
        let d = a[i] - b[i];
        d = d * d;
        s += d;
    }
    return Math.sqrt(s);
}

let genMatrixByDefualt = (rows: number, cols: number, v = 0) => {
    let mar: any = [];
    for (let i = 0; i < rows; i++) {
        mar[i] = mar[i] ? mar[i] : [];
        for (let j = 0; j < cols; j++) {
            mar[i][j] = v;
        }
    }
    return new Matrix(mar);
};

const normalizeVector = (arr: any) => {
    let s = 0;
    const lens = arr.length;
    for (let i = 0; i < lens; i++) {
        s += arr[i] * arr[i];
    }
    s = Math.sqrt(s);
    return arr.map((d: any) => d / s);
}

export default class Matrix {
    public matrix: any;
    public rows: number;
    public cols: number;

    constructor(A: any) {
        this.matrix = initValue(A);
        this.rows = this.matrix.length;
        this.cols = this.matrix[0].length;
    }

    getSize() {
        return {
            rows: this.rows,
            cols: this.cols
        };
    }

    splitMatrix() {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let res: any = {
            L: [],
            D: [],
            U: []
        };

        for (let i = 0; i < rows; i++) {
            res.L[i] = res.L[i] ? res.L[i] : [];
            res.U[i] = res.U[i] ? res.U[i] : [];
            res.D[i] = res.D[i] ? res.D[i] : [];
            for (let j = 0; j < cols; j++) {
                let a = matrix[i][j];
                if (i > j) {
                    res.L[i][j] = 0 - a;
                    res.D[i][j] = 0;
                    res.U[i][j] = 0;
                } else if (i == j) {
                    res.L[i][j] = 0;
                    res.D[i][j] = 1 / a;
                    res.U[i][j] = 0;
                } else if (i < j) {
                    res.L[i][j] = 0;
                    res.D[i][j] = 0;
                    res.U[i][j] = 0 - a;
                }
            }
        }

        return {
            L: new Matrix(res.L),
            D: new Matrix(res.D),
            U: new Matrix(res.U)
        };
    }

    add(m: Matrix) {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let addtionMatrix = m.matrix;
        let mar: any = [];

        for (let i = 0; i < rows; i++) {
            mar[i] = mar[i] ? mar[i] : [];
            for (let j = 0; j < cols; j++) {
                mar[i][j] = (addtionMatrix[i][j] + matrix[i][j]);
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    scalarMutiply(muti: number) {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = matrix[i][j] * muti;
            }
        }
    }

    substract(m: Matrix) {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let addtionMatrix = m.matrix;
        let mar: any = [];

        for (let i = 0; i < rows; i++) {
            mar[i] = mar[i] ? mar[i] : [];
            for (let j = 0; j < cols; j++) {
                mar[i][j] = (matrix[i][j] - addtionMatrix[i][j]);
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    mutiply(m: Matrix) {
        let matrix = this.matrix;
        let rows = this.rows;


        let mutiplyMatrix = m.matrix;

        let cols = mutiplyMatrix[0].length;
        var mutiCols = matrix[0].length;

        let mar: any = [];

        for (let i = 0; i < rows; i++) {
            mar[i] = mar[i] ? mar[i] : [];
            for (let j = 0; j < cols; j++) {
                mar[i][j] = 0;
                for (let k = 0; k < mutiCols; k++) {
                    mar[i][j] += matrix[i][k] * mutiplyMatrix[k][j];
                }
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    solveMarixEquation(b: any, initX: any) {
        let res = this.splitMatrix();

        let tempX = initX;

        let fixParts = res.L.add(res.U);
        let cons = res.D.mutiply(b);
        let N = 1;

        fixParts = res.D.mutiply(fixParts);
        initX = fixParts.mutiply(initX).add(cons);

        while (!tempX.compare(initX)) {
            tempX = initX;
            console.log(`${N++}`);
            console.log(`${JSON.stringify(initX)}`);
            console.log(`======================`);
            initX = fixParts.mutiply(initX).add(cons);
        }

        return tempX;
    }

    compare(m: any, e = delta) {
        let rows = this.rows;
        let cols = this.cols;

        let matrix = this.matrix;
        let compareMatrix = m ? m : genMatrixByDefualt(rows, cols);
        compareMatrix = compareMatrix.matrix;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (abs(matrix[i][j] - compareMatrix[i][j]) > e) {
                    return false;
                }
            }
        }

        return true;
    }

    transpose() {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let mar: any = [];

        for (let i = 0; i < cols; i++) {
            mar[i] = mar[i] ? mar[i] : [];
            for (let j = 0; j < rows; j++) {
                mar[i][j] = matrix[j][i];
            }
        }

        let res = new Matrix(mar);
        return res;
    }

    getElementByColumn(colIndex: number) {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = colIndex - 1;

        let mar = [];

        for (let i = 0; i < rows; i++) {
            mar[i] = [];
            mar[i][0] = matrix[i][cols];
        }

        let res = new Matrix(mar);
        return res;
    }

    LUsplit() {
        let matrix = this.matrix;
        let rows = this.rows;
        let cols = this.cols;

        let computeL = (i: number, j: number, L: any, U: any) => {
            let sum = 0;
            let l = j;
            for (let k = 0; k < l; k++) {
                sum += L[i][k] * U[k][j];
            }
            return sum;
        };

        let computeU = (i: number, j: number, L: any, U: any) => {
            let sum = 0;
            let l = i;
            for (let k = 0; k < l; k++) {
                sum += L[i][k] * U[k][j];
            }
            return sum;
        };

        let L: any = [];
        let U: any = [];

        let k = 0;

        for (let i = 0; i < cols; i++) {
            L[i] = L[i] ? L[i] : [];
            U[i] = U[i] ? U[i] : [];
            for (let j = 0; j < rows; j++) {
                if (i <= j) {
                    U[i][j] = matrix[i][j] - computeU(i, j, L, U);
                    L[i][j] = (i < j) ? 0 : 1;
                } else {
                    U[i][j] = 0;
                    L[i][j] = (matrix[i][j] - computeL(i, j, L, U)) / U[j][j];
                }
            }
        }

        return {
            L: new Matrix(L),
            U: new Matrix(U)
        }
    }

    solveEqutionsByLU(b: any) {
        let m = this.LUsplit();
        let cols = this.cols;

        let computeY = (i: number, L: any, Y: any) => {
            let sum = 0;
            let l = i;
            for (let j = 0; j < l; j++) {
                sum += L[i][j] * Y[j];
            }
            return sum;
        };

        let computeX = (i: number, U: any, X: any) => {
            let sum = 0;
            let s = i + 1;
            for (let j = s; j < cols; j++) {
                sum += U[i][j] * X[j];
            }
            return sum;
        };

        let L = m.L.matrix;
        let U = m.U.matrix;
        let B = b;

        let Y = [B[0] / L[0][0]];


        for (let i = 1; i < cols; i++) {
            Y[i] = (B[i] - computeY(i, L, Y)) / L[i][i];
        }

        let X = [];
        let N = cols - 1;

        X[N] = Y[N] / U[N][N];

        for (let i = N - 1; i > -1; i--) {
            X[i] = (Y[i] - computeX(i, U, X)) / U[i][i];
        }

        return {
            X: new Matrix(X),
            Y: new Matrix(Y)
        }
    }

    one() {
        const {
            rows,
            cols
        } = this;
        const res = [];

        for (let j = 0; j < cols; j++) {
            res[j] = [];
            for (let i = 0; i < rows; i++) {
                res[j][i] = 0;
                if (i === j) {
                    res[j][i] = 1;
                }
            }
        }

        return new Matrix(res);
    }

    inv() {
        const b = this.one();
        const r: any = [];
        b.matrix.forEach((e: any, index: number) => {
            const res = this.solveEqutionsByLU(e).X.transpose();
            const { rows, matrix } = res;
            for (let i = 0; i < rows; i++) {
                r[i] = r[i] || [];
                r[i][index] = matrix[i][0];
            }
        });
        return new Matrix(r);
    }

    inverse() {
        // Declare variables
        var ratio;
        var a;
        var n = this.rows;

        // Put an identity matrix to the right of matrix
        const newArr = this.matrix.map((e: any) => [...e]);
        for (var i = 0; i < n; i++) {
            for (var j = n; j < 2 * n; j++) {
                if (i === (j - n)) {
                    newArr[i][j] = 1;
                } else {
                    newArr[i][j] = 0;
                }
            }
        }

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (i !== j) {
                    ratio = newArr[j][i] / newArr[i][i];
                    for (var k = 0; k < 2 * n; k++) {
                        newArr[j][k] -= ratio * newArr[i][k];
                    }
                }
            }
        }

        for (var i = 0; i < n; i++) {
            a = newArr[i][i];
            for (var j = 0; j < 2 * n; j++) {
                newArr[i][j] /= a;
            }
        }

        // Rmove the left-hand identity matrix
        for (var i = 0; i < n; i++) {
            newArr[i].splice(0, n);
        }

        return new Matrix(newArr);
    }

    determinant() {
        if (this.matrix.length !== this.matrix[0].length) {
            throw new Error('Only matrices with the same number of rows and columns are supported.')
        }

        if (this.matrix.length === 1) {
            return this.matrix[0][0];
        }

        if (this.matrix.length === 2) {
            return this.matrix[0][0] * this.matrix[1][1] - this.matrix[0][1] * this.matrix[1][0]
        }

        const parts = this.matrix[0].map((coef: number, index: number) => {
            const matrixRows = withoutElementAtIndex(this.matrix, 0).map(r => withoutElementAtIndex(r, index));
            const matrix = new Matrix(matrixRows)
            const result = coef * matrix.determinant()
            return index % 2 === 0 ? result : -result
        })

        return sum(parts)
    }

    map(func: any) {
        return new Matrix(
            this.matrix.map((row: any, i: number) => row.map((element: any, j: number) => func(element, i, j)))
        )
    }

    minor(i: number, j: number) {
        const newRows = withoutElementAtIndex(this.matrix, i)
            .map(row => withoutElementAtIndex(row, j))
        const matrix = new Matrix(newRows)
        return matrix.determinant()
    }

    cofactor(i: number, j: number) {
        const sign = Math.pow(-1, i + j)
        const minor = this.minor(i, j)
        const r = sign * minor;
        console.log(`${i}, ${j}, ${sign}, ${minor}, ${r}`);
        return r
    }

    adjugate() {
        return this
            .map((_: any, i: number, j: number) => this.cofactor(i, j))
    }

    inverseExact() {
        const determinant = this.determinant()
        if (determinant === 0) {
            throw new Error("Determinant can't be  zero.")
        }
        const adjugate = this.adjugate();
        const {
            matrix
        } = adjugate;
        const invMatrix = adjugate.transpose();
        const transposeAdjugate = invMatrix.matrix.map((r: any) => [...r]);
        invMatrix.scalarMutiply(1 / determinant)
        return {
            adjugate,
            transposeAdjugate,
            determinant,
            invMatrix
        };
    }

    static getSymmetricEigenvalues = (a: any) => {
        let l = null;
        let u = null;
        let N = 100;
        let A = new Matrix(a);
        let thelta = 1;
        const omega = 1e-8;
        const res = [];
        while (N > 0 && thelta > omega) {
            const lu = A.LUsplit();
            l = lu.L;
            u = lu.U;
            const b = u.mutiply(l);
            A = b;
            N--;
            const lens = res.length - 1;
            res.push(b.matrix);
            if (lens > -1) {
                thelta = computeError(res[lens], b.matrix);
            }
        }

        const lastEigenvalues = res[res.length - 1];
        const lens = lastEigenvalues.length;
        const eigenvalues = [];
        for (let i = 0; i < lens; i++) {
            eigenvalues.push(lastEigenvalues[i][i]);
        }
        return {
            res,
            thelta,
            eigenvalues,
            itetives: 100 - N
        };
    }

    static getEigenvectors = (a: any, eigenvalue: any) => {
        const rows = a.length;
        let thelta = 1;
        const omega = 1e-8;
        let vk = normalizeVector(a[0]);
        let ws = [];
        let N = 100;
        const newA = a.map((e: any, i: number) => {
            return [...e];
        });

        for (let i = 0; i < rows; i++) {
            newA[i][i] = newA[i][i] - eigenvalue;
        }

        const invMA = new Matrix(newA).inverse();

        while (N > 0 && thelta > omega) {
            const tvk = new Matrix(vk).transpose();
            let w = invMA.mutiply(tvk).transpose();
            w = normalizeVector(w.matrix[0]);
            thelta = computeVecError(vk, w);
            ws.push(w);
            vk = w;
            N--;
        }
        return {
            ws,
            vk,
            thelta,
            itetives: 100 - N
        }
    }

    static genMatrixByDefualt(rows: number, cols: number, v = 0) {
        return genMatrixByDefualt(rows, cols, v = 0)
    }
};