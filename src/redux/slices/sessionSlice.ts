/** sessionSlice.ts
 * @file slice of Redux store containing information about the session
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../store";
import {toPng} from "html-to-image";
import download from "downloadjs";

export interface SessionData {
    id: string | null,
    name: string | null,
    canvasId: string | null,
    imageUrl: string | null
}

const initialState: SessionData = {
    id: null,
    name: null,
    canvasId: null,
    imageUrl: null,
}


const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        nameSession(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setCanvasId(state, action: PayloadAction<string>) {
            state.canvasId = action.payload;
        },
    }
})



export const {
    nameSession,
    setCanvasId
} = sessionSlice.actions;

export default sessionSlice.reducer;


export const downloadImage = () => (
    (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        const session = state.session;
        if (session.canvasId !== null) {
            const canvas = document.getElementsByClassName(session.canvasId).item(0);

            if (canvas !== null) {
                toPng(canvas as HTMLDivElement)
                    .then((dataUrl) => {
                        const outputCanvas = document.createElement("canvas");
                        const ctx = outputCanvas.getContext('2d');

                        const dimensions = state.dimensions.image

                        if (ctx !== null && dimensions.width > 10 && dimensions.height > 10) {
                            outputCanvas.width = dimensions.width * 1.5; // unclear why the ratio is different, but it is
                            outputCanvas.height = dimensions.height * 1.5;
                            const image = new Image();
                            image.src = dataUrl;
                            image.onload = () => {
                                ctx.drawImage(image, 0, 0)
                                const url = outputCanvas.toDataURL('image/png');
                                download(url, "image.png")
                            }
                        }
                        else {
                            console.error("can't get output canvas context or dimensions are too small")
                        }
                    })
            }
            else {
                console.error("failed to get canvas element!")
            }
        }
        else {
            console.error("Attempted to download image with null canvasId!")
        }
    }
)