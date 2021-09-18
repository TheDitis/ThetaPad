/** highlightSlice.ts
 * @file slice of redux store representing what to highlight on canvas
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum HighlightKind {
    RemovePoint = 'removePoint',
    Point = 'point',
    Length = 'length',
    All = 'all',
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

type PolyItemHighlightAction = PayloadAction<{shapeId: string, subItemIndex: number}>

const highlightSlice = createSlice({
    name: 'highlight',
    initialState,
    reducers: {
        clearHighlight() {
            return initialState;
        },
        highlightPoint(state, action: PolyItemHighlightAction) {
            return {...(action.payload), type: HighlightKind.Point}
        },
        highlightPolyPointRemoval(state, action: PolyItemHighlightAction) {
            return {...(action.payload), type: HighlightKind.RemovePoint}
        },
        highlightPolySegmentLength(state, action: PolyItemHighlightAction) {
            return {...(action.payload), type: HighlightKind.Length}
        }
    }
})


export const {
    clearHighlight,
    highlightPoint,
    highlightPolyPointRemoval,
    highlightPolySegmentLength
} = highlightSlice.actions;

export default highlightSlice.reducer;