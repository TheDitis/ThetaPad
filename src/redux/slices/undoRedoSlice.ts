import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createShape, removeShape} from "./shapesSlice";
import {Shape, ShapeUtils, ValidShape} from "../../types/shapes";
import {AppDispatch, RootState} from "../store";
import {addPolyPoint, clearTempShape, createTempShape, popPolyPoint} from "./tempShapeSlice";

/**
 * @interface UndoRedoStateType
 * @property {(Action | PayloadAction<any>)[]} past - array of past actions
 * @property {(Action | PayloadAction<any>)[]} future - array of undone actions
 */
interface UndoRedoStateType {
    past: (Action | PayloadAction<any>)[];
    future: (Action | PayloadAction<any>)[];
    actionIsRedo: boolean;
}

const initialState: UndoRedoStateType = {
    past: [],
    future: [],
    actionIsRedo: false,
}

/** slice that holds past and future actions (undo and redo) */
const undoRedoSlice = createSlice({
    name: "undoRedo",
    initialState,
    reducers: {
        addToFuture(state, action: PayloadAction<PayloadAction | Action>) {
            state.future.push(action.payload);
        },
        popUndo(state) {
            state.past.pop();
        },
        popRedo(state) {
            state.future.pop();
        },
        clearFuture(state) {
            state.future = [];
        },
        shieldFuture(state) {
            state.actionIsRedo = true;
        },
        removeFutureShield(state) {
            state.actionIsRedo = false;
        },
        clearUndoRedo() {
            return initialState;
        }
    },
    extraReducers: {
        [createShape.type]: (state, action: PayloadAction<ValidShape>) => {
            // Remove the tempShape undo action now now that the shape is done
            if (
                state.past.length
                && state.past[state.past.length - 1].type === createTempShape.type
            ) {
                state.past.pop();
            }
            if (!state.actionIsRedo) state.future = [];
            state.past.push(action);
        },
        [createTempShape.type]: (state, action: PayloadAction<Shape>) => {
            if (!state.actionIsRedo) state.future = [];
            state.past.push(action);
        },
        [addPolyPoint.type]: (state, action) => {
            if (!state.actionIsRedo) state.future = [];
            state.past.push(action)
        }
    }
})


export default undoRedoSlice.reducer;

export const {clearUndoRedo} = undoRedoSlice.actions;

const {
    addToFuture,
    popUndo,
    popRedo,
    shieldFuture,
    removeFutureShield
} = undoRedoSlice.actions;

/** Thunk function to undo the last action */
export const undo = () => (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    if (state.undoRedo.past.length) {
        state = getState();
        const past = state.undoRedo.past

        // get the most recent action on the past, removing it
        let lastAction = past[past.length - 1];
        dispatch(popUndo());

        // get the inverse of that action and dispatch it if there is one
        const undoAction = inverseAction(lastAction);
        if (undoAction) {
            dispatch(undoAction);
        }

        // if the last undone action is redoable (doesn't rely on other context):
        if (lastAction.type !== addPolyPoint.type && lastAction.type !== createTempShape.type) {
            // move the original action to future
            dispatch(addToFuture(lastAction))
        }

        // removes any past actions that are no longer relevant
        filterPast(dispatch, getState);
    }
}

/** Thunk function to redo the last undone action, if any */
export const redo = () => (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    const future = state.undoRedo.future;
    if (future.length) {
        // get and remove the last undone action
        const lastUndone = future[future.length - 1];
        dispatch(popRedo());

        // dispatch the undone event, shielding the future from reset
        dispatch(shieldFuture());
        dispatch(lastUndone);
        dispatch(removeFutureShield());

    }
};


/**
 * Gets rid of old items in undo buffer that are no longer relevant
 * @param {AppDispatch} dispatch - dispatch function for the app
 * @param {() => RootState} getState - getState function for the redux store
 */
const filterPast = (dispatch: AppDispatch, getState: () => RootState) => {
    let state = getState();
    // if there's no tempShape or it isn't a poly
    if (state.tempShape === null || !ShapeUtils.isPoly(state.tempShape!)) {
        let past = state.undoRedo.past;

        // while the last item in past is no longer relevant, pop it
        for (let i = past.length - 1; i >= 0; i--) {
            let lastAction = past[i];
            if (
                lastAction.type === addPolyPoint.type
                || lastAction.type === createTempShape.type
            ) {
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
