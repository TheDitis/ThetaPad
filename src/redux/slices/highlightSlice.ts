/** highlightSlice.ts
 * @file slice of redux store representing what to highlight on canvas
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// What action is the highlight for?
type HighlightType = 'remove' | 'show';

/**
 * @interface HighlightStateType
 * @property {string | null} shape - id of shape to highlight
 * @property {number | null} subItemIndex - index of item within shape (poly)
 * @property {HighlightType | null} type - type of highlight
 */
export interface HighlightStateType {
    shape: string | null;
    subItemIndex: number | null;
    type: HighlightType | null;
}

const initialState: HighlightStateType = {
    shape: null,
    subItemIndex: null,
    type: null,
}

type PointRemovalHighlightAction = PayloadAction<{shape: string, subItemIndex: number}>

const highlightSlice = createSlice({
    name: 'highlight',
    initialState,
    reducers: {
        clearHighlight() {
            return initialState;
        },
        highlightPointRemoval(state, action: PointRemovalHighlightAction) {
            return {
                ...(action.payload),
                type: "remove"
            }
        }
    }
})


const {
    clearHighlight,
    highlightPointRemoval
} = highlightSlice.actions;

export default highlightSlice.reducer;