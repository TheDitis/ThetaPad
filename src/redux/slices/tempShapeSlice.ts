import {CaseReducer, createSlice, SliceCaseReducers, createAction} from "@reduxjs/toolkit";
//import {
//    CancelTempShapeAction, CompleteTempShapeAction,
//    CreateTempShapeAction,
//    TempShapeUpdateAction,
//    TempShapeUpdateActionKind,
//    UpdateTempShapeAction
//} from "../../Components/ThetaPad/types/actions";
import {ShapeType} from "../../Components/ThetaPad/types/shapes";

//export enum TempShapeActionKinds {
//    Create = "Create",
//    Update = "Update",
//    Reset = "Reset"
//}
//
//export const createTempShape = createAction<ShapeType>(TempShapeActionKinds.Create);
//export const updateTempShape = createAction<Partial<ShapeType>>(TempShapeActionKinds.Update);
//export const resetTempShape = createAction(TempShapeActionKinds.Reset);

const tempShapeSlice = createSlice<
        null | ShapeType,
        SliceCaseReducers<ShapeType | null>,
        "tempShape"
    >(
        {
            name: 'tempShape',
            initialState: null,
            reducers: {
                createTempShape: (
                    state,
                    action
                ) => action.payload,

                updateTempShape: (
                    state,
                    action
                ) => Object.assign({}, state, action.payload),

                clearTempShape: (
                    state
                ) => null
            },
//            extraReducers: {
//                [TempShapeUpdateActionKind.Create]: (
//                    state,
//                    action: CreateTempShapeAction
//                ) => {
//                    console.log("TEMPSHAPE CREATE ACTION!")
//                    return action.payload
//                },
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

export const {createTempShape, updateTempShape, clearTempShape} = tempShapeSlice.actions;
export default tempShapeSlice.reducer;