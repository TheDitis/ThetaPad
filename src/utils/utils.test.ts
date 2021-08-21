import {chunkSiblings, randomItem, sum} from "./utils";
import _ from "lodash";

// TESTS FOR chunkSiblings:

test('should return [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]', () => {
    const arr = _.range(6);
    expect(chunkSiblings(arr))
        .toMatchObject([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]])
})

test('should be [[6, 2], [2, 4], [4, 0]]', () => {
    const arr = [6, 2, 4, 0];
    expect(chunkSiblings(arr))
        .toMatchObject([[6, 2], [2, 4], [4, 0]])
})



// TESTS FOR randomItem

test('arr should contain item', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    expect(arr).toContain(randomItem(arr))
})



// TESTS FOR sum

test('should be 21', () => {
    expect(sum([7, 7, 7])).toEqual(21);
})

test('should be -42', () => {
    expect(sum([3, 4, 1, -50])).toEqual(-42)
})