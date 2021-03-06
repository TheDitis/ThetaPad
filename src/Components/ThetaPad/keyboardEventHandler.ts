/** keyboardEventHandler.ts
 * @file contains key-event handler function and its helper functions
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {LineUtils, ShapeKind, ShapeUtils} from "../../types/shapes";
import {shapeIsValid} from "./Canvas/canvasEventHandlers";
import {createShape} from "../../redux/slices/shapesSlice";
import {clearTempShape, TempShapeType} from "../../redux/slices/tempShapeSlice";
import {DrawModeType, setDrawMode} from "../../redux/slices/drawModeSlice";
import store, {AppDispatch} from "../../redux/store";
import {redo, undo} from "../../redux/slices/undoRedoSlice";
import {toggleGrid} from "../../redux/slices/gridSlice";
import {toggleFilter} from "../../redux/slices/filtersSlice";
import {imageSrcSelector} from "../../redux/selectors";
import {notify} from "../../redux/slices/alertSlice";

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
        if (!(e.target instanceof HTMLInputElement)) {
            const cmd = (e.metaKey || e.ctrlKey);
            switch (e.key.toLowerCase()) {
                // ESCAPE DRAW
                case "escape":
                    escapeDraw(dispatch, tempShape);
                    break;
                // SHAPE DRAW MODE SWITCHING
                case "p":
                    if (!cmd) {
                        switchDrawMode(dispatch, ShapeKind.Poly);
                    }
                    break;
                case "l":
                    switchDrawMode(dispatch, ShapeKind.Line);
                    break;
                case "c":
                    if (!cmd) {
                        switchDrawMode(dispatch, ShapeKind.Circle);
                    }
                    break;
                // UNDO/REDO
                case "z":
                    if (cmd) {
                        if (e.shiftKey) {
                            dispatch(redo());
                        }
                        else {
                            dispatch(undo());
                        }
                    }
                    break;
                // TOGGLE TOOLS
                case "g":
                    dispatch(toggleGrid());
                    break;
                case "f":
                    if (!cmd) {
                        const imageSrc = imageSrcSelector(store.getState());
                        if (imageSrc !== null) {
                            dispatch(toggleFilter())
                        } else {
                            dispatch(notify("Add an image to enable filters"))
                        }
                    }
                    break;
                // PREVENT RESIZE
                case "-":
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                case "=":
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                default:
                    break;
            }
        }
    }
)

/**
 * Ends poly draw session
 * @param dispatch - dispatch function
 * @param tempShape - the current tempShape (modifies if type is Poly)
 */
const escapeDraw = (dispatch, tempShape) => {
    if (tempShape !== null && ShapeUtils.isPoly(tempShape)) {
        if (shapeIsValid(tempShape)) {
            let shape = tempShape;
            if (ShapeUtils.isPoly(tempShape)) {
                shape = {...tempShape};
                shape.points = shape.points.slice(0, shape.points.length - 1);
                shape.lengths = shape.lengths.slice(0, shape.lengths.length - 1);
                shape.angles = shape.angles.slice(0, shape.angles.length - 1);
                shape.lineAngles = shape.lineAngles.slice(
                    0, shape.lineAngles.length - 1
                );
            }
            if (shape.points.length > 2) {
                dispatch(createShape(shape));
            }
            else {
                dispatch(createShape(LineUtils.new(
                    shape.points[0].x,
                    shape.points[0].y,
                    shape.points[1].x,
                    shape.points[1].y,
                    shape.color
                )));
            }
        }
    }
    dispatch(clearTempShape())
}

/**
 * Change the type of shape that the next click will draw
 * @param dispatch - redux dispatch function
 * @param {DrawModeType} targetMode - drawMode to switch to
 */
const switchDrawMode = (dispatch, targetMode: DrawModeType) => {
    const drawMode = store.getState().drawMode;
    if (targetMode !== drawMode) {
        dispatch(clearTempShape());
        dispatch(setDrawMode(targetMode))
    }
}


export default keyboardEventHandler;
