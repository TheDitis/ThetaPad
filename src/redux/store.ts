import {Shape, ShapeKind, ShapeMap} from "../Components/ThetaPad/types/shapes";
import {configureStore, createStore} from "@reduxjs/toolkit";
import {
    Action,
    ActionTarget,
    CreateShapeAction,
    ShapesUpdateAction,
    TempShapeUpdateAction
} from "../Components/ThetaPad/types/actions";
import shapesReducer from "./slices/shapesSlice";
import tempShapeReducer from "./slices/tempShapeSlice";
//import

export interface AppState {
    shapes: ShapeMap;
    tempShape: (Shape | null);
    unit: number;
    drawMode: ShapeKind
}

const store = configureStore({
    reducer: {
        shapes: shapesReducer,
        tempShape: tempShapeReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
