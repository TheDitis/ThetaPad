export {}
///** useThetaPadState.ts
// * @file Primary state management hook for ThetaPad
// * @author Ryan McKay <ryanscottmckay@gmail.com>
// */
//import {useCallback, useEffect, useReducer, useState} from "react";
//import {PrimaryDispatch, ThetaPadStateType} from "./ThetaPad";
//import {Circle, Line, Point, Poly, Shape, ShapeKind, ShapeMap} from "./types/shapes";
//import {Action, ChangeDrawModeAction, CreateShapeAction, EndShapeAction, ShapesUpdateAction} from "./types/actions";
//
//
///////---------------------------------------------------------------------------
/////     REDUCERS:
///////---------------------------------------------------------------------------
//
///**
// * Returns updated version of shapes based on type of action passed
// * @param {ShapeMap} shapes - the current shapes state
// * @param {ShapesUpdateAction} action - the action that was passed
// * @return {ShapeMap} - A new, updated version of shapes
// */
//const shapesReducer = (
//    shapes: ShapeMap,
//    action: ShapesUpdateAction
//): ShapeMap => {
//    // Add a new shape
//    if (action.isCreateKind()) {
//        shapes[action.payload.id] = action.payload;
//    }
//    // End a poly draw if one is in session
//    else if (action.isEndKind()) {
//        const shape = shapes[action.targetShape];
//        if (shape && shape.isPoly()) {
//            if (shape.points.length < 2) {
//                delete shapes[action.targetShape];
//            }
//        }
//    }
//    // Remove a shape by id
//    else if (action.isRemoveKind()) {
//        delete shapes[action.targetShape];
//    }
//    else {
//        console.error("ACTION TYPE ", action.kind, " NOT HANDLED IN shapesReducer!")
//    }
//    return {...shapes}
//}
//
//
//
///////---------------------------------------------------------------------------
/////     HOOK DEFINITION:
///////---------------------------------------------------------------------------
//
///**
// * This is the primary state-management system for ThetaPad
// * @return {ThetaPadStateType} - An object containing all necessary state items
// *      and updater functions
// */
//const useThetaPadState = () => {
//    const [tempShape, setTempShape] = useState<Shape | null>(null);
//    const [value, setUnit] = useState<number>(1);
//    const [drawMode, setDrawMode] = useState<ShapeKind>(ShapeKind.LineUtils)
//    const [shapes, updateShapes] = useReducer(shapesReducer, {});
////    const undoBuffer: Action[] = [];
//
//    /**
//     * The highest-level state-update dispatch function
//     * @param {Action} action - an action-object derived from Action
//     */
//    const dispatch = (action: Action) => {
//        if (action.targetsShapes()) {
//            updateShapes(action)
//        }
//        else if (action.targetsDrawMode()) {
//            console.log("action targeting drawMode received in dispatch")
//            console.log("tempShape: ", tempShape)
//            if (!tempShape) {
//                console.log("setting drawMode to ", action.value)
//                setDrawMode(action.value)
//            }
//        }
//        else if (action.targetsUnit()) {
//            setUnit(action.value);
//        }
//    }
//
////    const dispatch: PrimaryDispatch = useCallback((action: Action) => {
////        if (action.targetsShapes()) {
////            updateShapes(action)
////        }
////        else if (action.targetsDrawMode()) {
////            console.log("action targeting drawMode received in dispatch")
////            console.log("tempShape: ", tempShape)
////            if (!tempShape) {
////                console.log("setting drawMode to ", action.value)
////                setDrawMode(action.value)
////            }
////        }
////        else if (action.targetsUnit()) {
////            setUnit(action.value);
////        }
////    }, [tempShape])
//
//
//    /** Bind a key listener, and remove it when done. */
//    useEffect(() => {
//        const keyListener = async (e: KeyboardEvent) => {
//            switch (e.key.toLowerCase()) {
//                case "escape":
//                    if (tempShape !== null && tempShape.isPoly()) {
//                        tempShape.points.pop();
//                        await dispatch(new CreateShapeAction(tempShape));
//                        dispatch(new EndShapeAction(tempShape.id));
//                        setTempShape(null);
//                    }
//                    break;
//                case "l":
//                    dispatch(new ChangeDrawModeAction(ShapeKind.LineUtils));
//                    break;
//                case "p":
//                    dispatch(new ChangeDrawModeAction(ShapeKind.Poly));
//                    break;
//                case "c":
//                    dispatch(new ChangeDrawModeAction(ShapeKind.Circle));
//                    break;
//                default:
//                    break
//            }
//        }
//
//        window.addEventListener("keydown", keyListener);
//
//        return () => window.removeEventListener("keydown", keyListener);
//    }, [tempShape, dispatch]);
//
//    /**
//     * Handles mouseup and mousedown events on the canvas when drawMode is Line.
//     * Called by 'handleCanvasClick'
//     * @param {MouseEvent} e - the mouseup/mousedown fired
//     */
//    const handleLineClickEvent = (e) => {
//        if (tempShape !== null && !tempShape.isLine()) {
//            console.error("handleLineClick called with non-line tempShape")
//        }
//        // Starting a new line:
//        if (!tempShape && e.type === "mousedown") {
//            const newShape = new Line(e.pageX, e.pageY, "red");
//            setTempShape(newShape);
//        }
//        // If in the middle of a drawing action
//        else if (tempShape && e.type === "mouseup") {
//            if (tempShape.isLine() && tempShape.length > 1) {
//                tempShape.color = "black";
//                dispatch(new CreateShapeAction(tempShape));
//            }
//            setTempShape(null);
//        }
//    }
//
//    /**
//     * Handles mouseup and mousedown events on the canvas in Poly drawMode.
//     * Called by 'handleCanvasClick'
//     * @param {MouseEvent} e - the mouseup/mousedown fired
//     */
//    const handlePolyClickEvent = (e) => {
//        if (tempShape !== null && !tempShape.isPoly()) {
//            console.error("handlePolyClick called with non-poly tempShape")
//        }
//        else if (e.type === "mousedown") {
//            // Start a new poly-draw
//            if (tempShape === null) {
//                const newShape = new Poly(e.pageX, e.pageY, "purple");
//                newShape.addPoint(e.pageX, e.pageY);
//                setTempShape(newShape);
//            } else {
//                tempShape.addPoint(e.pageX, e.pageY);
//                setTempShape(tempShape);
//            }
//        }
//    }
//
//    /**
//     * Handles mouseup and mousedown events on the canvas in Circle drawMode.
//     * Called by 'handleCanvasClick'
//     * @param {MouseEvent} e - the mouseup/mousedown fired
//     */
//    const handleCircleClickEvent = (e: MouseEvent) => {
//        if (tempShape !== null && !tempShape.isCircle()) {
//            console.error("handleCircleClick called with non-circle tempShape");
//        }
//        else if (e.type === "mousedown") {
//            setTempShape(new Circle(e.pageX, e.pageY));
//        }
//        else if (e.type === "mouseup" && tempShape !== null) {
//            if (tempShape.r > 3) {
//                dispatch(new CreateShapeAction(tempShape));
//            }
//            setTempShape(null);
//        }
//    }
//
//    /**
//     * Called on all mousedown and mouseup events that occur on the canvas.
//     * Routes the event to the relevant handler one layer of specificity down.
//     * @param {MouseEvent} e - the mousedown or mouseup event that was triggered
//     */
//    const handleCanvasClick = (e: MouseEvent) => {
//        switch (drawMode) {
//            case ShapeKind.LineUtils:
//                handleLineClickEvent(e);
//                break;
//            case ShapeKind.Poly:
//                handlePolyClickEvent(e);
//                break;
//            case ShapeKind.Circle:
//                handleCircleClickEvent(e);
//                break;
//            default:
//                console.error("drawMode ", drawMode,
//                    " not handled in handleCanvasClick inDraw branch")
//                break;
//        }
//    }
//
//    /**
//     * Called when the mouse is moved over the canvas. Only does anything if in
//     * the middle of a shape-drawing.
//     * @param {MouseEvent} e - The mousemove event that was fired
//     */
//    const handleMouseMove = (e: MouseEvent) => {
//        if (tempShape !== null) {
//            if (tempShape.isLine()) {
//                const tempTempShape = tempShape.copy();
//                tempTempShape.end.moveTo(e.pageX, e.pageY);
//                setTempShape(tempTempShape);
//            }
//            else if (tempShape.isPoly()) {
//                const tempTempShape = tempShape.copy();
//                tempTempShape.setEndpoint(e.pageX, e.pageY);
//                setTempShape(tempTempShape);
//            }
//            else if (tempShape.isCircle()) {
//                const tempTempShape = tempShape.copy();
//                tempTempShape.r = tempTempShape.origin.distanceTo(
//                    new Point(e.pageX, e.pageY)
//                );
//                setTempShape(tempTempShape);
//            }
//        }
//    }
//
//    return {
//        dispatch,
//        tempShape,
//        value,
//        handleCanvasClick,
//        handleMouseMove,
//        drawMode,
//        shapes,
//    } as ThetaPadStateType
//}
//
//export default useThetaPadState;