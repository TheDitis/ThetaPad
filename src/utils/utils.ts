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

// TODO: Test
export const formatLengthText = (length: number, asDecimal: boolean = false, decimalPlaces: number = 2): string => {
    let lengthText = length.toFixed(asDecimal ? decimalPlaces : 0);
    // Remove unnecessary trailing decimal places
    if (lengthText.includes('.')) {
        lengthText = _.dropRightWhile(lengthText, (char) => ['.', '0'].includes(char)).join("")
    }
    return lengthText;
}