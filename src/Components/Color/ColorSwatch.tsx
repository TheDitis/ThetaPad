/** ColorSwatch.tsx
 * @file ColorSwatch component that opens the color picker when clicked
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ChangeEvent, useRef, useState} from "react";


interface ColorSwatchStyleProps {
    clickable?: boolean;
    color: string;
}

const ColorSwatchRoot = styled.div<ColorSwatchStyleProps>`
  width: 85%;
  height: 85%;
  border-radius: 15%;
  background-color: ${props => props.color};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6) inset;
  
  cursor: pointer;
`


interface ColorSwatchProps {
    color: string;
    onChange?: (color: string) => void;
}

/**
 * Color swatch that allows the user to select a new color if onChange is passed
 * @param {string} color - The current color of the swatch
 * @param {(string) => void} [onChange] - function that takes the new color as an argument, run on change
 * @return {JSX.Element} - colored div with a nested input with type="color"
 */
const ColorSwatch: React.FC<ColorSwatchProps> = ({onChange, color}) => {
    const colorInputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        if (colorInputRef.current !== null && !isOpen) {
            colorInputRef.current.click();
            setIsOpen(true);
        }
    }

    const onChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
        const newCol: string = e.target.value;
        if (onChange) {
            onChange(newCol);
        }
    }

    return (
        <ColorSwatchRoot
            onClick={onChange !== undefined ? open : () => null}
            color={color}
            clickable={onChange !== undefined && onChange !== null}
        >
            <input type={"color"} value={color} ref={colorInputRef} style={{opacity: 0}} onChange={onChangeWrapper}/>
        </ColorSwatchRoot>
    )
}


export default React.memo(ColorSwatch);