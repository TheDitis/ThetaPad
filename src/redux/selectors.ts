/** selectors.ts
 * @file selectors for the redux store
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {Shape} from "../types/shapes";
import {UnitStateType} from "./slices/unitSlice";
import {AppDimensions} from "./slices/dimensionsSlice";
import {ShapeMap} from "./slices/shapesSlice";
import _ from "lodash";
import {FiltersStateType} from "./slices/filtersSlice";
import {GridStateType} from "./slices/gridSlice";
import {ImageStateType} from "./slices/imageSlice";
import {DrawModeType} from "./slices/drawModeSlice";
import {AlertStateType} from "./slices/alertSlice";
import {HighlightStateType} from "./slices/highlightSlice";

/// shapes selectors ///
type ShapesSelectorType = (RootState) => ShapeMap;

export const shapesSelector: ShapesSelectorType = (state: RootState) =>
    state.shapes;

export const shapesIdsSelector = createSelector(
    shapesSelector,
    (shapes) => Object.keys(shapes)
);

type TempShapeSelectorType = (RootState) => Shape | null;

export const tempShapeSelector: TempShapeSelectorType = (state: RootState) => (
    state.tempShape
)


/// unit selectors ///
type UnitSelectorType = (RootState) => UnitStateType;

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


/// drawMode selectors ///
type DrawModeSelectorType = (RootState) => DrawModeType;

export const drawModeSelector: DrawModeSelectorType = (state) => state.drawMode;

export const shapeCountSelector = createSelector(
    shapesSelector,
    (shapes) => Object.keys(shapes).length
)


/// drawMode selectors ///
type DimensionsSelectorType = (RootState) => AppDimensions;

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


/// image selectors ///
type ImageSelectorType = (RootState) => ImageStateType;

export const imageSelector: ImageSelectorType = (state) => state.image;

export const imageSrcSelector = createSelector(
    imageSelector,
    (imageData) => imageData.uri
)

export const imageOriginalDimensionsSelector = createSelector(
    imageSelector,
    (imageData) => ({width: imageData.width, height: imageData.height})
)


/// grid selectors ///
type GridSelectorType = (RootState) => GridStateType;

export const gridSelector: GridSelectorType = (state) => state.grid;

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



/// filters selectors ///
type FiltersSelectorType = (RootState) => FiltersStateType;

export const filtersSelector: FiltersSelectorType = (state) => state.filters;

export const filterIsActiveSelector = createSelector(
    filtersSelector,
    (filterState) => filterState.active
)

export const filterParamsSelector = createSelector(
    filtersSelector,
    (filterState) => filterState.params
)

export const filtersCssString = createSelector(
    filterIsActiveSelector,
    filterParamsSelector,
    (active, filters) => active ? (
        `contrast(${filters.contrast}) brightness(${filters.brightness}) saturate(${filters.saturation}) grayscale(${filters.grayscale}) sepia(${filters.sepia}) blur(${filters.blur}px) hue-rotate(${filters.hue}deg)`
    ) : "none"
)



/// alert selectors ///
type AlertSelectorType = (RootState) => AlertStateType;

export const alertSelector: AlertSelectorType = (state) => state.alert;



/// highlight selectors ///
type HighlightSelectorType = (RootState) => HighlightStateType;

export const highlightSelector: HighlightSelectorType = (state) => state.highlight;