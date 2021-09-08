/** Sidebar.tsx
 * @file Sidebar of the drawing portion of the drawing app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import ControlsSection from "./ControlsSection/ControlsSection";
import ShapeProfilesSection from "./ShapeProfilesSection/ShapeProfilesSection";
import {sidebarWidthSelector} from "../../../redux/selectors";
import ToolMenu from "./ToolMenu/ToolMenu";
import {useAppSelector} from "../../../hooks/reduxHooks";


interface SidebarStyleProps {
    width: number,
}

const SidebarRoot = styled.div<SidebarStyleProps>`
  position: relative;
  z-index: 9000;
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
    const width = useAppSelector(sidebarWidthSelector);

    return (
        <SidebarRoot width={width}>
            <ControlsSection/>
            <ShapeProfilesSection/>
            <ToolMenu/>
        </SidebarRoot>
    )
}


export default Sidebar;