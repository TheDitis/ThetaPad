import {createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {ShapeMap} from "../../Components/ThetaPad/types/shapes";

const initialState: ShapeMap = {};

const shapesSlice = createSlice({
    name: "shapes",
    initialState,
    reducers: {
        createShape(
            shapes,
            action
        ) { shapes[action.payload.id] = action.payload },

        updateShape(
            shapes,
            action
        ) {
            shapes[action.payload.target] = Object.assign(
                {},
                shapes[action.payload.payload],
                action.payload,
            )
        },

        removeShape(
            shapes,
            action
        ) { delete shapes[action.payload] },
    }
})

export const {createShape, updateShape, removeShape} = shapesSlice.actions;
export default shapesSlice.reducer;