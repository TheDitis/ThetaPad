import {ShapeKind, ShapeUtils} from "../../types/shapes";
import {shapeIsValid} from "./Canvas/canvasEventHandlers";
import {createShape} from "../../redux/slices/shapesSlice";
import {clearTempShape} from "../../redux/slices/tempShapeSlice";
import {DrawModeType, setDrawMode} from "../../redux/slices/drawModeSlice";
import store from "../../redux/store";


const keyboardEventHandler = (dispatch, tempShape) => (e) => {
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

export default keyboardEventHandler;
