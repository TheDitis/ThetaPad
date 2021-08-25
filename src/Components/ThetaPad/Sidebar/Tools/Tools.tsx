/** Tools.tsx
 * @file menu in the sidebar containing additional tools
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useState} from "react";
import {motion} from "framer-motion";

const TAB_HEIGHT = 40;
const MENU_HEIGHT = 400;

interface ToolsStyleProps {
}

const ToolsRoot = styled(motion.div)<ToolsStyleProps>`
  position: absolute;
  bottom: ${-MENU_HEIGHT + TAB_HEIGHT}px;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  .tabSection {
    //display: flex;
    //height: ${TAB_HEIGHT}px;
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
    z-index: 3;
    background: #282c34;
    height ${MENU_HEIGHT}px;
    border-top: 2px solid white;
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


const Tools: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [doneClosing, setDoneClosing] = useState(true); // keeps whileHover from activating while closing

    const toggleIsOpen = () => {
        if (isOpen) {
            setIsOpen(false);
            setTimeout(() => setDoneClosing(true), 500);
        }
        else {
            setIsOpen(true);
            setDoneClosing(false);
        }
    }

    return (
        <ToolsRoot
            variants={variants}
            animate={isOpen ? "open" : "closed"}
            whileHover={doneClosing ? "hover" : "none"}
            transition={{duration: 0.3, ease: "easeOut"}}
        >
            <motion.div className={"tabSection"}>
                {/*<div className={"tabSpacer"}/>*/}
                <div
                    className={"tab"}
                    onClick={toggleIsOpen}
                >
                    <h3>Tools</h3>
                </div>
                {/*<div className={"tabSpacer"}/>*/}
            </motion.div>
            <motion.div className={"main"}>

            </motion.div>
        </ToolsRoot>
    )
}


export default Tools;