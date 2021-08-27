import {COLORS} from "../Components/constants";
import _ from "lodash";

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