/** ThetaPad.tsx
 * @file The root component for the actual drawing portion of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import useThetaPadState from "./useThetaPadState";
import {ShapeMap, ShapeKind} from "./types/shapes";
import Sidebar from "./Sidebar/Sidebar";
import {NAVBAR_HEIGHT} from "../constants";


/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface ThetaPadStyleProps {
    dimensions: Dimensions
}

const ThetaPadRoot = styled.div<ThetaPadStyleProps>`
  margin: 0;
  box-sizing: border-box;
  z-index: 100;
  width: ${props => props.dimensions.width}px;
  height: ${props => props.dimensions.height - NAVBAR_HEIGHT}px;
  background: white;
  display: flex;
`;


/////---------------------------------------------------------------------------
///     PRIMARY STATE TYPE:
/////---------------------------------------------------------------------------

export interface Dimensions {
    sidebar: number,
    width: number,
    height: number
}

export interface ThetaPadStateType {
    dispatch;
    handleCanvasClick;
    handleMouseMove;
    drawMode: ShapeKind;
    shapes: ShapeMap;
    dimensions: Dimensions;
}


/////---------------------------------------------------------------------------
///     COMPONENT DEFINITION:
/////---------------------------------------------------------------------------

const ThetaPad: React.FC<{}> = (props) => {
    const thetaPadState = useThetaPadState();

    return (
        <ThetaPadRoot dimensions={thetaPadState.dimensions}>
            <Sidebar
                width={thetaPadState.dimensions.sidebar}
                shapes={thetaPadState.shapes}
            />
            <Canvas
                onClick={thetaPadState.handleCanvasClick}
                onMouseMove={thetaPadState.handleMouseMove}
                dimensions={thetaPadState.dimensions}
                shapes={thetaPadState.shapes}
            />
        </ThetaPadRoot>
    )
}

export default ThetaPad;
