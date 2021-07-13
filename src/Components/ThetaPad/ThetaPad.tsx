/** ThetaPad.tsx
 * @file The root component for the actual drawing portion of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import useThetaPadState from "./useThetaPadState";
import {Shape, ShapeMap, ShapeKind} from "./types/shapes";
import Sidebar from "./Sidebar/Sidebar";


/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface ThetaPadStyleProps {
    width?: number,
    height?: number,
}

const ThetaPadRoot = styled.div<ThetaPadStyleProps>`
  width: 100vw;
  height: 100vw;
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
        <ThetaPadRoot>
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
