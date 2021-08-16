import {COLORS} from "./Components/constants";

export const randomItem = <T>(array: T[]): T => (
    array[Math.floor(Math.random() * array.length)]
)

export const randomColor = (): string => randomItem(COLORS);


export const sum = (arr: number[]) => arr.reduce((acc, val) => acc + val)