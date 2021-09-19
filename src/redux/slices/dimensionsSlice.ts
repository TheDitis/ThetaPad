/** dimensionsSlice.ts
 * @file Redux slice for app dimensions
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice} from "@reduxjs/toolkit";
import {NAVBAR_HEIGHT, SIDEBAR_WIDTH} from "../../constants";
import {Dimensions} from "./imageSlice";
import {AppDispatch, RootState} from "../store";
import _ from "lodash";
import {updateGridParams} from "./gridSlice";
import {rescaleShapes} from "./shapesSlice";
import {setUnit} from "./unitSlice";

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
 * @property {Dimensions} image - the display-dimensions of the user's image
 * @property {number} width - inner-width of the window
 * @property {number} height - inner-height of the window
 */
export interface AppDimensions extends WindowDimensions {
    navbar: number,
    sidebar: number,
    image: Dimensions,
}

const initialState: AppDimensions = {
    navbar: NAVBAR_HEIGHT,
    sidebar: SIDEBAR_WIDTH,
    image: {width: 0, height: 0},
    width: window.innerWidth,
    height: window.innerHeight,
}

/** slice containing the dimensions of the app */
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
            state.width = width
        },
        /** Manually sets the sidebar width */
        setSidebarWidth(state, action: { payload: number }) {
            state.sidebar = action.payload;
        },
        /** Manually sets the image dimensions */
        setImageDims(state, action: {payload: Dimensions}) {
            state.image = action.payload;
        },
        // /** Takes original image dimensions and calculates display dimensions */
        // calculateImageDims(state, action: { payload: Dimensions }) {
        //     const imgDims = action.payload;
        //     const canvasWidth = state.width - state.sidebar;
        //     const canvasHeight = state.height - state.navbar;
        //     const wRatio = canvasWidth / imgDims.width;
        //     const hRatio = canvasHeight / imgDims.height;
        //     const scaleRatio = Math.min(wRatio, hRatio)
        //     state.image = {
        //         width: imgDims.width * scaleRatio,
        //         height: imgDims.height * scaleRatio
        //     }
        // }
    }
})


export const {
    setDimensions,
    setWindowDimensions,
    setSidebarWidth,
    setImageDims,
} = dimensionsSlice.actions;

export default dimensionsSlice.reducer;

const calculateImageDims = (imgDims: Dimensions) => (
    (dispatch: AppDispatch, getState: () => RootState) => {
        const dims = getState().dimensions;
        const canvasWidth = dims.width - dims.sidebar;
        const canvasHeight = dims.height - dims.navbar;
        const wRatio = canvasWidth / imgDims.width;
        const hRatio = canvasHeight / imgDims.height;
        const imageScaleRatio = Math.min(wRatio, hRatio);
        const newImageDims = {
            width: imgDims.width * imageScaleRatio,
            height: imgDims.height * imageScaleRatio
        }
        const shapeScaleRatio = newImageDims.width / dims.image.width;
        dispatch(rescaleShapes(shapeScaleRatio));
        dispatch(setImageDims(newImageDims));
        const unit = getState().unit;
        if (unit.unitShape !== null) {
            dispatch(setUnit({
                value: unit.unit * shapeScaleRatio,
                id: unit.unitShape,
            }))
        }
    }
)


export const recalculateDimensions = (windowDims: Dimensions) => (
    (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setWindowDimensions(windowDims));
        const image = getState().image;
        if (image.uri !== null) {
            dispatch(calculateImageDims(_.pick(image, "width", "height")));
        }
        if (getState().grid.active) {
            let dims = getState().dimensions
            const gridSize = image.uri
                ? dims.image
                : {width: dims.width - dims.sidebar, height: dims.height - dims.navbar}
            dispatch(updateGridParams(gridSize))
        }
    })