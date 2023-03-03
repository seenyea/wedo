
import { sqrt } from '@src/libs/machine-learning/utils/math';
/**
* @param {number[]} data
* @return {number}
*/
export const mean = (data: number[]):number => {
    let sum = 0;
    const length = (data || []).length;
    if (length === 0) {
        /**
         * Mathematically, the mean of an empty set is undefined,
         * so we could return early here. We could also allow the function
         * to attempt dividing 0/0, would would return NaN in JavaScript
         * fail in some other languages (so probably a bad habit to encourage).
         * Ultimately, I would like this function to not return mixed
         * so instead let's throw an error.
         */
        throw new Error('Cannot calculate mean of empty set');
    }

    for (let i = 0; i < length; i++) {
        sum += data[i];
    }
    return sum / length;
}


/**
    * Calculates the N-dimensional distance between two points a and b.
    * Each point should be an array with length = 2, and both elements defined and numeric.
    * @param {number[]} a
    * @param {number[]} b
    * @return {number}
*/
export const distance = (a: number[], b: number[]): number => {
    const length = a.length;
    let sumOfSquares = 0;
    if (length !== b.length) {
        throw new Error('Points a and b must be the same length');
    }
    for (let i = 0; i < length; i++) {
        const diff = b[i] - a[i];
        sumOfSquares += diff * diff;
    }
    return sqrt(sumOfSquares);
}

/**
    * remove the same element in a number array
    * @param {number[]} a
    * @return {number[]}
*/
export const unique = (a: number[]):number[]  => {
    const set = new Set(a);
    return Array.from(set);
}
