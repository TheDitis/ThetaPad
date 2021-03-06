/** ColorSwatch.tsx
 * @file ColorSwatch component that opens the color picker when clicked
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {ChangeEvent, useRef} from "react";


interface ColorSwatchStyleProps {
    disabled?: boolean;
    width?: number;
    height?: number;
}

const ColorSwatchRoot = styled.div<ColorSwatchStyleProps>`
  width: ${({width}) => width ? `${width}px` : "85%"};
  height: ${({height}) => height ? `${height}px` : "85%"};
  border-radius: 15%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6) inset;
  cursor: pointer;
  opacity: ${({disabled}) => disabled ? 0.6 : 1};
  position: relative;
  
  input {
    position: absolute;
    bottom: 50%;
    left: 50%;
  }
`


interface ColorSwatchProps {
    color: string;
    onChange?: (color: string) => void;
    disabled?: boolean;
    style?: object;
    width?: number;
    height?: number;
}


/**
 * Color swatch that allows the user to select a new color if onChange is passed
 * @param {string} color - The current color of the swatch
 * @param {(string) => void} [onChange] - function that takes the new color as an argument, run on change
 * @param {boolean} [disabled]
 * @param {object} [style] - any extra styles to apply
 * @param {number | undefined} width - width in px if you want to specify
 * @param {number | undefined} height - height in px if you want to specify
 * @return {JSX.Element} - colored div with a nested input with type="color"
 */
const ColorSwatch: React.FC<ColorSwatchProps> = ({color, onChange, style, width, height, disabled}) => {
    const colorInputRef = useRef<HTMLInputElement>(null);

    const open = () => {
        if (colorInputRef.current !== null && !disabled) {
            colorInputRef.current.click();
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
            disabled={disabled}
            width={width}
            height={height}
            style={{...style, background: color}}
        >
            <input
                type={"color"}
                value={color}
                ref={colorInputRef}
                style={{opacity: 0}}
                onChange={onChangeWrapper}
                disabled={disabled}
            />
        </ColorSwatchRoot>
    )
}


export default ColorSwatch;