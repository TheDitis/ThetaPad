import {COLORS} from "../constants";
import _ from "lodash";
import {BasicLine} from "../types/shapes";
import {dot} from "mathjs";

export const randomItem = <T>(array: T[]): T => (
    array[Math.floor(Math.random() * array.length)]
)

export const randomColor = (): string => randomItem(COLORS);

export const chunkSiblings = <T>(arr: T[]): [T, T][] => arr.reduce(
    (acc: T[][], val: T, i, array: T[]) => {
        if (i < array.length - 1) {
            const pair: [T, T] = [val, array[i + 1]]
            acc.push(pair)
        }
        return acc;
    },
    []
) as [T, T][]

export const sum = (arr: number[]) => arr.reduce((acc, val) => acc + val)

/**
 * Formats length values for ideal display
 * @param {number} length - the numeric length value
 * @param {boolean} [asDecimal=false] - if true, decimal places will be shown
 * @param {number} [decimalPlaces=2] - the maximum number of decimal places to
 *      show if asDecimal is true
 * @return {string} - length in a nice, readable string format
 */
export const formatLengthText = (length: number, asDecimal: boolean = false, decimalPlaces: number = 2): string => {
    let lengthText = length.toFixed(asDecimal ? decimalPlaces : 0);
    // Remove unnecessary trailing decimal places
    if (lengthText.includes('.')) {
        lengthText = _.dropRightWhile(lengthText, (char) => ['.', '0'].includes(char)).join("")
    }
    return lengthText;
}

/**
 * Takes a value and 'compresses' it between lower and upper limits
 * @param {number} value - the value to get limited version of
 * @param {number} lowerLimit - lowest value that can be returned
 * @param {number} upperLimit - highest value that is returned
 * @return {number} - value if value is between upperLimit and lowerLimit,
 *      lowerLimit if value is less than lowerLimit, or upperLimit if value
 *      is greater than upperLimit
 */
export const limitValue = (value: number, lowerLimit: number, upperLimit: number): number => {
    if (upperLimit < lowerLimit) {
        console.warn("upperLimit passed to limitValue is less than lowerLimit. They were swapped automatically")
        let tempUpper = lowerLimit;
        lowerLimit = upperLimit
        upperLimit = tempUpper;
    }
    return Math.min(upperLimit, Math.max(lowerLimit, value))
}

/**
 * Get the angle between two lines in degrees
 * @param {BasicLine} line1 - the first line
 * @param {BasicLine} line2 - the second line
 * @return {number} - the angle in degrees
 */
export const angleBetweenLines = (line1: BasicLine, line2: BasicLine): number => {
    const vec1 = [line1[0] - line1[2], line1[1] - line1[3]];
    const vec2 = [line2[2] - line2[0], line2[3]- line2[1]];
    const magnitude1 = Math.sqrt(vec1[0] ** 2 + vec1[1] ** 2);
    const magnitude2 = Math.sqrt(vec2[0] ** 2 + vec2[1] ** 2);
    const dotProd = dot(vec1, vec2);
    const radians = Math.acos(dotProd / (magnitude1 * magnitude2));
    return radians * (180 / Math.PI);
}
