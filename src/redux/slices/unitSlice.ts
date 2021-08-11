import {createSlice} from "@reduxjs/toolkit";

interface UnitState {
    unit: number,
    unitShape: string | null,
}

const initialState: UnitState = { unit: 1, unitShape: null }

const unitSlice = createSlice( {
    name: "unit",
    initialState,
    reducers: {
        setUnit(state, action) {
            state.unit = action.payload.value;
            state.unitShape = action.payload.id;
        },
        resetUnit(state) {
            state.unit = 1;
            state.unitShape = null;
        }
    }
})

export const { setUnit, resetUnit } = unitSlice.actions;
export default unitSlice.reducer;