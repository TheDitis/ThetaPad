import {createSlice} from "@reduxjs/toolkit";
import {ShapeKind} from "../../types/shapes";


export type DrawModeType = ShapeKind.Line | ShapeKind.Poly | ShapeKind.Circle;

const initialState: DrawModeType = ShapeKind.Line;

//export const setDrawMode = createAction('drawMode/setDrawMode');


const drawModeSlice = createSlice({
    name: "drawMode",
    initialState,
    reducers: {
        setDrawMode(state, action) {
            return action.payload;
        },
        resetDrawMode(state) {
            return ShapeKind.Line;
        }
    }
})

//const drawModeReducer = createReducer(initialState, (builder => {
//    builder
//        .addCase(setDrawMode, (state, action) => {
//            return action.payload;
//        })
//        .addDefaultCase((state, action) => initialState)
//}))
//
//export default drawModeReducer;


export const {setDrawMode, resetDrawMode} = drawModeSlice.actions;

export default drawModeSlice.reducer;