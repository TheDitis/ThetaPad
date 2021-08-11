import {Shape, ShapeKind, ShapeMap} from "../Components/ThetaPad/types/shapes";
import {configureStore} from "@reduxjs/toolkit";
import shapesReducer from "./slices/shapesSlice";
import tempShapeReducer from "./slices/tempShapeSlice";
import unitReducer from "./slices/unitSlice";

//export interface AppState {
//    shapes: ShapeMap;
//    tempShape: (Shape | null);
//    value: number;
//    drawMode: ShapeKind
//}

const store = configureStore({
    reducer: {
        shapes: shapesReducer,
        tempShape: tempShapeReducer,
        unit: unitReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
