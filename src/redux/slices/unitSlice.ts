/** unitSlice.ts
 * @file Redux slice for the length measurement unit
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice} from "@reduxjs/toolkit";

/**
 * @interface UnitState
 * @property {number} unit - value all lengths will be measured relative to. 1
 *      means measurements will be made in pixels
 * @property {string | null} unitShape - id of the shape that the current value
 *      linked to, or null if there isn't one
 */
export interface UnitState {
    unit: number,
    unitShape: string | null,
}

const initialState: UnitState = {unit: 1, unitShape: null}

interface SetUnitAction {
    value: number,
    id: string | null,
}

/** slice containing the length measurement unit info */
const unitSlice = createSlice({
    name: "unit",
    initialState,
    reducers: {
        /** Set unit to the value tied to a particular shape */
        setUnit(state, action: { payload: SetUnitAction }) {
            state.unit = action.payload.value;
            state.unitShape = action.payload.id;
        },
        /** Reset unit to 1 */
        resetUnit(state) {
            state.unit = 1;
            state.unitShape = null;
        }
    }
})

export const {setUnit, resetUnit} = unitSlice.actions;

export default unitSlice.reducer;

// export const syncUnit = () => (
//     (dispatch: AppDispatch, getState: () => RootState) => {
//         const unit = getState().unit;
//         if (unit.unitShape !== null) {
//             const unitShape = getState().shapes[unit.unitShape];
//             if (ShapeUtils.isPoly(unitShape)) {
//
//             }
//         }
//     }
// )