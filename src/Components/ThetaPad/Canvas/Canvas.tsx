/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {LineUtils} from "../../../types/shapes";
import {Dimensions} from "../../../redux/slices/dimensionsSlice";
import {useDispatch, useSelector} from "react-redux";
import store, {AppDispatch} from "../../../redux/store";
import {clearTempShape, createTempShape, updateTempShape} from "../../../redux/slices/tempShapeSlice";
import {createShape} from "../../../redux/slices/shapesSlice";
import StageWithReduxBridge from "./Layers/ShapesLayer/StageWithReduxBridge";
import {dimensionsSelector} from "../../../redux/selectors";

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
}

const Canvas: React.FC<CanvasProps> = (() => {
    const dimensions = useSelector(dimensionsSelector);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (e) => {
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
