/** ThetaPad.tsx
 * @file The root component for the actual drawing portion of the app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useContext} from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import useThetaPadState from "./useThetaPadState";
import {ShapeMap, ShapeKind, Shape} from "./types/shapes";
import Sidebar from "./Sidebar/Sidebar";
import {Action} from "./types/actions";
import {SizeContext} from "../App/AppContextProvider";


/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface ThetaPadStyleProps {
    height: number;
}

const ThetaPadRoot = styled.div<ThetaPadStyleProps>`
  height: 100%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  z-index: 100;
  background: white;
  display: flex;
`;


/////---------------------------------------------------------------------------
///     PRIMARY STATE TYPE:
/////---------------------------------------------------------------------------

export type PrimaryDispatch = (action: Action) => void


export interface ThetaPadStateType {
    dispatch: PrimaryDispatch;
    unit: number;
    handleCanvasClick;
    handleMouseMove;
    drawMode: ShapeKind;
    shapes: ShapeMap;
    tempShape: Shape | null;
}



/////---------------------------------------------------------------------------
///     COMPONENT DEFINITION:
/////---------------------------------------------------------------------------

export const DispatchContext = React.createContext<PrimaryDispatch>(() => {});
export const UnitContext = React.createContext(1)

const ThetaPad: React.FC = () => {
    const {height} = useContext(SizeContext);
    const thetaPadState = useThetaPadState();

    return (
        <DispatchContext.Provider value={thetaPadState.dispatch}>
            <UnitContext.Provider value={thetaPadState.unit}>
                <ThetaPadRoot height={height}>
                    <Sidebar
                        dispatch={thetaPadState.dispatch}
                        tempShape={thetaPadState.tempShape}
                        drawMode={thetaPadState.drawMode}
                        shapes={thetaPadState.shapes}
                    />
                    <Canvas
                        tempShape={thetaPadState.tempShape}
                        onClick={thetaPadState.handleCanvasClick}
                        onMouseMove={thetaPadState.handleMouseMove}
                        shapes={thetaPadState.shapes}
                    />
                </ThetaPadRoot>
            </UnitContext.Provider>
        </DispatchContext.Provider>
    )
}

export default ThetaPad;
