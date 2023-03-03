import { distance } from '@src/libs/machine-learning/utils';

interface KNNData {
    data: number[];
    label: string;
}

interface KNNDistanceMap {
    index: number,
    distance: number,
    label: string
}

interface KNNResult{
    label:string,
    voteCounts: any[],
    votes: KNNDistanceMap[]
}

export default class KNN {
    public k: number = 1;
    public data: KNNData[] = [];
    public labels: string[] = [];
    constructor(k: number, data: KNNData[]) {
        this.k = k || this.k;
        this.data = data || this.data;
        this.labels = this.data.map(e => e.label);
    }

    /**
     * calculates a sorted list of distances from the test point to the training points
     * @param {number[]} point 
     * @returns {KNNDistanceMap[]}
     */
    generateDistanceMap(point: number[]): KNNDistanceMap[] {
        const map: KNNDistanceMap[] = [];
        let maxDistanceInMap = Infinity;
        for (let index = 0, len = this.data.length; index < len; index++) {
            const otherPoint = this.data[index].data;
            const otherPointLabel = this.labels[index];
            const thisDistance = distance(point, otherPoint);
            /**
             * Keep at most k items in the map.
             * Much more efficient for large sets, because this
             * avoids storing and then sorting a million-item map.
             * This adds many more sort operations, but hopefully k is small.
             */
            // Only add an item if it's closer than the farthest of the candidates
            if (thisDistance < maxDistanceInMap) {
                map.push({
                    index,
                    distance: thisDistance,
                    label: otherPointLabel
                });
                // Sort the map so the closest is first
                map.sort((a, b) => a.distance - b.distance);
                // If the map became too long, drop the farthest item
                if (map.length > this.k) {
                    map.pop();
                }
                // Update this value for the next comparison
                maxDistanceInMap = map[map.length - 1].distance;
            }
        }
        return map;
    }

    /**
     * accept a test point, and at the very least return the determined label for the point
     * @param {number[]} point 
     * @returns {KNNResult}
     */
    predict(point: number[]): KNNResult {
        const map = this.generateDistanceMap(point);
        const votes = map.slice(0, this.k);
        // Reduces into an object like {label: voteCount}
        const voteCounts = votes.reduce((obj: any, vote: KNNDistanceMap) => Object.assign({}, obj, {
            [vote.label]: (obj[vote.label] || 0) + 1
        }), {});
        const sortedVotes = Object.keys(voteCounts).map(label => ({ label, count: voteCounts[label] })).sort((a, b) => b.count - a.count);
        return {
            label: sortedVotes[0].label,
            voteCounts,
            votes
        };
    }

}