import {
    addPolyPoint,
    clearTempShape,
    continuePolyDraw,
    createTempShape,
    TempShapeType,
    updateTempShape
} from "../../../redux/slices/tempShapeSlice";
import store, {AppDispatch} from "../../../redux/store";
import {createShape} from "../../../redux/slices/shapesSlice";
import {
    Circle,
    CircleUtils,
    Line,
    LineUtils,
    PointUtils,
    PolyUtils,
    Shape,
    ShapeKind,
    ShapeUtils
} from "../../../types/shapes";
import {DrawModeType} from "../../../redux/slices/drawModeSlice";
import {MouseEventHandler} from "react";
import {MIN_CIRCLE_RADIUS, MIN_LINE_LENGTH, MIN_POLY_POINTS} from "../../constants";


/////---------------------------------------------------------------------------
///     CLICK HANDLERS:
/////---------------------------------------------------------------------------

export const handleCanvasClick = (dispatch): MouseEventHandler => (e) => {
    const drawMode: DrawModeType = store.getState().drawMode;
    if (drawMode === ShapeKind.Line) {
        handleLineClick(e, dispatch);
    }
    else if (drawMode === ShapeKind.Poly) {
        handlePolyClick(e, dispatch);
    }
    else if (drawMode === ShapeKind.Circle) {
        handleCircleClick(e, dispatch);
    }
}

const handleLineClick = (e, dispatch) => {
    if (e.type === "mousedown") {
        dispatch(createTempShape(
            LineUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)
        ));
    }
    if (e.type === "mouseup") {
        moveTempShapeToShapes();
    }
}

const handlePolyClick = (e, dispatch) => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (e.type === "mousedown") {
        if (tempShape === null) {
            dispatch(createTempShape(
                PolyUtils.new({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY})
            ))
        }
        else if (ShapeUtils.isPoly(tempShape)) {
            dispatch(addPolyPoint(
                {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
            ))
        }
        else {
            dispatch(clearTempShape());
        }
    }
}

const handleCircleClick = (e, dispatch) => {
    const point = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    if (e.type === "mousedown") {
        dispatch(createTempShape(CircleUtils.new(point)))
    }
    else {
        moveTempShapeToShapes()
    }
}


export const moveTempShapeToShapes = () => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (tempShape !== null && shapeIsValid(tempShape)) {
        store.dispatch(createShape(tempShape));
    }
    store.dispatch(clearTempShape());
}

export const shapeIsValid = (shape: TempShapeType): shape is Shape => {
    if (shape === null) {
        return false;
    }
    if (ShapeUtils.isLine(shape)) {
        return shape.length >= MIN_LINE_LENGTH;
    }
    if (ShapeUtils.isPoly(shape)) {
        return shape.points.length > MIN_POLY_POINTS;
    }
    if (ShapeUtils.isCircle(shape)) {
        return shape.r > MIN_CIRCLE_RADIUS;
    }
    return false;
}



/////---------------------------------------------------------------------------
///     MOUSE-MOVEMENT HANDLERS:
/////---------------------------------------------------------------------------


export const handleMouseMove = (dispatch: AppDispatch) => (
    (e) => {
        const tempShape = store.getState().tempShape;
        if (tempShape !== null) {
            if (ShapeUtils.isLine(tempShape)) {
                handleLineMouseMove(e, dispatch, tempShape);
            }
            else if (ShapeUtils.isPoly(tempShape)) {
                handlePolyMouseMove(e, dispatch);
            }
            else if (ShapeUtils.isCircle(tempShape)) {
                handleCircleMouseMove(e, dispatch, tempShape);
            }
        }
    }
)

const handleLineMouseMove = (e, dispatch, tempShape: Line) => {
    dispatch(updateTempShape({
        end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY},
        length: LineUtils.length_(tempShape),
        angle: LineUtils.angle(tempShape),
    }))
}

const handlePolyMouseMove = (e, dispatch) => {
    dispatch(continuePolyDraw(
        {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    ))
}

const handleCircleMouseMove = (e, dispatch, tempShape: Circle) => {
    const newPt = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    dispatch(updateTempShape(
        {r: PointUtils.distance(tempShape.origin, newPt)}
    ))
}