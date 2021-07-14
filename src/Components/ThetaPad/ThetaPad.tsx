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
import {Action} from "./types/actions";
import useAppDimensions from "./useAppDimensions";


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

export type PrimaryDispatch = (action: Action) => void

export interface Dimensions {
    sidebar: number,
    width: number,
    height: number
}

export interface ThetaPadStateType {
    dispatch: PrimaryDispatch;
    handleCanvasClick;
    handleMouseMove;
    drawMode: ShapeKind;
    shapes: ShapeMap;
}


/////---------------------------------------------------------------------------
///     COMPONENT DEFINITION:
/////---------------------------------------------------------------------------

const ThetaPad: React.FC<{}> = (props) => {
    const thetaPadState = useThetaPadState();
    const dimensions = useAppDimensions();

    return (
        <ThetaPadRoot dimensions={dimensions}>
            <Sidebar
                drawMode={thetaPadState.drawMode}
                dispatch={thetaPadState.dispatch}
                width={dimensions.sidebar}
                shapes={thetaPadState.shapes}
            />
            <Canvas
                onClick={thetaPadState.handleCanvasClick}
                onMouseMove={thetaPadState.handleMouseMove}
                dimensions={dimensions}
                shapes={thetaPadState.shapes}
            />
        </ThetaPadRoot>
    )
}

export default ThetaPad;
