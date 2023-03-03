import { random, sqrt } from '@src/libs/machine-learning/utils/math';
import { distance, mean, unique } from '@src/libs/machine-learning/utils';
interface MinMax {
    min: number,
    max: number
}

interface IterationLog{
    centroidAssignments: number[],
    centroids: number[][],
    iteration: number,
    error: number,
    didReachSteadyState: boolean
}

interface Category{
    class: number[],
    centers: number[][],
    groups: any
}

export default class KMeans {
    /**
     * The k parameter represents the k in k-means, or the desired number of clusters as the algorithm's output.
     */
    public k: number = 1;
    /**
     * The data parameter is an array of data points that the algorithm will process
     */
    public data: number[][] = [[0, 0]];
    /**
     * It is a simple counter of how many iterations the solver has run, starting from 0 
     */
    public iterations: number = 0;
    /**
     * It records the root mean square error (RMSE) of the points' distance to their centroids for the current iteration
     */
    public error: any = null;
    /**
     * It is an array of data point index numbers that map to a centroid index number
     */
    public centroidAssignments: number[] = [];
    /**
     * It will store the solver's candidates for the k centroids at the current iteration
     */
    public centroids: number[][] = [];

    public iterationLogs: IterationLog[] = [];

    /**
    * @param {number} k
    * @param {number[]} data
    */
    public constructor(k: number, data: number[][]) {
        this.k = k || 1;
        this.data = data || this.data;

        this.reset();
    }

    /**
    * Determines the number of dimensions in the dataset.
    * @return {number}
    */
    public getDimensionality = (): number => {
        const point = this.data[0];
        return point.length;
    }
    /**
    * For a given dimension in the dataset, determine the minimum
    * and maximum value. This is used during random initialization
    * to make sure the random centroids are in the same range as
    * the data.
    *
    * @param n
    * @returns {MinMax}
    */
    public getRangeForDimension = (n: number): MinMax => {
        const values = this.data.map(point => point[n]);
        return {
            min: Math.min.apply(null, values),
            max: Math.max.apply(null, values)
        };
    }

    /**
    * Get ranges for all dimensions.
    * @see getRangeForDimension
    * @returns {MinMax[]} Array whose indices are the dimension number and whose members are the output of getRangeForDimension
    */
    public getAllDimensionRanges = (): MinMax[] => {
        const dimensionRanges: MinMax[] = [];
        const dimensionality = this.getDimensionality();
        for (let i = 0; i < dimensionality; i++) {
            dimensionRanges[i] = this.getRangeForDimension(i);
        }
        return dimensionRanges;
    }

    /**
   * Initializes random centroids, using the ranges of the data
   * to set minimum and maximum bounds for the centroids.
   * You may inspect the output of this method if you need to debug
   * random initialization, otherwise this is an internal method.
   * @see getAllDimensionRanges
   * @see getRangeForDimension
   * @returns {number[][]}
   */
    public initRandomCentroids = (): number[][] => {
        const dimensionality = this.getDimensionality();
        const dimensionRanges = this.getAllDimensionRanges();
        const centroids = [];

        for (let i = 0; i < this.k; i++) {
            const point: number[] = [];
            for (let j = 0; j < dimensionality; j++) {
                const { min, max } = dimensionRanges[j];
                const value = min + (max - min) * random();
                point.push(value);
            }
            centroids.push(point);
        }
        return centroids;
    }
    /**
     * Given a point in the data to consider, determine the closest
     * centroid and assign the point to that centroid.
     * The return value of this method is a boolean which represents
     * whether the point's centroid assignment has changed;
     * this is used to determine the termination condition for the algorithm.
     * @param {number} pointIndex
     * @returns {boolean} Did the point change its assignment?
     */
    public assignPointToCentroid = (pointIndex: number): boolean => {
        const lastAssignedCentroid = this.centroidAssignments[pointIndex];
        const point = this.data[pointIndex];
        let minDistance = Infinity;
        let aassignedCentroid = -1;

        for (let i = 0, l = this.centroids.length; i < l; i++) {
            const centroid = this.centroids[i];
            const distanceToCentroid = distance(point, centroid);
            if (distanceToCentroid < minDistance) {
                minDistance = distanceToCentroid;
                aassignedCentroid = i;
            }
        }
        this.centroidAssignments[pointIndex] = aassignedCentroid;
        return aassignedCentroid !== lastAssignedCentroid;
    }

