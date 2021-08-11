import {createSelector, createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {ShapeMap} from "../../Components/ThetaPad/types/shapes";
import {shapesSelector} from "../selectors";

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

const shapeIdSelector = (state, shapeId) => shapeId;

const makeUniqueShapeSelector = () => createSelector(
    [shapesSelector, shapeIdSelector],
    (shapes, shapeId) => shapes[shapeId]
);

export const mapShapeToPropsWithSelector = (state) => {
    const uniqueShapeSelector = makeUniqueShapeSelector();

    return (state, ownProps) => {
        const shape = uniqueShapeSelector(state, ownProps.shapeId);
        return {shape}
    }
}