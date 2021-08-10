import {CaseReducer, createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {
    CancelTempShapeAction, CompleteTempShapeAction,
    CreateTempShapeAction,
    TempShapeUpdateAction,
    TempShapeUpdateActionKind,
    UpdateTempShapeAction
} from "../../Components/ThetaPad/types/actions";
import {Shape} from "../../Components/ThetaPad/types/shapes";

const tempShapeSlice = createSlice<
        null | Shape,
        SliceCaseReducers<Shape | null>,
        "tempShape"
    >(
        {
            name: 'tempShape',
            initialState: null,
            reducers: {},
            extraReducers: {
                [TempShapeUpdateActionKind.Create]: (
                    state,
                    action: CreateTempShapeAction
                ) => action.payload,

                [TempShapeUpdateActionKind.Update]: (
                    state,
                    action: UpdateTempShapeAction
                ) => Object.assign({}, state, action.payload),

                [TempShapeUpdateActionKind.Cancel]: (
                    state,
                    action: CancelTempShapeAction
                ) => null,

                [TempShapeUpdateActionKind.Complete]: (
                    state,
                    action: CompleteTempShapeAction
                ) => null,
            }
        }
)

export default tempShapeSlice.reducer;