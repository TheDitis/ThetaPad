/** drawModeSlice.ts
 * @file Redux slice for drawing mode (Shape types)
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice} from "@reduxjs/toolkit";
import {ShapeKind} from "../../types/shapes";


export type DrawModeType = ShapeKind.Line | ShapeKind.Poly | ShapeKind.Circle;

let initialState: DrawModeType = ShapeKind.Line;

/**
 * Slice containing the current drawing mode (which shape type the next click
 * will create
 */
const drawModeSlice = createSlice({
    name: "drawMode",
    initialState,
    reducers: {
        /** sets drawMode to a specific mode */
        setDrawMode(state, action) {
            return action.payload;
        },
        /** sets drawMode back to the default ('Line') */
        resetDrawMode(state) {
            return ShapeKind.Line;
        }
    }
})


export const {setDrawMode, resetDrawMode} = drawModeSlice.actions;

export default drawModeSlice.reducer;