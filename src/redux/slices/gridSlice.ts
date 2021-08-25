import {createSlice} from "@reduxjs/toolkit";
import {SIDEBAR_WIDTH} from "../../Components/constants";

// type GridParamName = 'color' | 'nColumns' | 'nRows' | 'width' | 'height' | 'strokeWidth' | 'opacity'

interface GridParamsType {
    color: string;
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
        color: 'black',
        nColumns: 8,
        nRows: 12,
        width: window.innerWidth - SIDEBAR_WIDTH,
        height: window.innerHeight,
        strokeWidth: 1,
        opacity: 0.8
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
        updateGridParams(state, action: UpdateGridParamsAction) {
            Object.entries(action.payload).forEach(([param, value]) => {
                state.params[param] = value;
            })
        }
    }
})


export default gridSlice.reducer;
export const { toggleGrid, showGrid, updateGridParams } = gridSlice.actions;