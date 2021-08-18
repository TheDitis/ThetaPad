/** ColorPicker.tsx
 * @file ColorPicker component (modal that opens when a swatch is clikced)
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import styles from "./ColorPicker.module.scss"
import {COLORS} from "../constants";
import uuid from "react-uuid";


interface ColorPickerStyleProps {
}

const ColorPickerRoot = styled.div<ColorPickerStyleProps>``


const ColorPicker: React.FC = () => {


    return (
        <ColorPickerRoot className={styles.overlay}>
            <ul className={styles.swatchList}>
                {COLORS.map((color) => (
                    <li key={uuid()}/>
                ))}
            </ul>
        </ColorPickerRoot>
    )
}


export default ColorPicker;