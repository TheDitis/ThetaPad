/** Sidebar.tsx
 * @file Sidebar of the drawing portion of the drawing app
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import {ShapeMap} from "../types/shapes";
import React from "react";


/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface SidebarStyleProps {
    width: number,
}

const SidebarRoot = styled.div<SidebarStyleProps>`
  width: ${props => props.width}px;
`


/////---------------------------------------------------------------------------
///     COMPONENT:
/////---------------------------------------------------------------------------

interface SideBarProps {
    width: number,
    shapes: ShapeMap,
}

const Sidebar: React.FC<SideBarProps> = (props) => {

    return (
        <SidebarRoot width={props.width}>
            <h1>Sidebar</h1>
        </SidebarRoot>
    )
}


export default Sidebar;