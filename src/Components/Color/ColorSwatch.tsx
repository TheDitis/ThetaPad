/** ColorSwatch.tsx
 * @file ColorSwatch component that opens the color picker when clicked
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";


interface ColorSwatchStyleProps {
    clickable?: boolean;
    color: string;
}

const ColorSwatchRoot = styled.div<ColorSwatchStyleProps>`
  //margin: 5px;
  width: 85%;
  height: 85%;
  border-radius: 15%;
  background-color: ${props => props.color};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6) inset;
  
  cursor: pointer;
`


interface ColorSwatchProps {
    color: string;
    onClick?: (e) => void;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({onClick, color}) => {
    return (
        <ColorSwatchRoot
            onClick={onClick}
            color={color}
            clickable={onClick !== undefined && onClick !== null}
        />
    )
}


export default ColorSwatch;