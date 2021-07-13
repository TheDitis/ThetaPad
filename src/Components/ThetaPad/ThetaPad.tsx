import React, {Context, ContextType, Dispatch, useReducer} from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import useThetaPadState from "./useThetaPadState";
import {Shape, ShapeMap, ShapeKind} from "./types/shapes";







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
`;



/////---------------------------------------------------------------------------
///     PRIMARY STATE TYPE:
/////---------------------------------------------------------------------------

export interface ThetaPadStateType {
    dispatch;
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

    return (
        <ThetaPadRoot
            onMouseDown={thetaPadState.handleCanvasClick}
            onMouseUp={thetaPadState.handleCanvasClick}
            onMouseMove={thetaPadState.handleMouseMove}
        >
            <Canvas shapes={thetaPadState.shapes}/>
        </ThetaPadRoot>
    )
}

export default ThetaPad;