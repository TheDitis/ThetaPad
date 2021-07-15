/** Sidebar.tsx
 * @file Sidebar of the drawing portion of the drawing app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import {ShapeKind, ShapeMap} from "../types/shapes";
import React, {useContext, useEffect} from "react";
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
}

/**
 * The main Sidebar of the app
 * @param {number} width - The calculated width of the sidebar in px
 * @param {ShapeKind} drawMode - the current shape-drawing mode
 * @param {PrimaryDispatch} dispatch - the primary dispatch function
 * @param {ShapeMap} shapes - the object of all shapes
 */
const Sidebar: React.FC<SideBarProps> = (
    {drawMode, dispatch, shapes}
) => {
    const {width} = useContext(SizeContext);
    useEffect(() => {
        console.log("Sidebar re-rendered")
    });

    return (
        <SidebarRoot width={width}>
            <ControlsSection drawMode={drawMode} dispatch={dispatch}/>
            <ShapeProfilesSection shapes={shapes}/>
        </SidebarRoot>
    )
}


export default Sidebar;