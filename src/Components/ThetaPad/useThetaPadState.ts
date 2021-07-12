/** useThetaPadState.ts
 * author: Ryan McKay
 *
 * This is the primary state manager for ThetaPad
 */
import {useReducer, useState} from "react";
import {
    Action,
    ContinueShapeAction,
    CreateShapeAction,
    Line, Point,
    Shape,
    ShapeKind,
    ShapesUpdateAction,
    ThetaPadStateType
} from "./ThetaPad";


/////---------------------------------------------------------------------------
///     REDUCERS:
/////---------------------------------------------------------------------------

const shapesReducer = (
    shapeArray: Shape[],
    action: ShapesUpdateAction
): Shape[] => {
    if (action.createKind()) {
        console.log("Pushing ", action.payload)
        shapeArray.push(action.payload);
    }
    if (action.continueKind()) {
        if (shapeArray.length) {
            shapeArray[shapeArray.length - 1].update(action.payload)
//            shapeArray[shapeArray.length - 1] = Object.assign(
//                shapeArray[shapeArray.length - 1],
//                action.payload
//            )
            console.log("Ran Once!")
        }
    }
    return shapeArray
}

const useThetaPadState = () => {
    const [inDraw, setInDraw] = useState(false);
    const [drawMode, setDrawMode] = useState<ShapeKind>(ShapeKind.Line)
    const [shapes, updateShapes] = useReducer(shapesReducer, [])

    const dispatch = (action: Action): void => {
        if (action.targetsShapes()) {
            updateShapes(action);
        }
        else if (action.targetsDrawMode()) {
            setDrawMode(action.value);
        }
    }

    const handleLineEvent = (e) => {
        console.log(e)
        // Starting a new line:
        if (!inDraw) {
            dispatch(
                new CreateShapeAction(
                    new Line(e.clientX, e.clientY)
                )
            )
            setInDraw(true);
        }
        // If in the middle of a drawing action
        else {
            dispatch(
                new ContinueShapeAction(
                    {end: new Point(e.clientX, e.clientY)} as Partial<Line>
                )
            )
        }
    }

    const handleCanvasClick = (e: MouseEvent) => {
        console.log("LINE EVENT: ", e)
        console.log(shapes)
        switch (drawMode) {
            case ShapeKind.Line:
                handleLineEvent(e);
                break;
            default:
                console.error("drawMode ", drawMode,
                    " not handled in handleCanvasClick inDraw branch")
                break;
        }
//        if (!inDraw) {
//            switch (drawMode) {
//                case ShapeKind.Line:
//                    dispatch(
//                        new CreateShapeAction(
//                            new Line(e.x, e.y)
//                        )
//                    )
//                    setInDraw(true);
//                    break;
//                default:
//                    console.error("drawMode ", drawMode,
//                        " not handled in handleCanvasClick inDraw branch")
//                    break;
//            }
//        }
//        else {
//            switch (drawMode) {
//                case ShapeKind.Line
//                default:
//                    break;
//            }
//        }
    }

    return {
        dispatch,
        handleCanvasClick,
        drawMode,
        shapes,
    } as ThetaPadStateType
}

export default useThetaPadState;