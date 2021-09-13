/** store.ts
 * @file Redux store for the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {configureStore} from "@reduxjs/toolkit";
import shapesReducer from "./slices/shapesSlice";
import tempShapeReducer from "./slices/tempShapeSlice";
import unitReducer from "./slices/unitSlice";
import dimensionsReducer from "./slices/dimensionsSlice";
import drawModeReducer from "./slices/drawModeSlice";
import imageReducer from "./slices/imageSlice";
import gridReducer from "./slices/gridSlice";
import filtersReducer from "./slices/filtersSlice";
import alertReducer from "./slices/alertSlice";


const store = configureStore({
    reducer: {
        shapes: shapesReducer,
        tempShape: tempShapeReducer,
        drawMode: drawModeReducer,
        unit: unitReducer,
        dimensions: dimensionsReducer,
        image: imageReducer,
        grid: gridReducer,
        filters: filtersReducer,
        alert: alertReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
