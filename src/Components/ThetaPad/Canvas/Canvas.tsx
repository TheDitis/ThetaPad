import {Layer, Stage} from "react-konva";
import React from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {ShapeMap} from "../types/shapes";

const CanvasRoot = styled.div<{}>`
  width: 100vw;
  height: 100vh;
  border: 2px solid orange;
  background: rgb(156, 231, 255);
`

interface CanvasProps {
    shapes: ShapeMap
}

const Canvas: React.FC<CanvasProps> = ((props) => {
    return (
        <CanvasRoot>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <ShapesLayer shapes={props.shapes}/>
            </Stage>
        </CanvasRoot>
    )
})


export default Canvas;
