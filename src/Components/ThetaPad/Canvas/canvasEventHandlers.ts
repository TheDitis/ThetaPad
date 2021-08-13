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
import {Line, LineUtils, Poly, PolyUtils, Shape, ShapeKind, ShapeUtils} from "../../../types/shapes";
import {DrawModeType} from "../../../redux/slices/drawModeSlice";
import {MouseEventHandler} from "react";
import {MIN_CIRCLE_RADIUS, MIN_LINE_LENGTH, MIN_POLY_POINTS} from "../../constants";


export const handleCanvasClick: MouseEventHandler = (e) => {
    const drawMode: DrawModeType = store.getState().drawMode;
    if (drawMode === ShapeKind.Line) {
        handleLineClick(e);
    } else if (drawMode === ShapeKind.Poly) {
        handlePolyClick(e);
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
    console.log(e)
    let tempShape: TempShapeType = store.getState().tempShape;
    if (e.type === "mousedown") {
        if (tempShape === null) {
            store.dispatch(createTempShape(
                PolyUtils.new({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY})
            ))
        } else if (ShapeUtils.isPoly(tempShape)) {
            store.dispatch(addPolyPoint({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}))
//            store.dispatch(updateTempShape({
//                points: (tempShape as Poly).points.concat([
//                    PointUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)
//                ])
//            }))

        } else {
            store.dispatch(clearTempShape());
        }
    }
}

export const moveTempShapeToShapes = () => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (tempShape !== null && shapeIsValid(tempShape)) {
        store.dispatch(createShape(tempShape));
    }
    store.dispatch(clearTempShape());
}

const shapeIsValid = (shape: Shape): boolean => {
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


export const handleMouseMove = (e) => {
    const tempShape = store.getState().tempShape;
    if (tempShape !== null) {
        if (ShapeUtils.isLine(tempShape)) {
            handleLineMouseMove(e, tempShape);
        } else if (ShapeUtils.isPoly(tempShape)) {
            handlePolyMouseMove(e, tempShape);
        }
    }
}

export const handleLineMouseMove = (e, tempShape: Line) => {
    store.dispatch(updateTempShape({
        end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY},
        length: LineUtils.length_(tempShape),
        angle: LineUtils.angle(tempShape),
    }))
}

export const handlePolyMouseMove = (e, tempShape: Poly) => {
    store.dispatch(continuePolyDraw(
        {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    ))
}