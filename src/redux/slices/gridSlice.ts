import {createSlice} from "@reduxjs/toolkit";
import {NAVBAR_HEIGHT, SIDEBAR_WIDTH} from "../../Components/constants";

// type GridParamName = 'color' | 'nColumns' | 'nRows' | 'width' | 'height' | 'strokeWidth' | 'opacity'
export type GridOrientation = keyof GridActiveOrientationsType;
export interface GridActiveOrientationsType {
    vertical: boolean;
    horizontal: boolean;
    incline: boolean;
    decline: boolean;
}

export interface StructuralGridParamsType {
    orientations: GridActiveOrientationsType;
    nColumns: number;
    nRows: number;
    width: number;
    height: number;
}

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

interface GridStateType {
    active: boolean;
    params: GridParamsType;
}

const initialState: GridStateType = {
    active: true,
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
        updateGridParams(state, action: UpdateGridParamsAction) {
            Object.entries(action.payload).forEach(([param, value]) => {
                state.params[param] = value;
            })
        }
    }
})


export default gridSlice.reducer;
export const { toggleGrid, showGrid, hideGrid, updateGridParams } = gridSlice.actions;