/** tempShapeSlice.ts
 * @file Redux slice for the temporary shape currently being drawn
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice} from "@reduxjs/toolkit";
import {Point, PointUtils, PolyUtils, Shape, ShapeUtils} from "../../types/shapes";
import {sum} from "../../utils/utils";

export type TempShapeType = (Shape | null);

const initialTempShape: TempShapeType = null;

/** Slice holding any shape currently being drawn if there is one */
const tempShapeSlice = createSlice({
    name: 'tempShape',
    initialState: initialTempShape,
    reducers: {
        /** Create a new tempShape (starting a new shape-draw) */
        createTempShape: (
            state,
            action
        ) => action.payload,
        /** Update the current tempShape with some new values */
        updateTempShape: (
            state,
            action
        ) => Object.assign({}, state, action.payload),
        /** Add a point to the current Poly tempShape */
        addPolyPoint(state: TempShapeType, action: { payload: Point }) {
            if (state !== null && ShapeUtils.isPoly(state)) {
                state.angles.push(0);
                state.points.push(action.payload);
                if (state.points.length >= 3) {
                    state.lengths.push(0);
                }
            }
            else if (state !== null) {
                console.error("addPolyPoint action dispatched with non-poly tempShape");
            }
        },
        /**
         * Updates the endpoint of the Poly shape, and calculates length and
         * angle of the last segment
         */
        continuePolyDraw(state: TempShapeType, action: { payload: Point }) {
            if (state !== null && ShapeUtils.isPoly(state)) {
                state.lengths[state.lengths.length - 1] = PointUtils.distance(
                    state.points[state.points.length - 2],
                    action.payload,
                );
                state.totalLength = sum(state.lengths)
                // state.angles[state.angles.length - 1] = PointUtils.angle(
                //     state.points[state.points.length - 2],
                //     action.payload,
                // )
                state.points[state.points.length - 1] = action.payload;
                if (state.points.length >= 3) {
                    state.angles[state.angles.length - 1] = PolyUtils.calcPointAngles(
                        state.points.slice(state.points.length - 3)
                    )[0]
                }
            }
            else if (state !== null) {
                console.error("continuePolyDraw action dispatched with non-poly tempShape");
            }
        },
        /** Reset tempShape to null (end a draw-session) */
        clearTempShape: () => null
    }
})

export const {
    createTempShape,
    updateTempShape,
    addPolyPoint,
    continuePolyDraw,
    clearTempShape
} = tempShapeSlice.actions;

export default tempShapeSlice.reducer;