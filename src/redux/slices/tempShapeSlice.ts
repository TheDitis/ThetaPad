import {CaseReducer, createSlice, SliceCaseReducers, createAction} from "@reduxjs/toolkit";
import {
    CancelTempShapeAction, CompleteTempShapeAction,
    CreateTempShapeAction,
    TempShapeUpdateAction,
    TempShapeUpdateActionKind,
    UpdateTempShapeAction
} from "../../Components/ThetaPad/types/actions";
import {Shape} from "../../Components/ThetaPad/types/shapes";

export enum TempShapeActionKinds {
    Create = "Create",
    Update = "Update",
    Reset = "Reset"
}

const createTempShape = createAction<Shape>(TempShapeActionKinds.Create);
const updateTempShape = createAction<Partial<Shape>>(TempShapeActionKinds.Update);
const resetTempShape = createAction(TempShapeActionKinds.Reset);

const tempShapeSlice = createSlice<
        null | Shape,
        SliceCaseReducers<Shape | null>,
        "tempShape"
    >(
        {
            name: 'tempShape',
            initialState: null,
            reducers: {
                [TempShapeActionKinds.Create]: (
                    state,
                    action
                ) => action.payload,

                [TempShapeActionKinds.Update]: (
                    state,
                    action
                ) => Object.assign({}, state, action.payload),

                [TempShapeActionKinds.Reset]: (
                    state
                ) => null
            },
//            extraReducers: {
//                [TempShapeUpdateActionKind.Create]: (
//                    state,
//                    action: CreateTempShapeAction
//                ) => action.payload,
//
//                [TempShapeUpdateActionKind.Update]: (
//                    state,
//                    action: UpdateTempShapeAction
//                ) => Object.assign({}, state, action.payload),
//
//                [TempShapeUpdateActionKind.Cancel]: (
//                    state,
//                    action: CancelTempShapeAction
//                ) => null,
//
//                [TempShapeUpdateActionKind.Complete]: (
//                    state,
//                    action: CompleteTempShapeAction
//                ) => null,
//            }
        }
)

export default tempShapeSlice.reducer;