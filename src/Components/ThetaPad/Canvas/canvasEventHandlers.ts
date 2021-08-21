/** canvasEventHandlers.ts
 * @file Holds mouse-event handlers for the Canvas component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
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
import React, {MouseEventHandler} from "react";
import {MIN_CIRCLE_RADIUS, MIN_LINE_LENGTH, MIN_POLY_POINTS} from "../../constants";


/////---------------------------------------------------------------------------
///     CLICK HANDLERS:
/////---------------------------------------------------------------------------

/**
 * Primary click handler switch for both mousedown and mouseup events
 * @param {React.MouseEvent<Element>} e - mousedown or mouseup click event
 */
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

/**
 * Handles click events when in 'Line' drawMode
 * @param e - React synthetic click event
 */
const handleLineClick = (e) => {
    if (e.type === "mousedown") {
        store.dispatch(createTempShape(
            LineUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)
        ));
    }
    if (e.type === "mouseup") {
        endTempShapeDraw();
    }
}

/**
 * Handles click events when in 'Poly' drawMode
 * @param e - React synthetic click event
 */
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

/**
 * Handles click events when in 'Circle' drawMode
 * @param e - React synthetic click event
 */
const handleCircleClick = (e) => {
    const point = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    if (e.type === "mousedown") {
        store.dispatch(createTempShape(CircleUtils.new(point)))
    }
    else {
        endTempShapeDraw()
    }
}

/**
 * Checks if the tempShape is substantial, and if so, moves it to shapes. It
 * resets tempShape to null in either case
 */
export const endTempShapeDraw = () => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (tempShape !== null && shapeIsValid(tempShape)) {
        store.dispatch(createShape(tempShape));
    }
    store.dispatch(clearTempShape());
}

/**
 * Checks if the passed shape is a shape at all, and if its substantial if it is
 * @param {TempShapeType} shape - the Shape (or null) to check for validity
 * @return {shape is Shape} - whether or not the shape is a valid and
 *      substantial shape
 */
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


/**
 * Primary mouse-event handler switch for movement events
 * @param e - mouse event
 */
export const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

/**
 * Handles mouse-move events when in 'Line' drawMode
 * @param e - mouse event
 * @param {Line} tempShape - the current tempShape being drawn
 */
const handleLineMouseMove = (e, tempShape: Line) => {
    store.dispatch(updateTempShape({
        end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY},
        length: LineUtils.length_(tempShape),
        angle: LineUtils.angle(tempShape),
    }))
}

/**
 * Handles mouse-move events when in 'Poly' drawMode
 * @param e - mouse event
 */
const handlePolyMouseMove = (e) => {
    store.dispatch(continuePolyDraw(
        {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    ))
}

/**
 * Handles mouse-move events when in 'Circle' drawMode
 * @param e - mouse event
 * @param {Circle} tempShape - the current tempShape being drawn
 */
const handleCircleMouseMove = (e, tempShape: Circle) => {
    const edgePoint = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}
    store.dispatch(updateTempShape(
        {r: PointUtils.distance(tempShape.origin, edgePoint), edgePoint}
    ))
}