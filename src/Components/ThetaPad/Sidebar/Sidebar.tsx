/** Sidebar.tsx
 * @file Sidebar of the drawing portion of the drawing app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import ControlsSection from "./ControlsSection/ControlsSection";
import ShapeProfilesSection from "./ShapeProfilesSection/ShapeProfilesSection";
import {useSelector} from "react-redux";
import {appWidthSelector} from "../../../redux/selectors";


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
}

const Sidebar: React.FC<SideBarProps> = (props) => {
    const width = useSelector(appWidthSelector);

    return (
        <SidebarRoot width={width}>
            <ControlsSection/>
            <ShapeProfilesSection/>
        </SidebarRoot>
    )
}


export default Sidebar;