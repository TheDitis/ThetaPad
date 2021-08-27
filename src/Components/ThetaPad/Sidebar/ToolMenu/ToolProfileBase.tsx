/** ToolProfileBase.tsx
 * @file Template for the Tool components in the ToolMenu
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ReactNode, useState} from "react";
import ShowMoreButton from "../../../General/ShowMoreButton";


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
    position: relative;
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
    margin-left: 10px;
    input {
      width: 40px;
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
    const [showMore, setShowMore] = useState(false);

    let Main = children;
    let DropdownContent: ReactNode | null = null;
    if ((!React.isValidElement(children)) && Array.isArray(children)) {
        Main = children[0];
        if (children.length > 1) {
            DropdownContent = children[1]
        }
    }
    console.log(children)
    console.log(React.isValidElement(children))

    return (
        <ToolProfileBaseRoot active={active}>
            <div className={"mainSection"}>
                {Main}
                {DropdownContent && (
                    <ShowMoreButton onClick={() => {setShowMore(!showMore)}} isOpen={showMore}/>
                )}
            </div>
            {/*{children}*/}
        </ToolProfileBaseRoot>
    )
}


export default ToolProfileBase;