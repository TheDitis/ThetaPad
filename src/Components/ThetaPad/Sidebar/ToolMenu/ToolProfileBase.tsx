/** ToolProfileBase.tsx
 * @file Template for the Tool components in the ToolMenu
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ReactNode, useState} from "react";
import ShowMoreButton from "../../../General/ShowMoreButton";
import {AnimatePresence, motion} from "framer-motion";


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
  color: black;
  text-align: left;
  
  .mainSection {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    color: black;
  }

  // .toolToggleButton {
  //   background: ${({active}) => active ? "hsl(197,16%,18%)" : "white"};
  //   margin-right: 10px;
  //  
  //   &:hover {
  //     background: ${({active}) => active ? "hsl(202,14%,26%)" : "hsl(0,0%,84%)"};
  //   }
  // }
  
  .showMoreButtonContainer {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
  .numericInputContainer {
    margin-left: 15px;
    input {
      width: 45px;
    }
    label {
      vertical-align: text-after-edge;
    }
  }
  
  .dropdownSection {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6) inset;
    background: rgba(0, 0, 0, 0.13);
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  
`

const variants = {
    dropdown: {
        open: {
            height: "auto",
            margin: 0,
            marginTop: 10,
            opacity: 1,
        },
        closed: {
            margin: 0,
            padding: 0,
            height: 0,
            marginTop: 0,
            opacity: 0,
        }
    }
}


interface ToolProfileBaseProps {
    active?: boolean;
}

/**
 * A framework for Tools in the ToolMenu
 * @param {boolean | undefined} active - Whether or not a given tool is 'on'
 * @param children - Content of the tool. The first child will occupy the main area,
 *      and if there are more root-level children, they will occupy the dropdown
 * @return {JSX.Element} - styled div with child component(s) placed accordingly
 */
const ToolProfileBase: React.FC<ToolProfileBaseProps> = ({active, children}) => {
    const [showMore, setShowMore] = useState(false);

    let Main = children;
    let DropdownContent: ReactNode | null = null;
    if ((!React.isValidElement(children)) && Array.isArray(children)) {
        Main = children[0];
        if (children.length > 1) {
            DropdownContent = children.slice(1)
        }
    }

    return (
        <ToolProfileBaseRoot active={active}>
            <motion.div className={"mainSection"}>
                {Main}
                {DropdownContent && (
                    <div className={"showMoreButtonContainer"}>
                        <ShowMoreButton
                            onClick={() => {setShowMore(!showMore)}}
                            isOpen={showMore}
                        />
                    </div>
                )}
            </motion.div>
            <AnimatePresence>
                {showMore && (
                    <motion.div
                        className={"dropdownSection"}
                        variants={variants.dropdown}
                        initial={"closed"}
                        animate={"open"}
                        exit={"closed"}
                    >
                        {DropdownContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </ToolProfileBaseRoot>
    )
}


export default ToolProfileBase;