import {clearTempShape, createTempShape, TempShapeType, updateTempShape} from "../../../redux/slices/tempShapeSlice";
import store from "../../../redux/store";
import {createShape} from "../../../redux/slices/shapesSlice";
import {Line, LineUtils, Point, PointUtils, Poly, PolyUtils, ShapeKind, ShapeUtils} from "../../../types/shapes";
import {DrawModeType} from "../../../redux/slices/drawModeSlice";
import {MouseEventHandler} from "react";


export const handleCanvasClick: MouseEventHandler = (e) => {
    console.log(e)
    const drawMode: DrawModeType = store.getState().drawMode;
    if (drawMode === ShapeKind.Line) handleLineClick(e);
}

const handleLineClick = (e) => {
    if (e.type === "mousedown") {
        store.dispatch(createTempShape(
            LineUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)
        ));
    }
    if (e.type === "mouseup") {
        completeTempShape();
    }
}

const handlePolyClick = (e) => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (e.type === "mouseDown") {
        if (tempShape === null) {
            store.dispatch(createTempShape(
                PolyUtils.new({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY})
            ))
        } else if (ShapeUtils.isPoly(tempShape)) {
            store.dispatch(updateTempShape({
                points: (tempShape as Poly).points.concat([
                    PointUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)
                ])
            }))

        } else {
            store.dispatch(clearTempShape());
        }
    }
}

const completeTempShape = () => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (tempShape !== null) {
        store.dispatch(createShape(tempShape));
        store.dispatch(clearTempShape());
    }
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
    const oldPoints: Point[] = (tempShape as Poly).points;
    oldPoints[oldPoints.length - 1] = {
        x: e.nativeEvent.layerX,
        y: e.nativeEvent.layerY
    };
    store.dispatch(updateTempShape({points: oldPoints}));
}