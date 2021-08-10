/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Stage} from "react-konva";
import React, {MouseEventHandler, useContext} from "react";
import styled from "styled-components";
//import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {Line} from "../types/shapes";
//import type {LineType, ShapeType, ShapeKind, ShapeMap} from "../types/shapes";
import {Dimensions, SizeContext} from "../../App/AppContextProvider";
import {useDispatch} from "react-redux";
//import {CreateShapeAction, CreateTempShapeAction} from "../types/actions";
import {AppDispatch} from "../../../redux/store";
import {createTempShape} from "../../../redux/slices/tempShapeSlice";

interface CanvasStyleProps {
    dimensions: Dimensions
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(156, 231, 255);
`

interface CanvasProps {
//    onClick;
//    onMouseMove;
}

const Canvas: React.FC<CanvasProps> = ((props) => {
    const dimensions = useContext(SizeContext);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (e: MouseEvent) => {
        if (e.type === "mousedown") {
            dispatch(createTempShape(Line.new(e.x, e.y)))
        }
    }

    return (
        // @ts-ignore
        <CanvasRoot
            dimensions={dimensions}
            onMouseDown={handleClick}
            onMouseUp={handleClick}
        >
            {/*<Stage width={window.innerWidth} height={window.innerHeight}>*/}
            {/*    <ShapesLayer/>*/}
            {/*</Stage>*/}
        </CanvasRoot>
    )
})


export default Canvas;
