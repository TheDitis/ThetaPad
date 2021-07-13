/** useThetaPadState.ts
 * author: Ryan McKay
 *
 * This is the primary state manager for ThetaPad
 */
import {useReducer, useState} from "react";
import {
    ThetaPadStateType
} from "./ThetaPad";
import {ShapeMap, ShapeKind, Line, Point} from "./types/shapes";
import {
    Action,
    ContinueShapeAction,
    CreateShapeAction,
    EndShapeAction,
    ShapesUpdateAction
} from "./types/actions";


/////---------------------------------------------------------------------------
///     REDUCERS:
/////---------------------------------------------------------------------------

const shapesReducer = (
    shapes: ShapeMap,
    action: ShapesUpdateAction
): ShapeMap => {
    if (action.createKind()) {
        shapes[action.payload.id] = action.payload;
    }
    if (action.continueKind()) {
        shapes[action.targetShape].update(action.payload);
    }
    if (action.endKind()) {
        console.log("ENDING LINE")
    }
    return {...shapes}
}



/////---------------------------------------------------------------------------
///     HOOK DEFINITION:
/////---------------------------------------------------------------------------

const useThetaPadState = () => {
    const [currentShape, setCurrentShape] = useState<string | null>(null);
    const [drawMode, setDrawMode] = useState<ShapeKind>(ShapeKind.Line)
    const [shapes, updateShapes] = useReducer(shapesReducer, {});


    const dispatch = (action: Action): void => {
        if (action.targetsShapes()) {
            updateShapes(action);
        }
        else if (action.targetsDrawMode()) {
            setDrawMode(action.value);
        }
    }

    const handleLineClickEvent = (e) => {
        // Starting a new line:
        if (!currentShape && e.type === "mousedown") {
            const newShape = new Line(e.pageX, e.pageY);
            setCurrentShape(newShape.id);
            dispatch(new CreateShapeAction(newShape))
        }
        // If in the middle of a drawing action
        else if (currentShape && e.type === "mouseup") {
            dispatch(
                new EndShapeAction(
                    currentShape
                )
            )
            setCurrentShape(null);
        }
    }

    const handleCanvasClick = (e: MouseEvent) => {
        console.log(shapes)
        switch (drawMode) {
            case ShapeKind.Line:
                handleLineClickEvent(e);
                break;
            default:
                console.error("drawMode ", drawMode,
                    " not handled in handleCanvasClick inDraw branch")
                break;
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (currentShape) {
            switch (drawMode) {
                case ShapeKind.Line:
                    dispatch(
                        new ContinueShapeAction(
                            currentShape,
                            {end: new Point(e.pageX, e.pageY)} as Partial<Line>
                        )
                    )
                    break;
                default:
                    console.error("drawMode ", drawMode,
                        " not handled in handleMouseMove inDraw branch")
                    break;
            }
        }
    }

    return {
        dispatch,
        handleCanvasClick,
        handleMouseMove,
        drawMode,
        shapes,
    } as ThetaPadStateType
}

export default useThetaPadState;