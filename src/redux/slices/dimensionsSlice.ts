/** dimensionsSlice.ts
 * @file Redux slice for app dimensions
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice} from "@reduxjs/toolkit";
import {MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, NAVBAR_HEIGHT} from "../../Components/constants";

/**
 * @interface WindowDimensions
 * @property {number} width - inner-width of the window
 * @property {number} height - inner-height of the window
 */
interface WindowDimensions {
    width: number,
    height: number,
}

/**
 * @interface AppDimensions
 * @extends WindowDimensions
 * @property {number} navbar - height of the navbar in px
 * @property {number} sidebar - width of the sidebar in px
 * @property {number} width - inner-width of the window
 * @property {number} height - inner-height of the window
 */
export interface AppDimensions extends WindowDimensions {
    navbar: number,
    sidebar: number,
}

const initialState: AppDimensions = {
    navbar: NAVBAR_HEIGHT,
    sidebar: MIN_SIDEBAR_WIDTH,
    width: window.innerWidth,
    height: window.innerHeight,
}

/** slice containing the AppDimensions of the app */
const dimensionsSlice = createSlice({
    name: "dimensions",
    initialState,
    reducers: {
        /** Sets entire dimensions object with that given */
        setDimensions(state, action: { payload: AppDimensions }) {
            return action.payload
        },
        /**
         * Sets the window dimensions, as well as the new calculated sidebar
         * width based on the new width
         */
        setWindowDimensions(state, action: { payload: WindowDimensions }) {
            const {width, height} = action.payload;
            state.height = height

            if (width !== state.width) {
                state.width = width;

                let sidebarWidth = width / 3;
                sidebarWidth = Math.min(MAX_SIDEBAR_WIDTH, sidebarWidth);
                sidebarWidth = Math.max(MIN_SIDEBAR_WIDTH, sidebarWidth);

                state.sidebar = sidebarWidth;
            }
        },
        /** Manually sets the sidebar width */
        setSidebarWidth(state, action: { payload: number }) {
            state.sidebar = action.payload;
        }
    }
})

export const {setDimensions, setWindowDimensions, setSidebarWidth} = dimensionsSlice.actions;
export default dimensionsSlice.reducer;