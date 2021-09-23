import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createShape, removeShape} from "./shapesSlice";
import {Shape, ShapeUtils, ValidShape} from "../../types/shapes";
import {AppDispatch, RootState} from "../store";
import {addPolyPoint, clearTempShape, createTempShape, popPolyPoint} from "./tempShapeSlice";

/**
 * @interface UndoRedoStateType
 * @property {(Action | PayloadAction<any>)[]} undoBuffer - array of past actions
 * @property {(Action | PayloadAction<any>)[]} redoBuffer - array of undone actions
 */
interface UndoRedoStateType {
    undoBuffer: (Action | PayloadAction<any>)[];
    redoBuffer: (Action | PayloadAction<any>)[];
    actionIsRedo: boolean;
}

const initialState: UndoRedoStateType = {
    undoBuffer: [],
    redoBuffer: [],
    actionIsRedo: false,
}

/** slice that holds past and future actions (undo and redo) */
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
        popRedo(state) {
            state.redoBuffer.pop();
        },
        clearFuture(state) {
            state.redoBuffer = [];
        },
        shieldRedoBuffer(state) {
            state.actionIsRedo = true;
        },
        removeRedoBufferShield(state) {
            state.actionIsRedo = false;
        }
    },
    extraReducers: {
        [createShape.type]: (state, action: PayloadAction<ValidShape>) => {
            // Remove the tempShape undo action now now that the shape is done
            if (
                state.undoBuffer.length
                && state.undoBuffer[state.undoBuffer.length - 1].type === createTempShape.type
            ) {
                state.undoBuffer.pop();
            }
            if (!state.actionIsRedo) state.redoBuffer = [];
            state.undoBuffer.push(action);
        },
        [createTempShape.type]: (state, action: PayloadAction<Shape>) => {
            if (!state.actionIsRedo) state.redoBuffer = [];
            state.undoBuffer.push(action);
        },
        [addPolyPoint.type]: (state, action) => {
            if (!state.actionIsRedo) state.redoBuffer = [];
            state.undoBuffer.push(action)
        }
    }
})


export default undoRedoSlice.reducer;

const {
    addToFuture,
    popUndo,
    popRedo,
    shieldRedoBuffer,
    removeRedoBufferShield
} = undoRedoSlice.actions;

/** Thunk function to undo the last action */
export const undo = () => (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    if (state.undoRedo.undoBuffer.length) {
        state = getState();
        const undoBuffer = state.undoRedo.undoBuffer

        // get the most recent action on the undoBuffer, removing it
        let lastAction = undoBuffer[undoBuffer.length - 1];
        dispatch(popUndo());

        // get the inverse of that action and dispatch it if there is one
        const undoAction = inverseAction(lastAction);
        if (undoAction) {
            dispatch(undoAction);
        }
        // move the original action to redoBuffer
        dispatch(addToFuture(lastAction))
        // removes any past actions that are no longer relevant
        filterUndoBuffer(dispatch, getState);
    }
}

/** Thunk function to redo the last undone action, if any */
export const redo = () => (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    const redoBuffer = state.undoRedo.redoBuffer;
    if (redoBuffer.length) {
        // get and remove the last undone action
        const lastUndone = redoBuffer[redoBuffer.length - 1];
        dispatch(popRedo());
        // if the last undone action is redoable (doesn't rely on other context):
        if (lastUndone.type !== addPolyPoint.type) {
            // dispatch the undone event, shielding the redoBuffer from reset
            dispatch(shieldRedoBuffer());
            dispatch(lastUndone);
            dispatch(removeRedoBufferShield());
        }
    }
};


/**
 * Gets rid of old items in undo buffer that are no longer relevant
 * @param {AppDispatch} dispatch - dispatch function for the app
 * @param {() => RootState} getState - getState function for the redux store
 */
const filterUndoBuffer = (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    // if there's no tempShape or it isn't a poly
    if (state.tempShape === null || !ShapeUtils.isPoly(state.tempShape!)) {
        let undoBuffer = state.undoRedo.undoBuffer;

        // while the last item in undoBuffer is no longer relevant, pop it
        for (let i = undoBuffer.length - 1; i >= 0; i--) {
            let lastAction = undoBuffer[i];
            if (lastAction.type === addPolyPoint.type || lastAction.type === createTempShape.type) {
                dispatch(popUndo());
            }
            else {
                break;
            }
        }
    }
};


/**
 * Returns the inverse of a given action if there is one
 * @param action - an action
 * @return {Action | PayloadAction | null} - inverse of 'action' or null if there
 *      isn't an inverse
 */
const inverseAction = (action): Action | PayloadAction | null => {
    if (action.type === createShape.type) {
        return removeShape(action.payload.id);
    }
    if (action.type === createTempShape.type) {
        return clearTempShape();
    }
    if (action.type === addPolyPoint.type) {
        return popPolyPoint();
    }
    return null;
}
