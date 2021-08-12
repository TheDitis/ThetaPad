import {clearTempShape, createTempShape, TempShapeType, updateTempShape} from "../../../redux/slices/tempShapeSlice";
import store from "../../../redux/store";
import {createShape} from "../../../redux/slices/shapesSlice";
import {LineUtils, ShapeKind} from "../../../types/shapes";
import {DrawModeType} from "../../../redux/slices/drawModeSlice";
import {MouseEventHandler} from "react";


export const handleCanvasClick: MouseEventHandler = (e) => {
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

const handlePolyClick: MouseEventHandler = (e) => {
    const tempShape: TempShapeType = store.getState().tempShape;
    if (e.type === "mouseDown") {
        if (tempShape === null) {

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
    if (tempShape) {
        store.dispatch(updateTempShape({
            end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY},
            length: LineUtils.length_(tempShape),
            angle: LineUtils.angle(tempShape),
        }))
    }
}

