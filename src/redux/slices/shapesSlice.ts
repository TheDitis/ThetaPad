/** shapesSlice.ts
 * @file Redux slice containing map of drawn shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSelector, createSlice} from "@reduxjs/toolkit";
import {PartialShape, Shape, ShapeUtils, ValidShape} from "../../types/shapes";
import {shapesSelector} from "../selectors";

export type ShapeMap = { [id: string]: Shape }

const initialState: ShapeMap = {};

/** Slice containing an object full of completed shapes */
const shapesSlice = createSlice({
    name: "shapes",
    initialState,
    reducers: {
        /** Add a new Shape */
        createShape(
            shapes: ShapeMap,
            action: { payload: ValidShape }
        ) {
            shapes[action.payload.id] = action.payload;
        },
        /** Update an existing Shape */
        updateShape(
            shapes: ShapeMap,
            action: { payload: { target: string, newValues: PartialShape } }
        ) {
            shapes[action.payload.target] = Object.assign(
                {},
                shapes[action.payload.target],
                action.payload.newValues,
            )
        },
        /** Remove a point from a poly line by index */
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
        /** Remove a shape by id */
        removeShape(
            shapes,
            action
        ) {
            delete shapes[action.payload];
        },
        /** Reset shapes to an empty object */
        clearShapes: () => ({})
    }
})

export const {
    createShape,
    updateShape,
    removePolyPoint,
    removeShape,
    clearShapes,
} = shapesSlice.actions;
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