    /**
    * For all points in the data, call assignPointsToCentroids
    * and returns whether _any_ point's centroid assignment has
    * been updated.
    * @see assignPointToCentroid
    * @returns {boolean} Was any point's centroid assignment updated?
    */
    public assignPointsToCentroids = (): boolean => {
        let didAnyPointsGetReassigned = false;
        for (let i = 0; i < this.data.length; i++) {
            const wasReassigned = this.assignPointToCentroid(i);
            if (wasReassigned) didAnyPointsGetReassigned = true;
        }
        return didAnyPointsGetReassigned;
    }

    /**
    * Given a centroid to consider, returns an array
    * of all points assigned to that centroid.
    *
    * @param {number} centroidIndex
    * @returns {number[][]}
    */
    public getPointsForCentroid = (centroidIndex: number): number[][] => {
        const points = [];
        for (let i = 0, l = this.data.length; i < l; i++) {
            const assignment = this.centroidAssignments[i];
            if (assignment === centroidIndex) {
                points.push(this.data[i]);
            }
        }
        return points;
    }

    /**
    * Given a centroid to consider, update its location to
    * the mean value of the positions of points assigned to it.
    * @see getPointsForCentroid
    * @param centroidIndex
    * @returns {number[]}
    */
    public updateCentroidLocation = (centroidIndex: number): number[] => {
        const thisCentroidPoints = this.getPointsForCentroid(centroidIndex);
        if(thisCentroidPoints.length === 0) return [-1];
        const dimensionality = this.getDimensionality();
        const newCentroid = [];
        for (let i = 0; i < dimensionality; i++) {
            newCentroid[i] = mean(thisCentroidPoints.map(point => point[i]));
        }
        this.centroids[centroidIndex] = newCentroid;
        return newCentroid;
    }

    /**
    * For all centroids, call updateCentroidLocation
    */
    public updateCentroidLocations = () => {
        for (let i = 0, l = this.centroids.length; i < l; i++) {
            this.updateCentroidLocation(i);
        }
    }


    /**
    * Calculates the total "error" for the current state
    * of centroid positions and assignments.
    * Here, error is defined as the root-mean-squared distance
    * of all points to their centroids.
    * @returns {number}
    */
    public calculateError = (): number => {
        let sumDistanceSquared = 0;
        let lens = this.data.length;
        for (let i = 0; i < lens; i++) {
            const centroidIndex = this.centroidAssignments[i];
            const centroid = this.centroids[centroidIndex];
            const point = this.data[i];
            const thisDistance = distance(point, centroid);
            sumDistanceSquared += thisDistance * thisDistance;
        }
        this.error = sqrt(sumDistanceSquared / lens);
        return this.error;
    }



    /**
    * Run the k-means algorithm until either the solver reaches steady-state, * or the maxIterations allowed has been exceeded.
    * You are most likely interested in the centroids property of the output. *
    * @param {number} maxIterations Default 1000
    * @returns {any}
    */
    public solve = (maxIterations: number = 1000): any => {
        while (this.iterations < maxIterations) {
            const didAssignmentsChange = this.assignPointsToCentroids();
            this.updateCentroidLocations();
            this.calculateError();
            this.iterationLogs[this.iterations] = {
                centroidAssignments: [...this.centroidAssignments],
                centroids: [...this.centroids],
                iteration: this.iterations,
                error: this.error,
                didReachSteadyState: !didAssignmentsChange
            };
            if (didAssignmentsChange === false) {
                break;
            } 
            this.iterations++;
        }
        const results = this.iterationLogs[this.iterationLogs.length - 1];
        const category = <Category>{};
        category.class = unique(this.centroidAssignments).sort((a: number,b: number) => a - b);
        category.centers = this.centroids.filter((e, i) => category.class.indexOf(i) > -1);
        category.groups = {};
        this.centroidAssignments.forEach((cIndex, i) => {
            const centers = this.centroids[cIndex];
            const data = this.data[i];
            const index = category.class.indexOf(cIndex);
            const key = category.class[index];
            category.groups[key] = category.groups[key] || [];
            category.groups[key].push({
                category: key,
                data,
                centers,
                index: i
            });
        });
        return { ...results, category };
    }

    /**
    * Resets the solver state; use this if you wish to run the
    * same solver instance again with the same data points
    * but different initial conditions.
    */
    public reset = () => {
        this.error = null;
        this.iterations = 0;
        this.iterationLogs = [];
        this.centroids = this.initRandomCentroids();
        this.centroidAssignments = [];
    }
}
