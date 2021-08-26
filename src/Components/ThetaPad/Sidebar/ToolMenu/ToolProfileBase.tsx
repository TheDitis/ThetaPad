/** ToolProfileBase.tsx
 * @file Template for the Tool components in the ToolMenu
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";


interface ToolProfileBaseStyleProps {
    active?: boolean;
}

const ToolProfileBaseRoot = styled.div<ToolProfileBaseStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: lightgray;
  width: 95%;
  margin-top: 16px;
  border-radius: 10px;
  padding: 10px;
  
  .mainSection {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .toolToggleButton {
    background: ${({active}) => active ? "hsl(197,16%,18%)" : "white"};
    margin-right: 10px;
    
    &:hover {
      background: ${({active}) => active ? "hsl(202,14%,26%)" : "hsl(0,0%,84%)"};
    }
  }
  
  .numericInputContainer {
    color: rgb(70, 70, 70);
    margin-left: 10px;
    input {
      width: 50px;
    }
    label {
      vertical-align: text-after-edge;
    }
  }
`

interface ToolProfileBaseProps {
    active?: boolean;
}

const ToolProfileBase: React.FC<ToolProfileBaseProps> = ({active, children}) => {


    return (
        <ToolProfileBaseRoot active={active}>
            {/*<MainContent/>*/}
            {children}
        </ToolProfileBaseRoot>
    )
}


export default ToolProfileBase;