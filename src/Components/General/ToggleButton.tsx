/** ToggleButton.tsx
 * @file Wrapped and styled MUI Button that indicates whether or not it's 'on'
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import chroma from "chroma-js";


interface ToggleButtonStyleProps {
    active: boolean;
    backgroundActive: string;
    backgroundInactive: string;
    colorActive: string;
    colorInactive: string;
}

const StyledButton = styled.div<ToggleButtonStyleProps>`
  

  background-color: ${({active, backgroundActive, backgroundInactive}) => active ? backgroundActive : backgroundInactive};
  color: ${({active, colorActive, colorInactive}) => active ? colorActive : colorInactive};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-sizing: content-box;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    
    
  * {
    padding: 0;
    filter: ${({active, colorActive}) => active ? `drop-shadow(0 0 6px ${chroma(colorActive).alpha(0.5)})` : "none"};
    text-shadow: ${({active, colorActive}) => active ? `0 0 8px ${chroma(colorActive).alpha(0.5)}` : "none"};
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
}) => (
    <StyledButton
        active={active}
        backgroundActive={backgroundActive}
        backgroundInactive={backgroundInactive}
        colorActive={colorActive}
        colorInactive={colorInactive}
        onClick={onClick}
        style={style}
    >
        {children}
    </StyledButton>
)



export default ToggleButton;