/** imageReducer.ts
 * @file
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * @type Dimensions
 * @property {number} width - width value in px
 * @property {number} height - height value in px
 */
export interface Dimensions {
    width: number;
    height: number;
}

/**
 * @interface ImageStateType
 * @property {string} uri - uri for the image
 * @property {number} size - size in bytes of the image
 * @property {number} width - width of the original image (not display size)
 * @property {number} height - height of the original image (not display size)
 */
export interface ImageStateType {
    uri: string | null;
    size: number;
    width: number;
    height: number;
}

const initialState: ImageStateType = {
    uri: null,
    size: 0,
    width: 0,
    height: 0,
}


const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImage(state: ImageStateType, action: PayloadAction<ImageStateType>) {
            console.log(action.payload)
            return action.payload;
        },
        clearImage(state: ImageStateType) {
            return initialState;
        }
    }

})


export const {setImage, clearImage} = imageSlice.actions;
export default imageSlice.reducer;