/** ToolProfileBase.tsx
 * @file Template for the Tool components in the ToolMenu
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";


interface ToolProfileBaseStyleProps {
}

const ToolProfileBaseRoot = styled.div<ToolProfileBaseStyleProps>`
  background-color: lightgray;
  width: 95%;
  margin-top: 16px;
  border-radius: 10px;
`

interface ToolProfileBaseProps {
    MainContent: React.FC;
    DropdownContent?: React.FC;
}

const ToolProfileBase: React.FC<ToolProfileBaseProps> = ({MainContent, DropdownContent}) => {


    return (
        <ToolProfileBaseRoot>
            <MainContent/>
        </ToolProfileBaseRoot>
    )
}


export default ToolProfileBase;