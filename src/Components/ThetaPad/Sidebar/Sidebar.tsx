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

interface SideBarProps {}

const Sidebar: React.FC<SideBarProps> = (props) => {
    const {width} = useContext(SizeContext);

    return (
        <SidebarRoot width={width}>
            <ControlsSection/>
            <ShapeProfilesSection/>
        </SidebarRoot>
    )
}


export default Sidebar;