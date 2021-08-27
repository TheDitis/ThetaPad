import {chunkSiblings, formatLengthText, limitValue, randomItem, sum} from "./utils";
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



// TESTS FOR formatLengthText
test('should be 2.67', () => {
    const length = 2.66789;
    expect(formatLengthText(length, true, 2)).toBe("2.67");
})

test("should be 320", () => {
    const length = 320.12918624;
    expect(formatLengthText(length, false, 7)).toBe("320");
})

test("should be 19.5", () => {
    const length = 19.500023;
    expect(formatLengthText(length, true, 3)).toBe("19.5")
})



// TESTS FOR limitValue
test('should be 50', () => {
    expect(limitValue(50, 0, 100)).toBe(50);
})

test('should be 0', () => {
    expect(limitValue(-3, 0, 100)).toBe(0);
})

test('should be 100', () => {
    expect(limitValue(1309, 0, 100)).toBe(100);
})

test('dunno!', () => {
    expect(limitValue(130, 100, 0)).toBe(100);
})
