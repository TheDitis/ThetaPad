/** Sidebar.tsx
 * @file Sidebar of the drawing portion of the drawing app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import ControlsSection from "./ControlsSection/ControlsSection";
import ShapeProfilesSection from "./ShapeProfilesSection/ShapeProfilesSection";
import {useSelector} from "react-redux";
import {sidebarWidthSelector} from "../../../redux/selectors";
import ToolMenu from "./ToolMenu/ToolMenu";


interface SidebarStyleProps {
    width: number,
}

const SidebarRoot = styled.div<SidebarStyleProps>`
  position: relative;
  width: ${props => props.width}px;
  height: 100%;
  background: #282c34;
`

/**
 * Main sidebar of the app. Holds controls, shape-profiles, and tools
 * @return {JSX.Element} - Sidebar div containing ControlsSection and
 *      ShapeProfilesSection
 */
const Sidebar: React.FC = () => {
    const width = useSelector(sidebarWidthSelector);

    return (
        <SidebarRoot width={width}>
            <ControlsSection/>
            <ShapeProfilesSection/>
            <ToolMenu/>
        </SidebarRoot>
    )
}


export default Sidebar;