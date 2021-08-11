import {createSlice} from "@reduxjs/toolkit";
import {Shape} from "../../Components/ThetaPad/types/shapes";

const initialTempShape: Shape | null = null;

const tempShapeSlice = createSlice(     {
    name: 'tempShape',
    initialState: initialTempShape,
    reducers: {
        createTempShape: (
            state,
            action
        ) => action.payload,

        updateTempShape: (
            state,
            action
        ) => Object.assign({}, state, action.payload),

        clearTempShape: (state) => null
    }
})

export const {
    createTempShape,
    updateTempShape,
    clearTempShape
} = tempShapeSlice.actions;

export default tempShapeSlice.reducer;