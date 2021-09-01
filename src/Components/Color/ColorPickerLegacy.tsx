/** ColorPicker.tsx
 * @file ColorPicker component (modal that opens when a swatch is clikced)
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import styles from "./ColorPicker.module.scss"
import {COLORS} from "../../constants";
import uuid from "react-uuid";


interface ColorPickerStyleProps {
}

const ColorPickerRoot = styled.div<ColorPickerStyleProps>``


/**
 * This is not functional, and may or may not be implemented in the future.
 * It is meant to mirror the color picker from version 1
 */
const ColorPickerLegacy: React.FC = () => {


    return (
        <ColorPickerRoot className={styles.overlay}>
            <ul className={styles.swatchList}>
                {COLORS.map((color) => (
                    <li key={uuid()} style={{background: color}}/>
                ))}
            </ul>
        </ColorPickerRoot>
    )
}


export default ColorPickerLegacy;
