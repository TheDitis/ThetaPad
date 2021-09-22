import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createShape, removeShape} from "./shapesSlice";
import {Shape, ValidShape} from "../../types/shapes";
import {AppDispatch, RootState} from "../store";
import {addPolyPoint, clearTempShape, createTempShape, popPolyPoint} from "./tempShapeSlice";


interface UndoRedoStateType {
    undoBuffer: (Action | PayloadAction<any>)[];
    redoBuffer: (Action | PayloadAction<any>)[]
}

const initialState: UndoRedoStateType = {
    undoBuffer: [],
    redoBuffer: [],
}


const undoRedoSlice = createSlice({
    name: "undoRedo",
    initialState,
    reducers: {
        addToFuture(state, action: PayloadAction<PayloadAction | Action>) {
            state.redoBuffer.push(action.payload);
        },
        popUndo(state) {
            state.undoBuffer.pop();
        },
        clearFuture(state) {
            state.redoBuffer = [];
        }
    },
    extraReducers: {
        [createShape.type]: (state, action: PayloadAction<ValidShape>) => {
            state.undoBuffer.push(action);
        },
        [createTempShape.type]: (state, action: PayloadAction<Shape>) => {
            state.undoBuffer.push(action);
        },
        [addPolyPoint.type]: (state, action) => {
            state.undoBuffer.push(action)
        }
    }
})


export default undoRedoSlice.reducer;

const {addToFuture, popUndo,} = undoRedoSlice.actions;


export const undo = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const undoBuffer = state.undoRedo.undoBuffer;
    if (state.undoRedo.undoBuffer.length > 0) {
        const lastAction = undoBuffer[undoBuffer.length - 1];
        console.log("lastAction: ", lastAction)
        dispatch(popUndo());
        const undoAction = inverseAction(lastAction);
        if (undoAction) {
            dispatch(undoAction);
        }
        dispatch(addToFuture(lastAction))
    }

}


const inverseAction = (action) => {
    if (action.type === createShape.type) {
        return removeShape(action.payload.id);
    }
    if (action.type === createTempShape.type) {
        return clearTempShape();
    }
    if (action.type === addPolyPoint.type) {
        return popPolyPoint();
    }
}