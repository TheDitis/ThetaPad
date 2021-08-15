import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {Shape} from "../types/shapes";
import {UnitState} from "./slices/unitSlice";
import {Dimensions} from "./slices/dimensionsSlice";
import {ShapeMap} from "./slices/shapesSlice";

type ShapesSelectorType = (RootState) => ShapeMap;
type TempShapeSelectorType = (RootState) => Shape | null;
type UnitSelectorType = (RootState) => UnitState;
type DimensionsSelectorType = (RootState) => Dimensions

export const shapesSelector: ShapesSelectorType = (state: RootState) =>
    state.shapes;

export const tempShapeSelector: TempShapeSelectorType = (state: RootState) =>
    state.tempShape;

export const unitSelector: UnitSelectorType = (state: RootState) => state.unit;

export const unitValSelector = createSelector(
    unitSelector,
    (unitState) => unitState.value
)
export const unitShapeIdSelector = createSelector(
    unitSelector,
    (unitState) => unitState.unitShape
)
export const unitShapeSelector = createSelector(
    shapesSelector,
    unitShapeIdSelector,
    (shapes, unitId) => {
        return (unitId !== null && unitId in shapes) ? shapes[unitId] : null;
    }
)


export const drawModeSelector = (state) => state.drawMode;


export const shapeCountSelector = createSelector(
    shapesSelector,
    (shapes) => Object.keys(shapes).length
)


export const dimensionsSelector: DimensionsSelectorType = (state: RootState) =>
    state.dimensions

export const appWidthSelector = createSelector(
    dimensionsSelector,
    (dimensions) => dimensions.width
)

export const appHeightSelector = createSelector(
    dimensionsSelector,
    (dimensions) => dimensions.height
)

export const sidebarWidthSelector = createSelector(
    dimensionsSelector,
    (dimensions) => dimensions.sidebar
)

