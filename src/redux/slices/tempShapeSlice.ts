import {createSlice} from "@reduxjs/toolkit";
import {Point, PointUtils, Shape, ShapeUtils} from "../../types/shapes";
import {sum} from "../../utils";

export type TempShapeType = (Shape | null);

const initialTempShape: TempShapeType = null;

const tempShapeSlice = createSlice({
    name: 'tempShape',
    initialState: initialTempShape,
    reducers: {
        createTempShape: (
            state,
            action
        ) => action.payload,

        updateTempShape: (
            state,
            action
        ) => Object.assign({}, state, action.payload),

        addPolyPoint(state: TempShapeType, action: { payload: Point }) {
            if (state !== null && ShapeUtils.isPoly(state)) {
                state.angles.push(0);
                state.lengths.push(0);
                state.points.push(action.payload);
            }
            else if (state !== null) {
                console.error("addPolyPoint action dispatched with non-poly tempShape");
            }
        },

//        removePolyPoint(state: TempShapeType, action: { payload: number }) {
//            if (state !== null && ShapeUtils.isPoly(state)) {
//                state.points.splice(action.payload, 1);
//            } else if (state !== null) {
//                console.error("addPolyPoint action dispatched with non-poly tempShape");
//            }
//        },

        continuePolyDraw(state: TempShapeType, action: { payload: Point }) {
            if (state !== null && ShapeUtils.isPoly(state)) {
                state.lengths[state.lengths.length - 1] = PointUtils.distance(
                    state.points[state.points.length - 2],
                    action.payload,
                );
                state.totalLength = sum(state.lengths)
                state.angles[state.angles.length - 1] = PointUtils.angle(
                    state.points[state.points.length - 2],
                    action.payload,
                )
                state.points[state.points.length - 1] = action.payload;
            }
            else if (state !== null) {
                console.error("continuePolyDraw action dispatched with non-poly tempShape");
            }
        },

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