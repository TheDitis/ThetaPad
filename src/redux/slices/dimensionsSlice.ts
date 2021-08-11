import {createSlice} from "@reduxjs/toolkit";
import {MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, NAVBAR_HEIGHT} from "../../Components/constants";

export interface Dimensions {
    navbar: number,
    sidebar: number,
    width: number,
    height: number,
}

const initialState: Dimensions = {
    navbar: NAVBAR_HEIGHT,
    sidebar: MIN_SIDEBAR_WIDTH,
    width: window.innerWidth,
    height: window.innerHeight,
}

interface WindowDimensions {
    width: number,
    height: number,
}

const dimensionsSlice = createSlice({
    name: "dimensions",
    initialState,
    reducers: {
        setDimensions(state, action: { payload: Dimensions }) {
            return action.payload
        },
        setWindowDimensions(state, action: { payload: WindowDimensions }) {
            const {width, height} = action.payload;
            state.width = width;
            state.height = height;

            let sidebarWidth = width / 3;
            sidebarWidth = Math.min(MAX_SIDEBAR_WIDTH, sidebarWidth);
            sidebarWidth = Math.max(MIN_SIDEBAR_WIDTH, sidebarWidth);

            state.sidebar = sidebarWidth;
        },
        setSidebarWidth(state, action: { payload: number }) {
            state.sidebar = action.payload;
        }
    }
})

export const {setDimensions, setWindowDimensions, setSidebarWidth} = dimensionsSlice.actions;
export default dimensionsSlice.reducer;