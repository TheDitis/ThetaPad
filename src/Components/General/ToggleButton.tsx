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
    disabled: boolean
}

const StyledButton = styled.div<ToggleButtonStyleProps>`
  
  background-color: ${({active, backgroundActive, backgroundInactive}) => 
          active ? backgroundActive : backgroundInactive};
  transition-duration: 500ms;
  
  color: ${({active, colorActive, colorInactive}) => 
          active ? colorActive : colorInactive};
  
  filter: ${({disabled}) => disabled ? "contrast(0.5) opacity(0.8)" : "none"};
  
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-sizing: content-box;
  cursor: ${({disabled}) => disabled ? "default" : "pointer"};
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transition: filter 200ms;
    filter: contrast(1.1);
  }
  
  * {
    padding: 0;
    filter: ${({active, colorActive}) => 
            active ? `drop-shadow(0 0 6px ${chroma(colorActive).alpha(0.5)})` : "none"};
    text-shadow: ${({active, colorActive}) => 
            active ? `0 0 8px ${chroma(colorActive).alpha(0.5)}` : "none"};
    transition-duration: 1s;
  }
`


interface ToggleButtonProps {
    active: boolean;
    onClick: (e) => void;
    backgroundActive?: string;
    backgroundInactive?: string;
    colorActive?: string;
    colorInactive?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}


/**
 * Styled div that reacts to click events and reflects the status stylistically
 * @param {boolean} active - whether or not the control is 'on'
 * @param {(e) => void} onClick - click handler function
 * @param {string} [backgroundActive="hsl(197,16%,18%)"] - color of background when active
 * @param {string} [backgroundInactive="hsl(197,16%,90%)"]
 * @param {string} [colorActive="white"] - color of content when active
 * @param {string} [colorInactive="black"] - color of content when not active
 * @param {boolean} [disabled=false] - if true, clicking will do nothing
 * @param {React.CSSProperties} [style={}] - any other style properties to apply
 * @param children - any child elements of the button
 * @return {JSX.Element} - Styled div that reacts to click events and reflects the status stylistically
 */
const ToggleButton: React.FC<ToggleButtonProps> = ({
    active,
    onClick,
    backgroundActive = "hsl(197,16%,18%)",
    backgroundInactive = "hsl(197,16%,90%)",
    colorActive = "white",
    colorInactive = "black",
    disabled = false,
    style = {},
    children
}) => (
    <StyledButton
        active={active}
        backgroundActive={backgroundActive}
        backgroundInactive={backgroundInactive}
        colorActive={colorActive}
        colorInactive={colorInactive}
        onClick={disabled ? () => null : onClick}
        disabled={disabled}
        style={style}
    >
        {children}
    </StyledButton>
)



export default ToggleButton;