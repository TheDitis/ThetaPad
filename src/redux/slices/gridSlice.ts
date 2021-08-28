import {createSlice} from "@reduxjs/toolkit";
import {NAVBAR_HEIGHT, SIDEBAR_WIDTH} from "../../Components/constants";

/**
 * @interface GridActiveOrientationsType
 * Each orientation of grid lines pointing to a boolean representing whether
 * or not those lines should be rendered
 */
export interface GridActiveOrientationsType {
    vertical: boolean;
    horizontal: boolean;
    incline: boolean;
    decline: boolean;
}

export type GridOrientation = keyof GridActiveOrientationsType;

/**
 * @interface StructuralGridParamsType
 * @property {GridActiveOrientationsType} orientations - map of which grid-line
 *      orientations to render
 * @property {number} nColumns - number of columns in the grid
 * @property {number} nRows - number of rows in the grid
 * @property {number} width - width the grid should span
 * @property {number} height - height the grid should span
 */
export interface StructuralGridParamsType {
    orientations: GridActiveOrientationsType;
    nColumns: number;
    nRows: number;
    width: number;
    height: number;
}

/**
 * @interface GridParamsType
 * @property {string} color - color of the grid lines
 * @property {GridActiveOrientationsType} orientations - map of which grid-line
 *      orientations to render
 * @property {number} nColumns - number of columns in the grid
 * @property {number} nRows - number of rows in the grid
 * @property {number} width - width the grid should span
 * @property {number} height - height the grid should span
 * @property {number} strokeWidth - width of the rendered grid-lines
 * @property {number} opacity - opacity of the grid lines
 */
export interface GridParamsType {
    color: string;
    orientations: GridActiveOrientationsType;
    nColumns: number;
    nRows: number;
    width: number;
    height: number;
    strokeWidth: number;
    opacity: number;
}

/**
 * @interface GridStateType
 * @property {boolean} active - whether or not the grid is turned on
 * @property {GridParamsType} params - object of structural and style parameters
 *      defining the grid
 */
interface GridStateType {
    active: boolean;
    params: GridParamsType;
}

const initialState: GridStateType = {
    active: false,
    params: {
        color: '#000000',
        orientations: {
            vertical: true,
            horizontal: true,
            incline: true,
            decline: true,
        },
        nColumns: 8,
        nRows: 12,
        width: window.innerWidth - SIDEBAR_WIDTH,
        height: window.innerHeight - NAVBAR_HEIGHT,
        strokeWidth: 1,
        opacity: 1
    }
}

// type GridParam = keyof GridParamsType;
type UpdateGridParamsAction = { payload: Partial<GridParamsType> }


const gridSlice = createSlice({
    name: "grid",
    initialState,
    reducers: {
        toggleGrid(state) {
            state.active = !state.active;
        },
        showGrid(state) {
            state.active = true;
        },
        hideGrid(state) {
            state.active = false;
        },
        /** set only a few specific grid parameters */
        updateGridParams(state, action: UpdateGridParamsAction) {
            Object.entries(action.payload).forEach(([param, value]) => {
                state.params[param] = value;
            })
        }
    }
})


export default gridSlice.reducer;
export const { toggleGrid, showGrid, hideGrid, updateGridParams } = gridSlice.actions;