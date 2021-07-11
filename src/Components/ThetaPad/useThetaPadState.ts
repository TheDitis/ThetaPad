/** useThetaPadState.ts
 * author: Ryan McKay
 *
 * This is the primary state manager for ThetaPad
 */
import {useReducer, useState} from "react";
import {
    Action,
    Line,
    Shape,
    ShapeKind,
    ShapesUpdateAction,
    ThetaPadStateType,
    CreateShapeAction
} from "./ThetaPad";


/////---------------------------------------------------------------------------
///     REDUCERS:
/////---------------------------------------------------------------------------

const shapesReducer = (
    shapeArray: Shape[],
    action: ShapesUpdateAction
): Shape[] => {
    if (action.createKind()) {
        shapeArray.push(action.payload);
    }
    if (action.continueKind()) {
        if (shapeArray.length) {
            shapeArray[-1].update(action.payload)
            shapeArray[shapeArray.length - 1] = Object.assign(
                shapeArray[shapeArray.length - 1],
                action.payload
            )
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

    const handleCanvasClick = (e: MouseEvent) => {
        if (!inDraw) {
            switch (drawMode) {
                case ShapeKind.Line:
                    dispatch(
                        new CreateShapeAction(
                            new Line(e.x, e.y)
                        )
                    )
            }
        }
    }

    return {
        dispatch,
        handleCanvasClick,
        drawMode,
        shapes,
    } as ThetaPadStateType
}

export default useThetaPadState;