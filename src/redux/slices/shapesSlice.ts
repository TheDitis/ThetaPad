import {createSelector, createSlice} from "@reduxjs/toolkit";
import {ShapeMap, ShapeUtils} from "../../types/shapes";
import {shapesSelector} from "../selectors";

const initialState: ShapeMap = {};

const shapesSlice = createSlice({
    name: "shapes",
    initialState,
    reducers: {
        createShape(
            shapes,
            action
        ) {
            shapes[action.payload.id] = action.payload;
        },

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

        removePolyPoint(
            shapes,
            action: { payload: { target: string, index: number } }
        ) {
            const targetShape = shapes[action.payload.target];
            if (ShapeUtils.isPoly(targetShape)) {
                targetShape.points.splice(action.payload.index, 1);
            }
            else {
                console.error("removePolyPoint action dispatched on non-poly shape!");
            }
        },

        removeShape(
            shapes,
            action
        ) {
            delete shapes[action.payload];
        },
    }
})

export const {createShape, updateShape, removePolyPoint, removeShape} = shapesSlice.actions;
export default shapesSlice.reducer;

const shapeIdSelector = (state, shapeId) => shapeId;

const makeUniqueShapeSelector = () => createSelector(
    [shapesSelector, shapeIdSelector],
    (shapes, shapeId) => shapes[shapeId]
);

export const mapShapeToPropsWithSelector = () => {
    const uniqueShapeSelector = makeUniqueShapeSelector();

    return (state, ownProps) => {
        const shape = uniqueShapeSelector(state, ownProps.shapeId);
        return {shape}
    }
}