import {COLORS} from "../Components/constants";

export const randomItem = <T>(array: T[]): T => (
    array[Math.floor(Math.random() * array.length)]
)

export const randomColor = (): string => randomItem(COLORS);

export const chunkSiblings = <T>(arr: T[]): T[][] => arr.reduce(
    (acc: T[][], val, i, array) => {
        if (i < array.length - 1) {
            acc.push([val, array[i + 1]])
        }
        return acc;
    },
    []
)

export const sum = (arr: number[]) => arr.reduce((acc, val) => acc + val)