/** Sidebar.tsx
 * @file Sidebar of the drawing portion of the drawing app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import {Shape, ShapeKind, ShapeMap} from "../types/shapes";
import React, {useContext} from "react";
import {PrimaryDispatch} from "../ThetaPad";
import {SizeContext} from "../../App/AppContextProvider";
import ControlsSection from "./ControlsSection/ControlsSection";
import ShapeProfilesSection from "./ShapeProfilesSection/ShapeProfilesSection";


/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface SidebarStyleProps {
    width: number,
}

const SidebarRoot = styled.div<SidebarStyleProps>`
  width: ${props => props.width}px;
  height: 100%;
  background: #282c34;
`



/////---------------------------------------------------------------------------
///     COMPONENT:
/////---------------------------------------------------------------------------

interface SideBarProps {
    drawMode: ShapeKind,
    dispatch: PrimaryDispatch,
    shapes: ShapeMap,
    tempShape: Shape | null,
}

/**
 * The main Sidebar of the app
 * @param {number} width - The calculated width of the sidebar in px
 * @param {ShapeKind} drawMode - the current shape-drawing mode
 * @param {PrimaryDispatch} dispatch - the primary dispatch function
 * @param {ShapeMap} shapes - the object of all shapes
 */
const Sidebar: React.FC<SideBarProps> = (
    {drawMode, dispatch, shapes, tempShape}
) => {
    const {width} = useContext(SizeContext);

    return (
        <SidebarRoot width={width}>
            <ControlsSection
                drawMode={drawMode}
                dispatch={dispatch}
                tempShape={tempShape}
            />
            <ShapeProfilesSection shapes={shapes} tempShape={tempShape}/>
        </SidebarRoot>
    )
}


export default Sidebar;