import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface FiltersType {
    contrast: number;
    brightness: number;
    saturation: number;
    grayscale: number;
    sepia: number;
    blur: number
    hue: number;
}

export interface FiltersStateType {
    active: boolean;
    params: FiltersType
}


const initialState: FiltersStateType = {
    active: true,
    params: {
        contrast: 1,
        brightness: 1,
        saturation: 1,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        hue: 0,
    }
}



const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        toggleFilter(state) {
            state.active = !(state.active)
        },
        updateFilterValues(state, action: PayloadAction<Partial<FiltersStateType>>) {
            Object.entries(action.payload).forEach(([param, value]) => {
                state[param] = value;
            })
        },
        resetFilterValues(state, action: PayloadAction<(keyof FiltersStateType)[]>) {
            for (const param of action.payload) {
                state.params[param] = initialState[param];
            }
        },
        resetFilterValue(state, action: PayloadAction<keyof FiltersStateType>) {
            state.params[action.payload] = initialState[action.payload];
        },
        resetAllFilters() {
            return initialState
        }
    }
})


export default filtersSlice.reducer;
export const { updateFilterValues, resetFilterValues, resetFilterValue, resetAllFilters } = filtersSlice.actions;