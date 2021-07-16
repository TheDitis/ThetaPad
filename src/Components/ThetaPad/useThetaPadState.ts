/** useThetaPadState.ts
 * @file Primary state management hook for ThetaPad
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {useEffect, useReducer, useState} from "react";
import {PrimaryDispatch, ThetaPadStateType} from "./ThetaPad";
import {Circle, Line, Point, Poly, Shape, ShapeKind, ShapeMap} from "./types/shapes";
import {Action, ChangeDrawModeAction, CreateShapeAction, EndShapeAction, ShapesUpdateAction} from "./types/actions";


/////---------------------------------------------------------------------------
///     REDUCERS:
/////---------------------------------------------------------------------------

/**
 * Returns updated version of shapes based on type of action passed
 * @param {ShapeMap} shapes - the current shapes state
 * @param {ShapesUpdateAction} action - the action that was passed
 * @return {ShapeMap} - A new, updated version of shapes
 */
const shapesReducer = (
    shapes: ShapeMap,
    action: ShapesUpdateAction
): ShapeMap => {
    // Add a new shape
    if (action.isCreateKind()) {
        shapes[action.payload.id] = action.payload;
    }
    // End a poly draw if one is in session
    else if (action.isEndKind()) {
        const shape = shapes[action.targetShape];
        if (shape && shape.isPoly()) {
            if (shape.points.length < 2) {
                delete shapes[action.targetShape];
            }
        }
    }
    // Remove a shape by id
    else if (action.isRemoveKind()) {
        delete shapes[action.targetShape];
    }
    else {
        console.error("ACTION TYPE ", action.kind, " NOT HANDLED IN shapesReducer!")
    }
    return {...shapes}
}



/////---------------------------------------------------------------------------
///     HOOK DEFINITION:
/////---------------------------------------------------------------------------

/**
 * This is the primary state-management system for ThetaPad
 * @return {ThetaPadStateType} - An object containing all necessary state items
 *      and updater functions
 */
const useThetaPadState = () => {
    const [tempShape, setTempShape] = useState<Shape | null>(null);
    const [unit, setUnit] = useState<number>(1);
    const [drawMode, setDrawMode] = useState<ShapeKind>(ShapeKind.Line)
    const [shapes, updateShapes] = useReducer(shapesReducer, {});


    /** Bind a key listener, and remove it when done. */
    useEffect(() => {
        const keyListener = async (e: KeyboardEvent) => {
            console.log(e)
            switch (e.key.toLowerCase()) {
                case "escape":
                    console.log("esc hit")
                    if (tempShape !== null && tempShape.isPoly()) {
                        console.log("Should be working")
                        tempShape.points.pop();
                        await dispatch(new CreateShapeAction(tempShape));
                        dispatch(new EndShapeAction(tempShape.id));
                        setTempShape(null);
                    }
                    break;
                case "l":
                    dispatch(new ChangeDrawModeAction(ShapeKind.Line));
                    break;
                case "p":
                    dispatch(new ChangeDrawModeAction(ShapeKind.Poly));
                    break;

            }
        }

        window.addEventListener("keydown", keyListener);

        return () => window.removeEventListener("keydown", keyListener);
    }, [tempShape]);



    /**
     * The highest-level state-update dispatch funtion
     * @param {Action} action - an action-object derived from Action
     */
    const dispatch: PrimaryDispatch = (action: Action): void => {
        if (action.targetsShapes()) {
            updateShapes(action)
        }
        else if (action.targetsDrawMode()) {
            console.log("setting draw mode to ", action.value)
            setDrawMode(action.value);
        }
        else if (action.targetsUnit()) {
            setUnit(action.value);
        }
    }

    /**
     * Handles mouseup and mousedown events on the canvas when drawMode is Line.
     * Called by 'handleCanvasClick'
     * @param e - the mouseup/mousedown event that was fired
     */
    const handleLineClickEvent = (e) => {
        // Starting a new line:
        if (!tempShape && e.type === "mousedown") {
            const newShape = new Line(e.pageX, e.pageY, "red");
            setTempShape(newShape);
        }
        // If in the middle of a drawing action
        else if (tempShape && e.type === "mouseup") {
            if (tempShape.isLine() && tempShape.length > 1) {
                tempShape.color = "black";
                dispatch(new CreateShapeAction(tempShape));
            }
            setTempShape(null);
        }
    }

    const handlePolyClickEvent = (e) => {
        if (tempShape !== null && !tempShape.isPoly()) {
            console.error("handlePolyClick called with non-poly tempShape")
        }
        else if (e.type === "mousedown") {
            // Start a new poly-draw
            if (tempShape === null) {
                const newShape = new Poly(e.pageX, e.pageY, "purple");
                newShape.addPoint(e.pageX, e.pageY);
                setTempShape(newShape);
            } else {
                tempShape.addPoint(e.pageX, e.pageY);
                setTempShape(tempShape);
            }
        }
    }

    const handleCircleClickEvent = (e: MouseEvent) => {
        if (tempShape !== null && !tempShape.isCircle()) {
            console.error("handleCircleClick called with non-circle tempShape");
        }
        else if (e.type === "mousedown") {
            console.log("Starting circle")
            setTempShape(new Circle(e.pageX, e.pageY));
        }
        else if (e.type === "mouseup" && tempShape !== null) {
            console.log("Ending circle")
            dispatch(new CreateShapeAction(tempShape));
            setTempShape(null);
        }
    }

    /**
     * Called on all mousedown and mouseup events that occur on the canvas.
     * Routes the event to the relevant handler one layer of specificity down.
     * @param {MouseEvent} e - the mousedown or mouseup event that was triggered
     */
    const handleCanvasClick = (e: MouseEvent) => {
        switch (drawMode) {
            case ShapeKind.Line:
                handleLineClickEvent(e);
                break;
            case ShapeKind.Poly:
                handlePolyClickEvent(e);
                break;
            case ShapeKind.Circle:
                handleCircleClickEvent(e);
                break;
            default:
                console.error("drawMode ", drawMode,
                    " not handled in handleCanvasClick inDraw branch")
                break;
        }
    }

    /**
     * Called when the mouse is moved over the canvas. Only does anything if in
     * the middle of a shape-drawing.
     * @param {MouseEvent} e - The mousemove event that was fired
     */
    const handleMouseMove = (e: MouseEvent) => {
        if (tempShape !== null) {
            if (tempShape.isLine()) {
                const tempTempShape = tempShape.copy();
                tempTempShape.end.moveTo(e.pageX, e.pageY);
                setTempShape(tempTempShape);
            }
            else if (tempShape.isPoly()) {
                const tempTempShape = tempShape.copy();
                tempTempShape.setEndpoint(e.pageX, e.pageY);
                console.log(tempTempShape.points)
                setTempShape(tempTempShape);
            }
            else if (tempShape.isCircle()) {
                const tempTempShape = tempShape.copy();
                tempTempShape.r = tempTempShape.origin.distanceTo(
                    new Point(e.pageX, e.pageY)
                );
                setTempShape(tempTempShape);
            }
        }
    }

    return {
        dispatch,
        tempShape,
        unit,
        handleCanvasClick,
        handleMouseMove,
        drawMode,
        shapes,
    } as ThetaPadStateType
}

export default useThetaPadState;