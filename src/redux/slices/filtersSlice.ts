import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {limitValue} from "../../utils/utils";

type FilterLimits = [number, number];

type FilterLimitsMap = { [key in keyof FiltersType]: FilterLimits }


export interface FiltersType {
    contrast: number;
    brightness: number;
    saturation: number;
    grayscale: number;
    sepia: number;
    blur: number
    hue: number;
}

export const filterLimits: FilterLimitsMap = {
    contrast: [0.5, 3],
    brightness: [0.5, 1.5],
    saturation: [0, 2],
    grayscale: [0, 1],
    sepia: [0, 1],
    blur: [0, 20],
    hue: [-15, 15],
}

export interface FiltersStateType {
    active: boolean;
    params: FiltersType
}

export const filterDefaults = {
    contrast: 1,
    brightness: 1,
    saturation: 1,
    grayscale: 0,
    sepia: 0,
    blur: 0,
    hue: 0,
}


const initialState: FiltersStateType = {
    active: true,
    params: filterDefaults
}





const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        toggleFilter(state) {
            state.active = !(state.active)
        },
        updateFilterValues(state, action: PayloadAction<Partial<FiltersType>>) {
            Object.entries(action.payload).forEach(([param, value]) => {
                const limits: FilterLimits = filterLimits[param];
                state.params[param] = limitValue(value, ...limits);
            })
        },
        resetFilterValues(state, action: PayloadAction<(keyof FiltersType)[]>) {
            for (const param of action.payload) {
                state.params[param] = initialState.params[param];
            }
        },
        resetFilterValue(state, action: PayloadAction<keyof FiltersType>) {
            state.params[action.payload] = initialState[action.payload];
        },
        resetAllFilters() {
            return initialState
        }
    }
})


export default filtersSlice.reducer;
export const { toggleFilter, updateFilterValues, resetFilterValues, resetFilterValue, resetAllFilters } = filtersSlice.actions;