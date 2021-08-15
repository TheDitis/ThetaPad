import {
    addPolyPoint,
    clearTempShape,
    continuePolyDraw,
    createTempShape,
    TempShapeType,
    updateTempShape
} from "../../../redux/slices/tempShapeSlice";
import store from "../../../redux/store";
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

export const handleCanvasClick: MouseEventHandler = (e) => {
    const drawMode: DrawModeType = store.getState().drawMode;
    if (drawMode === ShapeKind.Line) {
        handleLineClick(e);
    }
    else if (drawMode === ShapeKind.Poly) {
        handlePolyClick(e);
    }
    else if (drawMode === ShapeKind.Circle) {
        handleCircleClick(e);
    }
}

const handleLineClick = (e) => {
    if (e.type === "mousedown") {
        store.dispatch(createTempShape(
            LineUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)
        ));
    }
    if (e.type === "mouseup") {
        moveTempShapeToShapes();
    }
}

const handlePolyClick = (e) => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (e.type === "mousedown") {
        if (tempShape === null) {
            store.dispatch(createTempShape(
                PolyUtils.new({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY})
            ))
        }
        else if (ShapeUtils.isPoly(tempShape)) {
            store.dispatch(addPolyPoint(
                {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
            ))
        }
        else {
            store.dispatch(clearTempShape());
        }
    }
}

const handleCircleClick = (e) => {
    const point = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    if (e.type === "mousedown") {
        store.dispatch(createTempShape(CircleUtils.new(point)))
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


export const handleMouseMove = (e) => {
    const tempShape = store.getState().tempShape;
    if (tempShape !== null) {
        if (ShapeUtils.isLine(tempShape)) {
            handleLineMouseMove(e, tempShape);
        }
        else if (ShapeUtils.isPoly(tempShape)) {
            handlePolyMouseMove(e);
        }
        else if (ShapeUtils.isCircle(tempShape)) {
            handleCircleMouseMove(e, tempShape);
        }
    }
}


const handleLineMouseMove = (e, tempShape: Line) => {
    store.dispatch(updateTempShape({
        end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY},
        length: LineUtils.length_(tempShape),
        angle: LineUtils.angle(tempShape),
    }))
}

const handlePolyMouseMove = (e) => {
    store.dispatch(continuePolyDraw(
        {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    ))
}

const handleCircleMouseMove = (e, tempShape: Circle) => {
    const newPt = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    store.dispatch(updateTempShape(
        {r: PointUtils.distance(tempShape.origin, newPt)}
    ))
}