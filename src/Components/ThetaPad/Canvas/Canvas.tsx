/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Stage} from "react-konva";
import React from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {ShapeMap} from "../types/shapes";
import {Dimensions} from "../ThetaPad";
import {NAVBAR_HEIGHT} from "../../constants";

interface CanvasStyleProps {
    dimensions: Dimensions
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - NAVBAR_HEIGHT};
  background: rgb(156, 231, 255);
`

interface CanvasProps {
    onClick;
    onMouseMove;
    dimensions: Dimensions;
    shapes: ShapeMap;
}

const Canvas: React.FC<CanvasProps> = ((props) => {
    return (
        <CanvasRoot
            dimensions={props.dimensions}
            onMouseDown={props.onClick}
            onMouseUp={props.onClick}
            onMouseMove={props.onMouseMove}
        >
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <ShapesLayer
                    dimensions={props.dimensions}
                    shapes={props.shapes}
                />
            </Stage>
        </CanvasRoot>
    )
})


export default Canvas;
