/** highlightSlice.ts
 * @file slice of redux store representing what to highlight on canvas
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum HighlightKind {
    RemovePoint = 'removePoint',
    Point = 'point',
    Length = 'length',
    None = 'none'
}


/**
 * @interface HighlightStateType
 * @property {string | null} shapeId - id of shape to highlight
 * @property {number | null} subItemIndex - index of item within shape (poly)
 * @property {HighlightKind} type - type of highlight
 */
export interface HighlightStateType {
    shapeId: string | null;
    subItemIndex: number | null;
    type: HighlightKind;
}

const initialState: HighlightStateType = {
    shapeId: null,
    subItemIndex: null,
    type: HighlightKind.None,
}

type PointHighlightAction = PayloadAction<{shapeId: string, subItemIndex: number}>

const highlightSlice = createSlice({
    name: 'highlight',
    initialState,
    reducers: {
        clearHighlight() {
            return initialState;
        },
        highlightPoint(state, action: PointHighlightAction) {
            return {...(action.payload), type: HighlightKind.Point}
        },
        highlightPointRemoval(state, action: PointHighlightAction) {
            return {...(action.payload), type: HighlightKind.RemovePoint}
        }
    }
})


export const {
    clearHighlight,
    highlightPoint,
    highlightPointRemoval
} = highlightSlice.actions;

export default highlightSlice.reducer;