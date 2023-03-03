import KMeans from '@src/libs/machine-learning/k-means';
class KMeansAutoSolver {
    public kMin: number = 1;
    public kMax: number = 5;
    public maxTrials: number = 5;
    public data: number[][] = [];
    public best: any;
    public log: any[];
    constructor(kMin: number, kMax: number, maxTrials: number, data: number[][]) {
        this.kMin = kMin || this.kMin;
        this.kMax = kMax || this.kMax;
        this.maxTrials = maxTrials || this.maxTrials;
        this.data = data;
        this.reset();
    }
    reset() {
        this.best = null;
        this.log = [];
    }
    solve(maxIterations = 1000) {
        for (let k = this.kMin; k < this.kMax; k++) {
            for (let currentTrial = 0; currentTrial < this.maxTrials; currentTrial++) {
                const solver = new KMeans(k, this.data);
                // Add k and currentTrial number to the solution before logging
                const solution = Object.assign({}, solver.solve(maxIterations), { k, currentTrial });
                this.log.push(solution);
                if (this.best === null || solution.error < this.best.error){
                    this.best = solution;
                }
            }
        }
        return this.best;
    }
}
export default KMeansAutoSolver;
