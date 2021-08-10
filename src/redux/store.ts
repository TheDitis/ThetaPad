import {ShapeType, ShapeKind, ShapeMap} from "../Components/ThetaPad/types/shapes";
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
    tempShape: (ShapeType | null);
    unit: number;
    drawMode: ShapeKind
}

const store = configureStore({
    reducer: {
        [ActionTarget.Shapes]: shapesReducer,
        [ActionTarget.TempShape]: tempShapeReducer,
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;



//const initialState: AppState = {
//    shapes: {},
//    tempShape: null,
//    unit: 1,
//    drawMode: ShapeKind.LineType,
//}
//
//const primaryReducer = (state = initialState, action: Action) => {
//    const newState = {...state};
//
//    if (action.targetsShapes()) {
//        newState.shapes = shapesReducer(state.shapes, action)
//    }
//    if (action.targetsTempShape()) {
//        if (action.isCreateKind()) {
//            // TODO: START HERE
//        }
//        if (action.isCompleteKind() && state.tempShape !== null) {
//            newState.shapes = shapesReducer(
//                newState.shapes,
//                new CreateShapeAction(state.tempShape)
//            )
//            newState.tempShape = null;
//        }
//    }
//    else if (action.targetsDrawMode()) {
//        if (!state.tempShape) {
//            newState.drawMode = action.value;
//        }
//    }
//    else if (action.targetsUnit()) {
//        newState.unit = action.value;
//    }
//    return newState
//}
//
//
//const shapesReducer = (
//    shapes: ShapeMap,
//    action: ShapesUpdateAction
//): ShapeMap => {
//    // Add a new shape
//    if (action.isCreateKind()) {
//        shapes[action.payload.id] = action.payload;
//    }
//    // End a poly draw if one is in session
//    else if (action.isEndKind()) {
//        const shape = shapes[action.targetShape];
//        if (shape && shape.isPoly()) {
//            if (shape.points.length < 2) {
//                delete shapes[action.targetShape];
//            }
//        }
//    }
//    // Remove a shape by id
//    else if (action.isRemoveKind()) {
//        delete shapes[action.targetShape];
//    }
//    else {
//        console.error("ACTION TYPE ", action.kind, " NOT HANDLED IN shapesReducer!")
//    }
//    return {...shapes}
//}
//
//
//const tempShapeReducer = (
//    tempShape: ShapeType | null,
//    action: TempShapeUpdateAction
//): ShapeType | null => {
//    if (action.isCreateKind() && tempShape === null) {
//        return action.payload;
//    }
//    if (action.isUpdateKind() && tempShape !== null) {
//        return Object.assign({}, tempShape, action.payload);
//    }
//    if (action.isCompleteKind() && tempShape !== null) {
//        return null;
//    }
//    if (action.isCancelKind()) {
//        return null;
//    }
//    console.error("action not handled in tempShapeReducer!");
//    console.log("action: ", action, "  tempShape: ", tempShape);
//    return tempShape;
//}





//export default createStore(primaryReducer)