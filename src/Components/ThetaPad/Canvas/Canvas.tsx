/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Stage} from "react-konva";
import React, {MouseEventHandler, useContext} from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {LineUtils} from "../types/shapes";
//import type {Line, Shape, ShapeKind, ShapeMap} from "../types/shapes";
import {Dimensions, SizeContext} from "../../App/AppContextProvider";
import {useDispatch, useSelector} from "react-redux";
//import {CreateShapeAction, CreateTempShapeAction} from "../types/actions";
import store, {AppDispatch} from "../../../redux/store";
import {clearTempShape, createTempShape, updateTempShape} from "../../../redux/slices/tempShapeSlice";
import {createShape} from "../../../redux/slices/shapesSlice";
import StageWithReduxBridge from "./Layers/ShapesLayer/StageWithReduxBridge";

interface CanvasStyleProps {
    dimensions: Dimensions
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(156, 231, 255);
`

const completeTempShape = () => {
    const tempShape = store.getState().tempShape;
    if (tempShape) {
        store.dispatch(createShape(tempShape));
        store.dispatch(clearTempShape());
    }
}

const handleMouseMove = (e) => {
    const tempShape = store.getState().tempShape;
    if (tempShape) {
        store.dispatch(updateTempShape({end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}}))
    }
}

interface CanvasProps {
//    onClick;
//    onMouseMove;
}

const Canvas: React.FC<CanvasProps> = ((props) => {
    const dimensions = useContext(SizeContext);
    const dispatch = useDispatch<AppDispatch>();

//    const tempShape = useSelector<AppState>(state => state.tempShape)

    const handleClick = (e) => {
        console.log("e: ", e);
        if (e.type === "mousedown") {
            dispatch(createTempShape(LineUtils.new(e.nativeEvent.layerX, e.nativeEvent.layerY)));
        }
        if (e.type === "mouseup") {
            completeTempShape();
        }
    }



    return (
        <CanvasRoot
            dimensions={dimensions}
            onMouseDown={handleClick}
            onMouseUp={handleClick}
            onMouseMove={handleMouseMove}
        >
            <StageWithReduxBridge
                width={window.innerWidth}
                height={window.innerHeight}
            >
                <ShapesLayer/>
            </StageWithReduxBridge>
        </CanvasRoot>
    )
})


export default Canvas;
