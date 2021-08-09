import {Shape, ShapeKind, ShapeMap} from "./types/shapes";
import {createStore} from "@reduxjs/toolkit";
import {Action, ShapesUpdateAction} from "./types/actions";

export interface AppState {
    shapes: ShapeMap;
    tempShape: (Shape | null);
    unit: number;
    drawMode: ShapeKind
}


const initialState: AppState = {
    shapes: {},
    tempShape: null,
    unit: 1,
    drawMode: ShapeKind.Line,
}

const primaryReducer = (state = initialState, action: Action) => {
    const newState = {...state};

    if (action.targetsShapes()) {
        shapesReducer(state.shapes, action)
    }
    else if (action.targetsDrawMode()) {
        if (!state.tempShape) {
            newState.drawMode = action.value;
        }
    }
    else if (action.targetsUnit()) {
        newState.unit = action.value;
    }
    return newState
}


const shapesReducer = (
    shapes: ShapeMap,
    action: ShapesUpdateAction
): ShapeMap => {
    // Add a new shape
    if (action.isCreateKind()) {
        shapes[action.payload.id] = action.payload;
    }
    // End a poly draw if one is in session
    else if (action.isEndKind()) {
        const shape = shapes[action.targetShape];
        if (shape && shape.isPoly()) {
            if (shape.points.length < 2) {
                delete shapes[action.targetShape];
            }
        }
    }
    // Remove a shape by id
    else if (action.isRemoveKind()) {
        delete shapes[action.targetShape];
    }
    else {
        console.error("ACTION TYPE ", action.kind, " NOT HANDLED IN shapesReducer!")
    }
    return {...shapes}
}

export const store = createStore(primaryReducer)