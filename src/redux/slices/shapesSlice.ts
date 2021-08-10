import {createSlice, SliceCaseReducers} from "@reduxjs/toolkit";
import {ShapeMap} from "../../Components/ThetaPad/types/shapes";
import {
    CreateShapeAction,
    RemoveShapeAction,
    ShapesUpdateActionKind,
    UpdateShapeAction
} from "../../Components/ThetaPad/types/actions";


const shapesSlice = createSlice<
        ShapeMap,
        SliceCaseReducers<ShapeMap>,
        "shapes"
    >(
    {
        name: "shapes",
        initialState: {},
        reducers: {},
        extraReducers: {
            [ShapesUpdateActionKind.Create]: (
                shapes,
                action: CreateShapeAction
            ) => { shapes[action.payload.id] = action.payload },

            [ShapesUpdateActionKind.Update]: (
                shapes,
                action: UpdateShapeAction
            ) => { shapes[action.targetShape].update(action.payload) },

            [ShapesUpdateActionKind.Remove]: (
                shapes,
                action: RemoveShapeAction
            ) => { delete shapes[action.targetShape] },
        }
    }
)


export default shapesSlice.reducer;