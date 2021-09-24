/** ToolMenu.tsx
 * @file menu in the sidebar containing additional tools
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useCallback, useEffect, useState} from "react";
import {motion} from "framer-motion";
import GridTool from "./Tools/GridTool";
import FiltersTool from "./Tools/FiltersTool";

const TAB_HEIGHT = 40;
const MENU_HEIGHT = 400;
const SPRING_BUFFER = 60;

interface ToolsStyleProps {
}

const ToolsRoot = styled(motion.div)<ToolsStyleProps>`
  position: absolute;
  bottom: ${-MENU_HEIGHT + TAB_HEIGHT - SPRING_BUFFER}px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: content-box;
  //border-bottom: 40px solid #282c34;
  
  .tabSection {
    position: relative;
    width: 100%;
    
    .tab{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: ${-TAB_HEIGHT - 8}px;
      z-index: 5;
      width: 120px;
      border: 2px solid white;
      border-bottom: 4px solid #282c34;
      //border-bottom: none;
      padding: 10px;
      background: #282c34;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      margin: auto;
      
      h3 {
        font-size: 16pt;
      }
    }
    
    .tabSpacer {
      width: 100%;
      border-bottom: 2px solid white;
    }
  }
  
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    background: #282c34;
    height: ${MENU_HEIGHT + SPRING_BUFFER}px;
    padding-bottom: ${SPRING_BUFFER * 3}px;
    border-top: 2px solid white;
    overflow-y: scroll;
  }
`


const variants = {
    open: {
        y: -MENU_HEIGHT,
    },
    closed: {
        y: -15,
    },
    hover: {
        y: -30,
    }
}


const ToolMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [doneClosing, setDoneClosing] = useState(true); // keeps whileHover from activating while closing

    const toggleIsOpen = useCallback(() => {
        if (isOpen) {
            setIsOpen(false);
            setTimeout(() => setDoneClosing(true), 500);
        }
        else {
            setIsOpen(true);
            setDoneClosing(false);
        }
    }, [isOpen])

    useEffect(() => {
        const keyboardToggle = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 't' && !(e.target instanceof HTMLInputElement)) {
                toggleIsOpen();
            }
        }
        window.addEventListener('keydown', keyboardToggle);

        return () => window.removeEventListener('keydown', keyboardToggle);
    }, [toggleIsOpen])

    return (
        <ToolsRoot
            variants={variants}
            animate={isOpen ? "open" : "closed"}
            whileHover={doneClosing ? "hover" : "none"}
        >
            <motion.div className={"tabSection"}>
                <div
                    className={"tab"}
                    onClick={toggleIsOpen}
                >
                    <h3>Tools</h3>
                </div>
            </motion.div>
            <motion.div className={"main"}>
                <GridTool/>
                <FiltersTool/>
            </motion.div>
        </ToolsRoot>
    )
}


export default ToolMenu;