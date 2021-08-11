import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {Shape, ShapeMap} from "../Components/ThetaPad/types/shapes";
import {UnitState} from "./slices/unitSlice";

type ShapesSelectorType = (RootState) => ShapeMap;
type TempShapeSelectorType = (RootState) => Shape | null;
type UnitSelectorType = (RootState) => UnitState;

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


export const shapeCountSelector = createSelector(
    shapesSelector,
    (shapes) => Object.keys(shapes).length
)