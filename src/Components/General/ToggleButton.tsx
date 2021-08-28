/** ToggleButton.tsx
 * @file Wrapped and styled MUI Button that indicates whether or not it's 'on'
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {Button} from "@material-ui/core";
import chroma from "chroma-js";
import _ from "lodash";


interface ToggleButtonStyleProps {
    active: boolean;
    backgroundActive: string;
    backgroundInactive: string;
    colorActive: string;
    colorInactive: string;
}

const ToggleButtonRoot = styled.div<ToggleButtonStyleProps>`
  
  .toggleButton {
    background-color: ${({active, backgroundActive, backgroundInactive}) => active ? backgroundActive : backgroundInactive};
    color: ${({active, colorActive, colorInactive}) => active ? colorActive : colorInactive};
    //padding: 0;
    
    
    * {
      //margin: 0;
      padding: 0;
      filter: ${({active, colorActive}) => active ? `drop-shadow(0 0 6px ${chroma(colorActive).alpha(0.3)})` : "none"};
      text-shadow: ${({active, colorActive}) => active ? `0 0 8px ${chroma(colorActive).alpha(0.5)}` : "none"};
    }
  }

`

interface ToggleButtonProps {
    active: boolean;
    onClick: (e) => void;
    backgroundActive?: string;
    backgroundInactive?: string;
    colorActive?: string;
    colorInactive?: string;
    style?: React.CSSProperties;
}


const ToggleButton: React.FC<ToggleButtonProps> = ({
    active,
    onClick,
    backgroundActive = "hsl(197,16%,18%)",
    backgroundInactive = "hsl(197,16%,90%)",
    colorActive = "white",
    colorInactive = "black",
    style = {},
    children
}) => {
    return (
        <ToggleButtonRoot
            active={active}
            backgroundActive={backgroundActive}
            backgroundInactive={backgroundInactive}
            colorActive={colorActive}
            colorInactive={colorInactive}
            style={style}
        >
            <Button
                className={"toggleButton"}
                onClick={onClick}
                style={style}
            >
                {children}
            </Button>
        </ToggleButtonRoot>
    )
}


export default ToggleButton;