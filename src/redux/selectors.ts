/** selectors.ts
 * @file selectors for the redux store
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {Shape} from "../types/shapes";
import {UnitState} from "./slices/unitSlice";
import {AppDimensions} from "./slices/dimensionsSlice";
import {ShapeMap} from "./slices/shapesSlice";
import _ from "lodash";

type ShapesSelectorType = (RootState) => ShapeMap;
type TempShapeSelectorType = (RootState) => Shape | null;
type UnitSelectorType = (RootState) => UnitState;
type DimensionsSelectorType = (RootState) => AppDimensions

export const shapesSelector: ShapesSelectorType = (state: RootState) =>
    state.shapes;

export const shapesIdsSelector = createSelector(
    shapesSelector,
    (shapes) => Object.keys(shapes)
);

export const tempShapeSelector: TempShapeSelectorType = (state: RootState) =>
    state.tempShape;

export const unitSelector: UnitSelectorType = (state: RootState) => state.unit;

export const unitValSelector = createSelector(
    unitSelector,
    (unitState) => unitState.unit
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

export const imageLayerDimensionsSelector = createSelector(
    dimensionsSelector,
    (dimensions) => dimensions.image
)



export const imageSelector = (state) => state.image;

export const imageSrcSelector = createSelector(
    imageSelector,
    (imageData) => imageData.uri
)

export const imageOriginalDimensionsSelector = createSelector(
    imageSelector,
    (imageData) => ({width: imageData.width, height: imageData.height})
)


export const gridSelector = (state) => state.grid;

export const gridIsActiveSelector = createSelector(
    gridSelector,
    (gridState) => gridState.active
)

export const gridParamsSelector = createSelector(
    gridSelector,
    (gridState) => gridState.params
)

export const gridStructuralParamsSelector = createSelector(
    gridParamsSelector,
    (gridParams) => _.pick(gridParams, 'orientations', 'nColumns', 'nRows', 'width', 'height')
)

export const gridStyleParamsSelector = createSelector(
    gridParamsSelector,
    (gridParams) => _.pick(gridParams, 'color', 'strokeWidth', 'opacity')
)