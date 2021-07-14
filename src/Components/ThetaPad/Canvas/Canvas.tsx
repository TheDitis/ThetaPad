/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Stage} from "react-konva";
import React, {useContext} from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {ShapeMap} from "../types/shapes";
import {Dimensions, SizeContext} from "../../App/AppContextProvider";

interface CanvasStyleProps {
    dimensions: Dimensions
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(156, 231, 255);
`

interface CanvasProps {
    onClick;
    onMouseMove;
    shapes: ShapeMap;
}

const Canvas: React.FC<CanvasProps> = ((props) => {
    const dimensions = useContext(SizeContext);
    return (
        <CanvasRoot
            dimensions={dimensions}
            onMouseDown={props.onClick}
            onMouseUp={props.onClick}
            onMouseMove={props.onMouseMove}
        >
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <ShapesLayer
                    shapes={props.shapes}
                />
            </Stage>
        </CanvasRoot>
    )
})


export default Canvas;
