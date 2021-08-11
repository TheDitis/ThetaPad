import {configureStore} from "@reduxjs/toolkit";
import shapesReducer from "./slices/shapesSlice";
import tempShapeReducer from "./slices/tempShapeSlice";
import unitReducer from "./slices/unitSlice";
import dimensionsReducer from "./slices/dimensionsSlice";


const store = configureStore({
    reducer: {
        shapes: shapesReducer,
        tempShape: tempShapeReducer,
        unit: unitReducer,
        dimensions: dimensionsReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
