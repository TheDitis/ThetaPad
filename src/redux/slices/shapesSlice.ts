import {createAction, createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {ShapeMap, ShapeType} from "../../Components/ThetaPad/types/shapes";
import {
    CreateShapeAction,
    RemoveShapeAction,
    ShapesUpdateActionKind,
    UpdateShapeAction
} from "../../Components/ThetaPad/types/actions";

//export enum ShapesActionKind {
//    Create = "Create",
//    Update = "Update",
//    Remove = "Remove",
//}

//export const createShape = createAction<ShapeType>(ShapesActionKind.Create);
//export const updateShape = createAction<
//    { target: string, payload: Partial<ShapeType> }
//    >(ShapesActionKind.Update);
//export const removeShape = createAction<string>(ShapesActionKind.Remove);


const shapesSlice = createSlice<
        ShapeMap,
        SliceCaseReducers<ShapeMap>,
        "shapes"
    >(
    {
        name: "shapes",
        initialState: {},
        reducers: {
            createShape(
                shapes,
                action
            ) { shapes[action.payload.id] = action.payload },

            updateShape(
                shapes,
                action
            ) {
                shapes[action.payload.target] = Object.assign(
                    {},
                    shapes[action.payload.payload],
                    action.payload,
                )
            },

            removeShape(
                shapes,
                action
            ) { delete shapes[action.payload] },
        },
//        extraReducers: {
//            [ShapesUpdateActionKind.Create]: (
//                shapes,
//                action: CreateShapeAction
//            ) => { shapes[action.payload.id] = action.payload },
//
//            [ShapesUpdateActionKind.Update]: (
//                shapes,
//                action: UpdateShapeAction
//            ) => {
//                shapes[action.targetShape] = Object.assign(
//                    {},
//                    shapes[action.targetShape],
//                    action.payload,
//                )
//            } ,
//            //{ shapes[action.targetShape].update(action.payload) },
//
//            [ShapesUpdateActionKind.Remove]: (
//                shapes,
//                action: RemoveShapeAction
//            ) => { delete shapes[action.targetShape] },
//        }
    }
)

export const {createShape, updateShape, removeShape} = shapesSlice.actions;
export default shapesSlice.reducer;