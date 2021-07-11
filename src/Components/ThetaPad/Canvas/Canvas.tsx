import {Layer, Stage} from "react-konva";
import React from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer";

const CanvasRoot = styled.div<{}>`
  width: 100vw;
  height: 100vh;
  background: rgb(156, 231, 255);
`

const Canvas: React.FC = ((props) => {
    return (
        <CanvasRoot>
            <Stage>
                <ShapesLayer/>
            </Stage>
        </CanvasRoot>
    )
})


export default Canvas;
