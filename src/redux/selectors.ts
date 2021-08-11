import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ShapeMap} from "../Components/ThetaPad/types/shapes";

//type ShapesSelectorType =

export const shapesSelector = (state: RootState) => state.shapes;
export const tempShapeSelector = (state: RootState) => state.tempShape;
export const shapeSelector = (shapeId: string) => createSelector(
    shapesSelector,
    (shapes) => shapes[shapeId]
)

