/** keyboardEventHandler.ts
 * @file contains key-event handler function and its helper functions
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {ShapeKind, ShapeUtils} from "../../types/shapes";
import {shapeIsValid} from "./Canvas/canvasEventHandlers";
import {createShape} from "../../redux/slices/shapesSlice";
import {clearTempShape, TempShapeType} from "../../redux/slices/tempShapeSlice";
import {DrawModeType, setDrawMode} from "../../redux/slices/drawModeSlice";
import store, {AppDispatch} from "../../redux/store";

/**
 * Create a new KeyboardEventHandler bound with dispatch and tempShape
 * @param {AppDispatch} dispatch - dispatch function
 * @param {TempShapeType} tempShape - the current tempShape
 * @return {(e: KeyboardEvent) => void} - new key event handler
 */
const keyboardEventHandler = (
    dispatch: AppDispatch,
    tempShape: TempShapeType
) => (
    (e: KeyboardEvent) => {
        console.log("key pressed: ", e.key.toLowerCase());
        switch (e.key.toLowerCase()) {
            case "escape":
                cancelDraw(dispatch, tempShape);
                break;
            case "p":
                switchDrawMode(dispatch, ShapeKind.Poly);
                break;
            case "l":
                switchDrawMode(dispatch, ShapeKind.Line);
                break;
            case "c":
                switchDrawMode(dispatch, ShapeKind.Circle);
                break;
            default:
                break;
        }
    }
)
export default keyboardEventHandler;


const cancelDraw = (dispatch, tempShape) => {
    if (tempShape !== null && ShapeUtils.isPoly(tempShape)) {
        if (shapeIsValid(tempShape)) {
            let shape = tempShape;
            if (ShapeUtils.isPoly(tempShape)) {
                shape = {...tempShape};
                shape.points = shape.points.slice(0, shape.points.length - 1)
            }
            dispatch(createShape(shape));
        }
    }
    dispatch(clearTempShape())
}


const switchDrawMode = (dispatch, targetMode: DrawModeType) => {
    const drawMode = store.getState().drawMode;
    if (targetMode !== drawMode) {
        dispatch(clearTempShape());
        dispatch(setDrawMode(targetMode))
    }
}
