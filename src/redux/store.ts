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


const store = configureStore({
    reducer: {
        shapes: shapesReducer,
        tempShape: tempShapeReducer,
        drawMode: drawModeReducer,
        unit: unitReducer,
        dimensions: dimensionsReducer,
        image: imageReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
