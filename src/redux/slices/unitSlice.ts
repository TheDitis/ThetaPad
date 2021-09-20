/** unitSlice.ts
 * @file Redux slice for the length measurement unit
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../store";
import {PolyUtils, ShapeUtils} from "../../types/shapes";

/**
 * @interface UnitStateType
 * @property {number} unit - value all lengths will be measured relative to. 1
 *      means measurements will be made in pixels
 * @property {string | null} unitShape - id of the shape that the current value
 *      linked to, or null if there isn't one
 * @property {number | null} subItem - if the unit is tied to a sub-item within
 *      a shape (ie poly-segment length), this identifies which sub-item
 */
export interface UnitStateType {
    unit: number,
    unitShape: string | null,
    subItem: number | null,
}

const initialState: UnitStateType = {unit: 1, unitShape: null, subItem: null};

interface SetUnitAction {
    value: number,
    id: string | null,
    subItem?: number | null
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
            state.subItem = action.payload?.subItem ?? null;
        },
        /** Reset unit to 1 */
        resetUnit() {
            return initialState;
        }
    }
})

export const {setUnit, resetUnit} = unitSlice.actions;

export default unitSlice.reducer;

/**
 * Redux thunk function called in calculateImageDims to sync up the unit with
 * its defining shape/item, since that absolute lengths change on resize
 */
export const syncUnit = () => (
    (dispatch: AppDispatch, getState: () => RootState) => {
        const unit = getState().unit;
        if (unit.unitShape !== null) {
            const unitShape = getState().shapes[unit.unitShape];

            if (ShapeUtils.isPoly(unitShape)) {
                let value: number;
                // if no subItem is specified, unit should be totalLength
                if (unit.subItem === null) {
                    value = unitShape.totalLength;
                }
                // otherwise, unit should be the length of the segment at that index
                else {
                    value = PolyUtils.getSegment(unitShape, unit.subItem).length;
                }
                dispatch(setUnit({
                    value,
                    id: unitShape.id,
                    subItem: unit.subItem
                }))
            }

            else if (ShapeUtils.isLine(unitShape)) {
                dispatch(setUnit({
                    value: unitShape.length,
                    id: unitShape.id,
                    subItem: null,
                }))
            }

            else if (ShapeUtils.isCircle(unitShape)) {
                dispatch(setUnit({
                    value: unitShape.r,
                    id: unitShape.id,
                    subItem: null,
                }))
            }
        }
    }
)